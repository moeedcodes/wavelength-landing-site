"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AudioWaveform() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouseNDC = useRef(new THREE.Vector2(0, 0));
  const hitPoint = useRef(new THREE.Vector3(0, 0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseWorld: { value: new THREE.Vector3(0, 0, 0) },
      uMouseHit: { value: 0 },
      uMouseVel: { value: 0 },
      uColor1: { value: new THREE.Color("#4338CA") },
      uColor2: { value: new THREE.Color("#22C55E") },
      uColor3: { value: new THREE.Color("#6366F1") },
      uColorHot: { value: new THREE.Color("#00F5D4") },
    }),
    []
  );

  // Store previous mouse for velocity
  const prevMouse = useRef(new THREE.Vector2(0, 0));

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouseWorld;
    uniform float uMouseHit;
    uniform float uMouseVel;
    varying vec2 vUv;
    varying float vDisplacement;
    varying float vMouseProximity;

    //	Simplex 3D Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      // uMouseWorld is the raycast hit in the mesh's LOCAL space
      float dist = distance(pos.xy, uMouseWorld.xy);

      // Ripple: tight, subtle ring close to cursor
      float ripple = sin(dist * 14.0 - uTime * 4.0) * exp(-dist * 3.0);
      float mouseEffect = smoothstep(1.2, 0.0, dist) * uMouseHit;

      // Gentle push away from cursor
      float disperseStrength = mouseEffect * (0.15 + uMouseVel * 0.4);

      float noise = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.4)) * 0.5;
      noise += snoise(vec3(pos.x * 3.0, pos.y * 3.0, uTime * 0.6)) * 0.25;

      float displacement = noise + ripple * 0.12 * uMouseHit + disperseStrength * 0.15;
      vDisplacement = displacement;
      vMouseProximity = mouseEffect;

      pos.z += displacement;

      // Subtle lateral nudge near cursor
      vec2 pushDir = normalize(pos.xy - uMouseWorld.xy + 0.001);
      pos.xy += pushDir * disperseStrength * 0.06;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColorHot;
    uniform float uMouseVel;
    varying vec2 vUv;
    varying float vDisplacement;
    varying float vMouseProximity;

    void main() {
      float mixFactor = (vDisplacement + 0.5) * 0.5 + 0.25;
      vec3 color = mix(uColor1, uColor2, mixFactor);
      color = mix(color, uColor3, sin(vUv.x * 3.14159 + uTime) * 0.3 + 0.3);

      // Subtle glow near cursor — soft cyan tint
      float hotIntensity = vMouseProximity * (0.4 + uMouseVel * 0.8);
      color = mix(color, uColorHot, hotIntensity * 0.45);
      color += uColorHot * hotIntensity * 0.1;

      float alpha = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
      alpha *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
      alpha *= 0.85;
      alpha = min(1.0, alpha + hotIntensity * 0.1);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Raycast from camera through pointer onto the waveform mesh
    const pointer = state.pointer;
    mouseNDC.current.set(pointer.x, pointer.y);
    raycaster.current.setFromCamera(mouseNDC.current, state.camera);

    // Use a flat version of the plane for raycasting (ignore displacement)
    const intersects = raycaster.current.intersectObject(meshRef.current);
    if (intersects.length > 0) {
      // Convert world hit point into the mesh's local space
      const localPoint = meshRef.current.worldToLocal(intersects[0].point.clone());
      hitPoint.current.lerp(localPoint, 0.15);
      materialRef.current.uniforms.uMouseHit.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouseHit.value,
        1.0,
        0.1
      );
    } else {
      // Fade out when cursor leaves the surface
      materialRef.current.uniforms.uMouseHit.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouseHit.value,
        0.0,
        0.05
      );
    }

    materialRef.current.uniforms.uMouseWorld.value.lerp(hitPoint.current, 0.15);

    // Compute velocity
    const vel = mouseNDC.current.distanceTo(prevMouse.current);
    prevMouse.current.copy(mouseNDC.current);
    materialRef.current.uniforms.uMouseVel.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMouseVel.value,
      Math.min(vel * 10, 1.0),
      0.12
    );

    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <mesh ref={meshRef} rotation={[-0.4, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[8, 5, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Store rest positions so particles spring back
  const [restPositions, positions] = useMemo(() => {
    const rest = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      rest[i * 3] = x;
      rest[i * 3 + 1] = y;
      rest[i * 3 + 2] = z;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return [rest, pos];
  }, [count]);

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uColorBase: { value: new THREE.Color("#6366F1") },
      uColorHot: { value: new THREE.Color("#00F5D4") },
    }),
    []
  );

  const particleVert = `
    uniform float uTime;
    uniform vec3 uMouse;
    attribute vec3 restPosition;
    varying float vMouseDist;

    void main() {
      // Scatter away from cursor in 3D
      vec3 diff = position - uMouse;
      float dist = length(diff.xy);
      vMouseDist = smoothstep(3.0, 0.0, dist);

      vec3 pos = position;
      // Push particles outward from cursor
      if (dist < 3.0) {
        vec3 pushDir = normalize(diff + 0.001);
        float pushStrength = (1.0 - dist / 3.0) * 1.2;
        pos += pushDir * pushStrength;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      float size = (3.0 + vMouseDist * 5.0);
      gl_PointSize = size * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFrag = `
    uniform vec3 uColorBase;
    uniform vec3 uColorHot;
    varying float vMouseDist;

    void main() {
      // Soft circle
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.1, d) * (0.6 + vMouseDist * 0.4);

      vec3 color = mix(uColorBase, uColorHot, vMouseDist);
      // Add glow bloom for close particles
      color += uColorHot * vMouseDist * 0.5;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    const mouse = state.pointer;
    // Convert NDC mouse to approximate world coords
    const mx = mouse.x * 7.5;
    const my = mouse.y * 5;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(mx, my, 0);
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle drift animation on rest positions
      const rx = restPositions[i3] + Math.cos(state.clock.elapsedTime * 0.3 + i * 0.1) * 0.02;
      const ry = restPositions[i3 + 1] + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.02;

      // Spring back toward rest position
      posArray[i3] += (rx - posArray[i3]) * 0.02;
      posArray[i3 + 1] += (ry - posArray[i3 + 1]) * 0.02;

      // Push away from cursor
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.0 && dist > 0.01) {
        const force = (1 - dist / 3.0) * 0.15;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-restPosition"
          args={[restPositions, 3]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={particleUniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 1.5, -2]}>
        <icosahedronGeometry args={[0.5, 4]} />
        <meshStandardMaterial
          color="#4338CA"
          emissive="#4338CA"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function VinylDisc() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3.5, -1, -1]}>
        <torusGeometry args={[0.6, 0.15, 16, 48]} />
        <meshStandardMaterial
          color="#22C55E"
          emissive="#22C55E"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (state: { pointer: { x: number; y: number } }) => {
      mouseRef.current = { x: state.pointer.x, y: state.pointer.y };
    },
    []
  );

  useFrame((state) => {
    handlePointerMove(state);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseRef.current.x * 0.5,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouseRef.current.y * 0.3 + 0.5,
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function WaveformScene() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 60 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "auto" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#0F0F23"]} />
        <fog attach="fog" args={["#0F0F23", 5, 15]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} color="#4338CA" intensity={1} />
        <pointLight position={[-5, -5, 3]} color="#22C55E" intensity={0.8} />

        <AudioWaveform />
        <FloatingParticles count={150} />
        <GlowingSphere />
        <VinylDisc />
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={3}
          saturation={0.5}
          fade
          speed={1}
        />
        <CameraRig />
      </Canvas>
    </div>
  );
}

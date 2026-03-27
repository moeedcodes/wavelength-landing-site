"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Orb({ score = 87 }: { score?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const normalizedScore = score / 100;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScore: { value: normalizedScore },
      uColor1: { value: new THREE.Color("#4338CA") },
      uColor2: { value: new THREE.Color("#22C55E") },
    }),
    [normalizedScore]
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uScore;
    varying vec2 vUv;
    varying float vElevation;

    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);
      const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.0-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=1.0/7.0;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;
      vec4 s1=floor(b1)*2.0+1.0;
      vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
      m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    void main(){
      vUv=uv;
      vec3 pos=position;
      float noise=snoise(vec3(pos*2.0+uTime*0.3))*0.15*uScore;
      noise+=snoise(vec3(pos*4.0+uTime*0.5))*0.08*uScore;
      vElevation=noise;
      pos+=normal*noise;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uScore;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying float vElevation;

    void main(){
      vec3 color=mix(uColor1,uColor2,vElevation*3.0+0.5);
      float fresnel=pow(1.0-dot(normalize(vec3(vUv-0.5,1.0)),vec3(0.0,0.0,1.0)),2.0);
      color+=fresnel*0.3;
      float alpha=0.7+fresnel*0.3;
      gl_FragColor=vec4(color,alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial color="#4338CA" transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function OrbParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22C55E" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function CompatibilityOrb({ score = 87 }: { score?: number }) {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#0F0F23"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} color="#4338CA" intensity={1.5} />
        <pointLight position={[-3, -3, 2]} color="#22C55E" intensity={1} />
        <Orb score={score} />
        <OrbParticles />
      </Canvas>
    </div>
  );
}

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector2, Color } from 'three';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

// Noise functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;
  
  // Interactive mouse influence
  vec2 mouseDist = st - uMouse;
  float mouseEffect = smoothstep(0.5, 0.0, length(mouseDist));

  vec2 pos = vec2(st * 3.0);
  float n = snoise(pos + uTime * 0.2);
  n += snoise(pos * 2.0 - uTime * 0.3) * 0.5;
  n += snoise(pos * 4.0 + uTime * 0.1) * 0.25;
  
  // Distort based on mouse
  n += mouseEffect * 0.5;

  float pattern = smoothstep(-0.2, 0.2, n);
  
  vec3 color = mix(uColor1, uColor2, pattern);
  
  // Vignette
  float vignette = smoothstep(1.2, 0.2, length(st - vec2(0.5 * (uResolution.x/uResolution.y), 0.5)));
  
  gl_FragColor = vec4(color * vignette, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new Vector2(size.width, size.height) },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uColor1: { value: new Color('#0a0a0a') },
    uColor2: { value: new Color('#1a1a2e') }
  }), [size]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * (size.width / size.height);
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate mouse position
      material.uniforms.uMouse.value.lerp(mouse.current, 0.05);
      
      // Update colors based on dark mode class on body
      const isDark = document.documentElement.classList.contains('dark');
      const targetColor1 = isDark ? new Color('#050505') : new Color('#f0f0f0');
      const targetColor2 = isDark ? new Color('#111115') : new Color('#e0e5ff');
      
      material.uniforms.uColor1.value.lerp(targetColor1, 0.05);
      material.uniforms.uColor2.value.lerp(targetColor2, 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

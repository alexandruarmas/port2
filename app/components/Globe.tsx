'use client';

import React, { useRef, useMemo, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Error boundary component for catching Three.js errors
const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-3/4 h-3/4 rounded-full bg-blue-900/60 flex items-center justify-center">
      <div className="text-blue-100 text-sm opacity-60">3D visualization unavailable</div>
    </div>
  </div>
);

// WebGL detector
const useWebGLAvailable = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsAvailable(!!gl);
    } catch (e) {
      setIsAvailable(false);
      console.error('WebGL not available:', e);
    }
  }, []);
  
  return isAvailable;
};

// Simple error boundary component
interface ErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryComponent extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Globe error caught:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// Connection points data (latitude, longitude)
interface Connection {
  start: [number, number];
  end: [number, number];
  name: string;
  color: string;
}

const connections: Connection[] = [
  // Major Tech Hubs
  { start: [37.7749, -122.4194], end: [40.7128, -74.0060], name: 'SF-NYC', color: '#00ff00' },  // San Francisco to New York
  { start: [51.5074, -0.1278], end: [52.5200, 13.4050], name: 'London-Berlin', color: '#4caf50' },  // London to Berlin
  { start: [35.6762, 139.6503], end: [37.5665, 126.9780], name: 'Tokyo-Seoul', color: '#00e676' },  // Tokyo to Seoul
  
  // Innovation Corridors
  { start: [1.3521, 103.8198], end: [22.3193, 114.1694], name: 'Singapore-HongKong', color: '#69f0ae' },  // Singapore to Hong Kong
  { start: [19.0760, 72.8777], end: [25.2048, 55.2708], name: 'Mumbai-Dubai', color: '#00c853' },  // Mumbai to Dubai
  { start: [-33.8688, 151.2093], end: [-37.8136, 144.9631], name: 'Sydney-Melbourne', color: '#32cd32' },  // Sydney to Melbourne
  
  // Emerging Tech Centers
  { start: [-23.5505, -46.6333], end: [-34.6037, -58.3816], name: 'SaoPaulo-BuenosAires', color: '#90ee90' },  // São Paulo to Buenos Aires
  { start: [28.6139, 77.2090], end: [12.9716, 77.5946], name: 'Delhi-Bangalore', color: '#98fb98' },  // Delhi to Bangalore
  { start: [30.0444, 31.2357], end: [24.8607, 67.0011], name: 'Cairo-Karachi', color: '#3cb371' },  // Cairo to Karachi
  
  // Global Connections
  { start: [48.8566, 2.3522], end: [55.7558, 37.6173], name: 'Paris-Moscow', color: '#2e7d32' },  // Paris to Moscow
  { start: [39.9042, 116.4074], end: [31.2304, 121.4737], name: 'Beijing-Shanghai', color: '#66bb6a' },  // Beijing to Shanghai
  { start: [19.4326, -99.1332], end: [4.7110, -74.0721], name: 'MexicoCity-Bogota', color: '#81c784' },  // Mexico City to Bogota
  
  // Tech Innovation Routes
  { start: [37.5665, 126.9780], end: [31.2304, 121.4737], name: 'Seoul-Shanghai', color: '#a5d6a7' },  // Seoul to Shanghai
  { start: [52.5200, 13.4050], end: [59.3293, 18.0686], name: 'Berlin-Stockholm', color: '#c8e6c9' },  // Berlin to Stockholm
  { start: [35.6762, 139.6503], end: [1.3521, 103.8198], name: 'Tokyo-Singapore', color: '#2e7d32' },  // Tokyo to Singapore
];

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const latLongToVector3 = (lat: number, long: number, radius: number) => {
  const phi = degToRad(90 - lat);
  const theta = degToRad(long + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

interface ConnectionProps {
  start: [number, number];
  end: [number, number];
  color: string;
}

const ConnectionLine = ({ start, end, color }: ConnectionProps) => {
  const curveRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const curve = useMemo(() => {
    const startVec = latLongToVector3(start[0], start[1], 1);
    const endVec = latLongToVector3(end[0], end[1], 1);
    
    // Calculate the midpoint and raise it above the surface
    const midPoint = startVec.clone().add(endVec).multiplyScalar(0.5);
    const midHeight = startVec.distanceTo(endVec) * 0.3;
    midPoint.normalize().multiplyScalar(1 + midHeight);
    
    // Create a curved path
    const curve = new THREE.QuadraticBezierCurve3(
      startVec,
      midPoint,
      endVec
    );
    
    return curve;
  }, [start, end]);

  // Create particles along the curve
  const particles = useMemo(() => {
    const points = new Float32Array(50 * 3); // 50 particles per line
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      const pos = curve.getPoint(t);
      points[i * 3] = pos.x;
      points[i * 3 + 1] = pos.y;
      points[i * 3 + 2] = pos.z;
    }
    return points;
  }, [curve]);

  const linePoints = useMemo(() => {
    const points = new Float32Array(
      curve.getPoints(49).flatMap(p => [p.x, p.y, p.z])
    );
    return points;
  }, [curve]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < 50; i++) {
        const t = (((i / 49) + time * 0.1) % 1);
        const pos = curve.getPoint(t);
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Curved line */}
      <mesh ref={curveRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={linePoints}
            itemSize={3}
            normalized={false}
          />
        </bufferGeometry>
        <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
      </mesh>
      
      {/* Moving particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={particles}
            itemSize={3}
            normalized={false}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create procedural textures
  const textures = useMemo(() => {
    const createTexture = (color1: string, color2: string, dots: boolean = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, 128);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 128);

      if (dots) {
        // Add random bright dots for city lights
        ctx.fillStyle = '#ffffff';  // Back to white city lights
        for (let i = 0; i < 300; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 128;
          const size = Math.random() * 1.5;
          ctx.globalAlpha = Math.random() * 0.7 + 0.3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    return {
      day: createTexture('#1a237e', '#0d47a1'),  // Back to dark blue colors
      night: createTexture('#000000', '#0a0a2a', true),  // Back to dark blue night side
    };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Custom shader material for day/night cycle
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: textures.day },
        nightTexture: { value: textures.night },
        sunDirection: { value: new THREE.Vector3(2, 0, 2) },
      },
      vertexShader: 
        'varying vec2 vUv;' +
        'varying vec3 vNormal;' +
        'void main() {' +
        '  vUv = uv;' +
        '  vNormal = normalize(normalMatrix * normal);' +
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);' +
        '}',
      fragmentShader: 
        'uniform sampler2D dayTexture;' +
        'uniform sampler2D nightTexture;' +
        'uniform vec3 sunDirection;' +
        'varying vec2 vUv;' +
        'varying vec3 vNormal;' +
        'void main() {' +
        '  float intensity = dot(vNormal, normalize(sunDirection));' +
        '  intensity = intensity * 0.5 + 0.5;' +
        '  vec4 dayColor = texture2D(dayTexture, vUv);' +
        '  vec4 nightColor = texture2D(nightTexture, vUv);' +
        '  float transition = smoothstep(0.1, 0.9, intensity);' +
        '  vec4 color = mix(nightColor, dayColor, transition);' +
        '  color.rgb = pow(color.rgb, vec3(1.2));' +
        '  gl_FragColor = color;' +
        '}'
    });
  }, [textures]);

  return (
    <group>
      {/* Earth */}
      <mesh ref={meshRef} castShadow receiveShadow material={material}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>

      {/* Connection lines */}
      {connections.map((conn) => (
        <ConnectionLine key={conn.name} start={conn.start} end={conn.end} color={conn.color} />
      ))}

      {/* Atmosphere glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1a237e"  // Back to blue atmosphere
          opacity={0.05}
          transparent={true}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const GlobeVisualization = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const webGLAvailable = useWebGLAvailable();
  
  // Set a timeout to ensure we don't wait forever for loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // If WebGL is not available or we have an error, show fallback
  if (!webGLAvailable || hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
      <ErrorBoundaryComponent onError={(error: Error) => setHasError(true)}>
        <Canvas
          shadows
          style={{ width: '100%', height: '100%' }}
          gl={(canvas) => {
            // Try to get WebGL2 context first, fall back to WebGL1
            const context = canvas.getContext('webgl2', {
              alpha: true,
              antialias: true,
              powerPreference: 'default',
              preserveDrawingBuffer: true
            }) || canvas.getContext('webgl', {
              alpha: true,
              antialias: true,
              powerPreference: 'default',
              preserveDrawingBuffer: true
            });
            
            return new THREE.WebGLRenderer({
              canvas,
              context: context as WebGLRenderingContext,
              antialias: true,
              alpha: true,
              powerPreference: 'default',
              preserveDrawingBuffer: true
            });
          }}
          dpr={[1, 1.5]} // Lower max DPR to improve performance
          orthographic={false}
          onError={(error) => {
            console.error("Three.js Canvas Error:", error);
            setHasError(true);
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 4]}
            fov={60}
            near={0.1}
            far={1000}
          />
          
          {/* Lighting setup */}
          <ambientLight intensity={0.2} />
          <pointLight 
            position={[0, 0, 4]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          
          {/* Globe with consistent scale */}
          <group scale={1.25} position={[0,0.7,0]}>
            <Earth />
          </group>
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            target={new THREE.Vector3(0, 0, 0)}
          />
        </Canvas>
      </ErrorBoundaryComponent>
    </div>
  );
};

export default GlobeVisualization; 
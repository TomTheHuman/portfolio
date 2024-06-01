import React, {
  Suspense, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

// External Imports
import * as THREE from 'three';
import {
  Canvas, useThree, useFrame, MeshProps, MeshStandardMaterialProps,
} from '@react-three/fiber';

// Internal Imports
import {
  useRecoilCallback,
  useRecoilState, useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import sx from './Background.module.scss';
import colorPalette from '../../utils/Palette';
import { themePaletteState } from '../../utils/State';

interface IGridCellProps {
  meshProps: MeshProps;
  matProps: MeshStandardMaterialProps;
  z: number;
}

function Box(props: IGridCellProps): React.ReactElement {
  const {
    meshProps, matProps, z,
  } = props;
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const palette = useRecoilValue(themePaletteState);
  const lastColorRef = useRef<string>(palette.secondary);
  const lightRef = useRef<THREE.PointLight>(null);

  const heightBuffer = 1.1;

  const { viewport, camera } = useThree();
  const { height, width } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height * heightBuffer) + 0.4,
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), (60 / 105) * 1000 * 0.5);
    }, (60 / 128) * 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.set(
        (data.rX += 0.001),
        (data.rY += 0.001),
        (data.rZ += 0.001),
      );
      ref.current.position.set(data.x * width, (data.y -= 0.025), z);

      const scale = pulse ? 2 : 1.5;
      ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), delta * 6);
    }
    if (data.y < -height * 1.1) data.y = height * heightBuffer;
    if (
      matRef.current
      && lastColorRef.current
      && lastColorRef.current !== palette.secondary
    ) {
      const targetColor = new THREE.Color(palette.secondary);
      matRef.current.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <>
      <mesh
        ref={ref}
        {...meshProps}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial ref={matRef} {...matProps} />
      </mesh>
    </>
  );
}

function Boxes(): React.ReactElement {
  const palette = useRecoilValue(themePaletteState);
  const {
    viewport, camera, size, gl,
  } = useThree();
  const [bgColor, setBgColor] = useState<THREE.Color>(new THREE.Color(palette.primary));
  const currBgColor = useRef<THREE.Color>(bgColor);

  const radius = 5;
  const boxGap = 0.1;
  const boxWidth = 0.99;
  const totalBoxSize = boxGap + boxWidth;
  const numBoxesWidth = 100;

  const viewportWidth = numBoxesWidth * totalBoxSize;
  const aspectRatio = size.width / size.height;
  const viewportHeight = viewportWidth / aspectRatio;
  const numBoxesHeight = Math.floor(viewportHeight / totalBoxSize);

  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  gl.setClearColor(bgColor);

  useEffect(() => {
    currBgColor.current = new THREE.Color(palette.primary);
  }, [palette.primary]);

  useFrame(() => {
    if (
      currBgColor.current
      && !bgColor.equals(currBgColor.current)
    ) {
      bgColor.lerp(currBgColor.current, 0.1);
      setBgColor(bgColor);
      gl.setClearColor(bgColor);
    }
  });

  return (
    <>
      {Array.from({ length: 60 }, (_, idx) => (
        <Box
          key={idx}
          z={(idx / 60) * 120 - 80}
          meshProps={{
            geometry: geom,
            scale: 2,
          }}
          matProps={{
            color: palette.secondary,
          }}
        />
      ))}
    </>
  );
}

function ThreeCanvas(): React.ReactElement {
  // const sp = useRecoilValue(scrollPercentState);
  const palette = useRecoilValue(themePaletteState);

  return (
    <Canvas
      gl={{ alpha: false, antialias: true }}
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 60],
        fov: 30,
        near: 0.01,
        far: 100,
      }}
      className={sx.canvas}
    >
      <directionalLight position={[10, 10, 10]} intensity={1.4} />
      <ambientLight intensity={1} />
      <Boxes />
    </Canvas>
  );
}

/** Animated backdrop to hide ThreeJS background during page load */
function FadeIn(): React.ReactElement {
  return (
    <div id={sx.fadeIn} />
  );
}

/** Background Component */
export default function Background(): React.ReactElement {
  return (
    <div className={sx.root}>
      <Suspense fallback={null}>
        <ThreeCanvas />
        <FadeIn />
      </Suspense>
    </div>
  );
}

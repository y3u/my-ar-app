import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';

export function AREditor() {
  const { camera, scene } = useThree();
  const [selectedObject, setSelectedObject] = useState(null);
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  const handleSelect = (object) => {
    setSelectedObject(object);
  };

  return (
    <>
      <OrbitControls ref={controlsRef} />
      {selectedObject && (
        <TransformControls object={selectedObject} mode="translate" />
      )}
      {/* ここにARオブジェクトを追加 */}
    </>
  );
}

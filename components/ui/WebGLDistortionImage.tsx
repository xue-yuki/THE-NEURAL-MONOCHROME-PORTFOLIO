"use client";

import * as THREE from "three";
import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uImageRes;
varying vec2 vUv;

void main() {
  // Implement object-fit: cover
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageRes.x / uImageRes.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageRes.y / uImageRes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // Liquid / Glitch distortion based on progress
  float wave = sin(uv.y * 15.0) * 0.015 * uProgress;
  float wave2 = cos(uv.x * 20.0) * 0.015 * uProgress;
  
  uv.x += wave;
  uv.y += wave2;
  
  // RGB Shift for a cyber/hacker vibe
  float r = texture2D(uTexture, uv + vec2(0.015 * uProgress, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(0.015 * uProgress, 0.0)).b;
  
  // Monochromatic tinting logic
  vec3 color = vec3(r, g, b);
  float grayscale = dot(color, vec3(0.299, 0.587, 0.114));
  
  // We tint it slightly blue/matrix-y when hovered, pure mono when not
  vec3 mono = vec3(grayscale);
  vec3 hoverTint = mix(mono, color * vec3(1.2, 1.2, 1.5), uProgress);
  
  // Vignette effect to blend with dark background
  float vignette = smoothstep(1.5, 0.2, length(vUv - 0.5) * 1.5);
  
  gl_FragColor = vec4(hoverTint * vignette, 1.0);
}
`;

function DistortedPlane({ imageSrc, isHovered }: { imageSrc: string, isHovered: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
  const texture = useTexture(imageSrc) as THREE.Texture;
  const image = texture.image as HTMLImageElement;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageRes: { value: new THREE.Vector2(image.width, image.height) },
    }),
    [texture, size, image]
  );

  // Update resolution on resize
  useFrame(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  });

  useFrame((state, delta) => {
    // Lerp progress for smooth transition
    uniforms.uProgress.value = THREE.MathUtils.lerp(
      uniforms.uProgress.value,
      isHovered ? 1 : 0,
      0.08
    );
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function WebGLDistortionImage({ imageSrc, isHovered }: { imageSrc: string, isHovered: boolean }) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={null}>
          <DistortedPlane imageSrc={imageSrc} isHovered={isHovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const MeshGradientDynamic = dynamic(
  () => import("@/components/ui/MeshGradient").then((mod) => mod.MeshGradient),
  { ssr: false }
);

export const MeshGradient = () => {
    const { useMountDelay } = require("@/lib/useMountDelay");
    const isMounted = useMountDelay(800);
    if (!isMounted) return null;
    return <MeshGradientDynamic />;
};

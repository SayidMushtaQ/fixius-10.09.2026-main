import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999]">
      <div className="h-full bg-primary animate-progress shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
    </div>
  );
}

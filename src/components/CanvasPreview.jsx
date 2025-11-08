import React, { useEffect } from "react";

export default function CanvasPreview({ canvasRef, onRender }) {
  useEffect(() => {
    onRender && onRender();
  }, [onRender]);
  return (
    <div className="canvasWrap">
      <canvas ref={canvasRef} />
    </div>
  );
}

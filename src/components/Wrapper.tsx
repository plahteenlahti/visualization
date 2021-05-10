import React from "react";
import { useMeasure } from "../hooks/useMeasure";

export const ResponsiveWrapper = ({ children }) => {
  const [measureRef, bounds] = useMeasure();
  const shouldRender = bounds.width > 0 && bounds.height > 0;

  return (
    <div ref={measureRef} style={{ width: "100%", height: "100%" }}>
      {shouldRender && children({ width: bounds.width, height: bounds.height })}
    </div>
  );
};

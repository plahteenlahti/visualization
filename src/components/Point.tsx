import React, { FC, useContext } from "react";
import { ThemeContext } from "styled-components";

type Props = {
  x: number;
  y: number;
  data: {
    percentage: number;
  };
  isInactive: boolean;
  size: number;
  borderColor: string;
  borderWidth: number;
};

export const Point: FC<Props> = ({
  x,
  y,
  data,
  isInactive,
  size,
  borderColor,
  borderWidth,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        r={(size + borderWidth) / 2}
        cy={size / 5}
        fill="rgba(0, 0, 0, .2)"
      />
      <circle
        r={size / 2}
        fill={theme.background}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      {!isInactive && (
        <text textAnchor="middle" y={4} fill={theme.text} fontSize="10px">
          {Math.round(data.percentage)}%
        </text>
      )}
    </g>
  );
};

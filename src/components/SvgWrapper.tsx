import React, { FC } from "react";
import { useTheme } from "../hooks/useTheme";
import { Defs } from "./Defs";

type Props = {
  width: number;
  height: number;
  margin: {
    top: number;
    left: number;
  };
  defs: [];
  children: any;
  role?: string;
};

export const SvgWrapper: FC<Props> = ({
  width,
  height,
  margin,
  defs,
  children,
  role,
}) => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role={role}
      width={width}
      height={height}
    >
      <Defs defs={defs} />
      <rect width={width} height={height} fill={theme.background} />
      <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
    </svg>
  );
};

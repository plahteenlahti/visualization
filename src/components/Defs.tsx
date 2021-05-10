import React, { FC } from "react";

export const LinearGradient = ({ id, colors }) => (
  <linearGradient id={id} x1={0} x2={0} y1={0} y2={1}>
    {colors.map(({ offset, color, opacity }) => (
      <stop
        key={offset}
        offset={`${offset}%`}
        stopColor={color}
        stopOpacity={opacity !== undefined ? opacity : 1}
      />
    ))}
  </linearGradient>
);

export const linearGradientDef = (id, colors, options = {}) => ({
  id,
  type: "linearGradient",
  colors,
  ...options,
});

export const gradientTypes = {
  linearGradient: LinearGradient,
};

export const defsMapping = {
  ...gradientTypes,
};

type Props = {
  defs: Array<{
    type: string;
    id: string;
  }>;
};

export const Defs: FC<Props> = ({ defs: definitions }) => {
  if (!definitions || definitions.length < 1) return null;

  return (
    <defs>
      {definitions.map(({ type, ...def }) => {
        if (defsMapping[type])
          return React.createElement(defsMapping[type], {
            key: def.id,
            ...def,
          });

        return null;
      })}
    </defs>
  );
};

import React from 'react';
import * as IconComponents from 'assets/icons';

export type IconType = keyof typeof IconComponents;

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  icon: IconType;
  size?: number | number;
}

export default function Icon({ icon, size = 16, ...svgProps }: IconProps) {
  const IconComponent = IconComponents[icon];
  return (
    <IconComponent
      aria-labelledby={svgProps['aria-labelledby'] ?? icon}
      width={size}
      height={size}
      {...svgProps}
    />
  );
}

import React from 'react';
import * as IconComponents from 'assets/icons';

export type IconType = keyof typeof IconComponents;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconType;
  size?: number | string;
  title?: string;
}

export default function Icon({ icon, title, size = 16, ...svgProps }: IconProps) {
  const IconComponent = IconComponents[icon];

  return <IconComponent width={size} height={size} title={title ?? icon} {...svgProps} />;
}

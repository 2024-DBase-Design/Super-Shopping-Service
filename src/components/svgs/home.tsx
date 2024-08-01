import React from 'react';

export const HomeIconComponent: React.FC<{
  className?: string;
  size?: number;
  fillColor?: string;
}> = ({ className, size = 1.25, fillColor = '#8f8efe' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size + 'em'}
      viewBox="35.187 640.972 20 20"
    >
      <path
        fill={fillColor}
        d="M50.11 648.938l-4.715-3.965a.45.45 0 00-.586 0l-4.75 3.992a.456.456 0 00.297.805h.69v5.296c0 .606.49 1.094 1.095 1.094h1.55v-3.097c0-.204.16-.368.364-.368h2.093c.204 0 .368.164.368.367v3.098h1.547c.605 0 1.093-.492 1.093-1.094v-5.296h.699a.457.457 0 00.254-.832z"
      ></path>
      <ellipse
        cx="45.187"
        cy="650.972"
        fill="none"
        stroke={fillColor}
        strokeWidth="1.25"
        rx="10"
        ry="10"
      ></ellipse>
    </svg>
  );
};

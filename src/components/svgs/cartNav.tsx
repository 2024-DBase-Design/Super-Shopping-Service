import React from 'react';

export const CartNavIconComponent: React.FC<{
  className?: string;
  size?: number;
  fillColor?: string;
}> = ({ className, size = 1.25, fillColor = '#8f8efe' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size + 'em'}
      viewBox="69.011 640.706 20 20"
    >
      <ellipse
        cx="79.011"
        cy="650.706"
        fill="none"
        stroke={fillColor}
        strokeWidth="1.25"
        rx="10"
        ry="10"
      ></ellipse>
      <path
        fill={fillColor}
        d="M76.235 654.736c-.649 0-1.171.526-1.171 1.179 0 .65.522 1.175 1.171 1.175a1.177 1.177 0 100-2.354zM82.123 654.736c-.65 0-1.172.526-1.172 1.179a1.174 1.174 0 102.347 0c0-.653-.526-1.179-1.175-1.179zM72.702 645.316v1.179h1.179l2.116 4.463-.795 1.445a1.179 1.179 0 001.033 1.744h7.063v-1.176h-6.814a.147.147 0 01-.146-.149c0-.025.007-.049.018-.071l.526-.958h4.385c.444 0 .827-.245 1.033-.608l2.102-3.82a.575.575 0 00.075-.281.59.59 0 00-.59-.589h-8.703l-.557-1.179h-1.925z"
      ></path>
    </svg>
  );
};

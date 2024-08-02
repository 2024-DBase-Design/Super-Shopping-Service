import React from 'react';

export const WarehouseIconComponent: React.FC<{
  className?: string;
  size?: number;
  fillColor?: string;
}> = ({ className, size = 1.25, fillColor = '#8f8efe' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size + 'em'}
      viewBox="156.66 602.02 20 20"
    >
      <defs>
        <clipPath id="366c65c686">
          <path d="M149.035 644.813h12.73v11.23h-12.73v-11.23z"></path>
        </clipPath>
        <clipPath id="3d3366b43d">
          <path d="M151 655h8v1.043h-8V655z"></path>
        </clipPath>
      </defs>
      <g clipPath="url(#366c65c686)" transform="translate(11.634 -39.106)">
        <path
          fill={fillColor}
          d="M154.559 645.078l-4.899 3.047a1.33 1.33 0 00-.625 1.125v6.898h2.031v-5.242c0-.734.594-1.324 1.325-1.324h5.738c.73 0 1.324.59 1.324 1.324v5.242h2.031v-6.898c0-.457-.238-.883-.629-1.125l-4.894-3.047a1.334 1.334 0 00-1.402 0"
        ></path>
      </g>
      <path
        fill={fillColor}
        d="M170.212 612.097h-6.641v-.418h6.641v.418M170.212 612.804h-6.641v-.418h6.641v.418M170.212 613.507h-6.641v-.414h6.641v.414M170.212 614.214h-6.641v-.414h6.641v.414M170.212 614.921h-6.641v-.414h6.641v.414M170.212 615.628h-6.641v-.418h6.641v.418M170.212 616.335h-6.641v-.418h6.641v.418"
      ></path>
      <g clipPath="url(#3d3366b43d)" transform="translate(11.634 -39.106)">
        <path fill={fillColor} d="M158.578 656.148h-6.64v-.418h6.64v.418"></path>
      </g>
      <ellipse
        cx="166.66"
        cy="612.02"
        fill="none"
        stroke={fillColor}
        strokeWidth="1.25"
        rx="10"
        ry="10"
      ></ellipse>
    </svg>
  );
};

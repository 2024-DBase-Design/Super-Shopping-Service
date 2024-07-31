import React from 'react';

export const CartIconComponent: React.FC<{
  className?: string;
  size?: number;
  fillColor?: string;
}> = ({ className, size = 1.25, fillColor = '#8f8efe' }) => {
  return (
    <svg
      className={className}
      viewBox="358.0977 295.6395 69.0109 69.0281"
      xmlns="http://www.w3.org/2000/svg"
      width={size + 'em'}
    >
      <defs>
        <clipPath id="a">
          <path d="M180.547 577.977h15.723v15.726h-15.723v-15.726z" />
        </clipPath>
      </defs>
      <g
        fill={fillColor}
        clipPath="url(#a)"
        transform="matrix(4.38927 0 0 4.38927 -434.37 -2241.253)"
      >
        <path d="M185.293 590.64c-.875 0-1.574.712-1.574 1.587 0 .87.699 1.582 1.574 1.582.875 0 1.586-.711 1.586-1.582 0-.875-.711-1.586-1.586-1.586zM193.21 590.64a1.58 1.58 0 00-1.577 1.587 1.58 1.58 0 103.16 0c0-.875-.711-1.586-1.582-1.586zM180.547 577.977v1.586h1.582l2.844 6-1.067 1.94a1.584 1.584 0 001.387 2.348h9.5v-1.585h-9.164a.193.193 0 01-.195-.196c0-.035.007-.066.023-.097l.707-1.29h5.899c.593 0 1.109-.328 1.382-.816l2.832-5.137a.79.79 0 00-.695-1.168h-11.7l-.753-1.585h-2.582z" />
      </g>
    </svg>
  );
};

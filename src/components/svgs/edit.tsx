import React from 'react';

export const EditIconComponent: React.FC<{ className?: string; fillColor?: string }> = ({
  className,
  fillColor = '#c76e77'
}) => {
  return (
    <svg
      viewBox="80.1755 292.9683 52.0342 52.0347"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      width="24px"
      fill={fillColor}
    >
      <defs>
        <clipPath id="a">
          <path d="M136.71 336H152v15.379h-15.29V336z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" transform="matrix(3.24958 0 0 3.24958 -364.078 -795.728)">
        <path
          fill={fillColor}
          d="M150.258 349.805H137.94v-12.317h7.391v-1.23h-7.39c-.68 0-1.231.55-1.231 1.23v12.317c0 .68.55 1.234 1.23 1.234h12.317c.68 0 1.234-.555 1.234-1.234v-7.387h-1.234v7.387z"
        />
      </g>
      <path
        fill={fillColor}
        d="M96.182 329.059h8.429l20.424-20.424-8.492-8.492-20.361 20.361v8.555zM131.039 296.97l-2.831-2.831a4.007 4.007 0 00-5.661 0l-3.173 3.174 8.492 8.492 3.173-3.174a4.007 4.007 0 000-5.661z"
      />
    </svg>
  );
};

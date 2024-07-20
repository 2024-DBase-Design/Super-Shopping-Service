import React from 'react';

export const DeleteIconComponent: React.FC<{ className?: string; fillColor?: string }> = ({
  className,
  fillColor = '#c76e77'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 16 16"
      height="24px"
      width="24px"
      fill={fillColor}
    >
      <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5M8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5m3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0" />
    </svg>
  );
};

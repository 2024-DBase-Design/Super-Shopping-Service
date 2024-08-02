import React from 'react';

export const BoxesIconComponent: React.FC<{
  className?: string;
  size?: number;
  fillColor?: string;
}> = ({ className, size = 1.25, fillColor = '#8f8efe' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size + 'em'}
      viewBox="33.322 602.576 20 20"
    >
      <defs>
        <clipPath id="b253d159ba">
          <path d="M24.422 643.68h13.476v14.976H24.422V643.68z"></path>
        </clipPath>
      </defs>
      <g
        fill={fillColor}
        fillRule="evenodd"
        clipPath="url(#b253d159ba)"
        transform="translate(11.634 -39.106)"
      >
        <path d="M31.227 653.36v1.242c0 .035.015.062.046.082l.973.558c.063.04.14-.008.14-.082v-1.656l4.009-2.313 1.261.73c.102.06.16.157.16.274v4.258a.314.314 0 01-.16.277l-3.687 2.13a.307.307 0 01-.317 0l-3.687-2.13a.314.314 0 01-.16-.277v-3.851l1.136.656c.09.05.188.086.286.101zM26.84 649.148l-.996.575v1.77c0 .034.015.062.047.081l.968.559a.095.095 0 00.145-.082v-1.145c.066.09.152.164.25.223l2.039 1.176v3.035l-.707.41a.314.314 0 01-.32 0l-3.688-2.129a.314.314 0 01-.16-.277v-4.258c0-.117.059-.215.16-.274l2.262-1.308v1.644z"></path>
        <path d="M31.516 643.746a.307.307 0 00-.317 0l-3.691 2.129a.31.31 0 00-.156.277v4.258a.31.31 0 00.156.278l3.687 2.128a.314.314 0 00.32 0l3.688-2.129a.314.314 0 00.16-.277v-4.258a.314.314 0 00-.16-.277l-1.262-.727-4.007 2.313v1.656a.095.095 0 01-.145.082l-.969-.558a.098.098 0 01-.047-.086v-1.766l4.004-2.312-1.261-.73z"></path>
      </g>
      <ellipse
        cx="43.322"
        cy="612.576"
        fill="none"
        stroke={fillColor}
        strokeWidth="1.25"
        rx="10"
        ry="10"
      ></ellipse>
    </svg>
  );
};

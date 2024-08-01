/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import styles from './navFooter.module.scss';
type NavFooterProps = {
  index?: number;
  icons_Src?: string[];
  btn_Functions?: { (): void }[];
};

const NavFooterComponent: React.FC<NavFooterProps> = ({
  index = 0,
  icons_Src = [],
  btn_Functions = []
}) => {
  return (
    <div className={`${styles.nav_footer}`}>
      <div className={`${styles.nav_footer_container}`}>
        {icons_Src.map((icon, i) => (
          <div
            key={i}
            onClick={() => {
              btn_Functions[i] ? btn_Functions[i]() : {};
            }}
            className={`${i === index ? styles.nav_footer_selected : ''} ${styles.nav_mouse}`}
          >
            <img alt="icon" width={40} height={40} src={icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavFooterComponent;

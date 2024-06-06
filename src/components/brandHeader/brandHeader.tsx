import React from 'react';
import { LogoComponent } from '../svgs/logo';
import { shrikhand } from '@/app/fonts';
import styles from './brandHeader.module.scss';

export const BrandHeaderComponent: React.FC<object> = () => {
  return (
    <div className={styles.brandHeader}>
      <div className={styles.logoAligner}>
        &#x200B;
        <LogoComponent className={'mx-auto h-11 w-auto ' + styles.brandHeaderLogo} />
      </div>
      <h1 className={shrikhand.className + ' ' + styles.brandHeaderH1}>Silly Stuffs</h1>
    </div>
  );
};

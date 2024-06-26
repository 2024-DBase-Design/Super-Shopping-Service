import React from 'react';
import { LogoComponent } from '../svgs/logo';
import { shrikhand } from '@/app/fonts';
import styles from './brandHeader.module.scss';
import { SupplierLogoComponent } from '../svgs/supplier-logo';

export const BrandHeaderComponent: React.FC<{supplier: boolean}> = ({supplier = false}) => {
  return (
    <div className={styles.brandHeader}>
      <div className={styles.logoAligner}>
        &#x200B;
        {supplier? (
          <SupplierLogoComponent className={`mx-auto h-11 w-auto ${styles.brandHeaderLogo}`} />
        ) : (
          <LogoComponent className={`mx-auto h-11 w-auto ${styles.brandHeaderLogo}`} />
        )}
      </div>
      <h1 className={shrikhand.className + ' ' + (supplier? styles.supplierBrandHeaderH1 : styles.brandHeaderH1)}>Silly Stuffs</h1>
    </div>
  );
};

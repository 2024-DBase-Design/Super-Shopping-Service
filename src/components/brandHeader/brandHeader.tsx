import React from 'react';
import { LogoComponent } from '../svgs/logo';
import { shrikhand, sintony } from '@/app/fonts';
import styles from './brandHeader.module.scss';
import { SupplierLogoComponent } from '../svgs/supplier-logo';

export const BrandHeaderComponent: React.FC<{ supplier?: boolean }> = ({ supplier = false }) => {
  return (
    <div className={styles.brandLogo}>
      <div>
        {supplier ? (
          <>
            <h1 className={`${shrikhand.className} ${styles.header} ${styles.supplierBrandHeaderH1}`}>Silly Stuffs</h1>
            <div className={`${sintony.className}`} style={{ color: "white" }}><b>STAFF</b></div>
          </>
        ) : (
          <h1 className={`${shrikhand.className} ${styles.header}`}>Silly Stuffs</h1>
        )}
      </div>
      {supplier ? (
        <SupplierLogoComponent className={`mx-auto h-11 w-auto logo ${styles.brandHeaderLogo} ${styles.logo}`} />
      ) : (
        <LogoComponent className={`mx-auto h-11 w-auto ${styles.brandHeaderLogo} ${styles.logo}`} />
      )}
    </div>
  );
};

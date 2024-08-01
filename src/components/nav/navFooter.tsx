/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { ReactNode } from 'react';
import styles from './navFooter.module.scss';
import Link from 'next/link';
import { HomeIconComponent } from '../svgs/home';
import { ProfileIconComponent } from '../svgs/profile';
import { CartNavIconComponent } from '../svgs/cartNav';

type NavButton = {
  icon: ReactNode;
  href: string;
};

export const getCustomerButtons = (current: number): NavButton[] => {
  return [
    {
      icon: (
        <HomeIconComponent fillColor={current === 0 ? '#c76e77' : '#8f8e8e'}></HomeIconComponent>
      ),
      href: '/home'
    },
    {
      icon: (
        <CartNavIconComponent
          fillColor={current === 1 ? '#c76e77' : '#8f8e8e'}
        ></CartNavIconComponent>
      ),
      href: '/cart'
    },
    {
      icon: (
        <ProfileIconComponent
          fillColor={current === 2 ? '#c76e77' : '#8f8e8e'}
        ></ProfileIconComponent>
      ),
      href: '/profile'
    }
  ];
};
export const supplierButtons: NavButton[] = [];

type NavFooterProps = {
  navButtons: NavButton[];
};

const NavFooterComponent: React.FC<NavFooterProps> = ({ navButtons }) => {
  return (
    <>
      <br></br>
      <div className={styles.navBar}>
        <div className={`${styles.nav_footer}`}>
          <div className={`${styles.nav_footer_container}`}>
            {navButtons.map((button, i) => (
              <Link key={i} className={`${styles.nav_mouse}`} href={button.href}>
                {button.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavFooterComponent;

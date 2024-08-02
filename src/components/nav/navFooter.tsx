/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { ReactNode } from 'react';
import styles from './navFooter.module.scss';
import Link from 'next/link';
import { HomeIconComponent } from '../svgs/home';
import { ProfileIconComponent } from '../svgs/profile';
import { CartNavIconComponent } from '../svgs/cartNav';
import { BoxesIconComponent } from '../svgs/boxes';
import { PeopleIconComponent } from '../svgs/people';
import { WarehouseIconComponent } from '../svgs/warehouse';

type NavButton = {
  icon: ReactNode;
  href: string;
};

export const getCustomerButtons = (current: number): NavButton[] => {
  return [
    {
      icon: <HomeIconComponent fillColor={current === 0 ? '#c76e77' : '#8f8e8e'} />,
      href: '/home'
    },
    {
      icon: <CartNavIconComponent fillColor={current === 1 ? '#c76e77' : '#8f8e8e'} />,
      href: '/cart'
    },
    {
      icon: <ProfileIconComponent fillColor={current === 2 ? '#c76e77' : '#8f8e8e'} />,
      href: '/profile'
    }
  ];
};

export const getStaffButtons = (current: number): NavButton[] => {
  return [
    {
      icon: <BoxesIconComponent fillColor={current === 0 ? '#c76e77' : '#8f8e8e'} />,
      href: '/supplier/products'
    },
    {
      icon: <PeopleIconComponent fillColor={current === 1 ? '#c76e77' : '#8f8e8e'} />,
      href: '/supplier/customers'
    },
    {
      icon: <WarehouseIconComponent fillColor={current === 2 ? '#c76e77' : '#8f8e8e'} />,
      href: '/supplier/warehouses'
    },
    {
      icon: <ProfileIconComponent fillColor={current === 3 ? '#c76e77' : '#8f8e8e'} />,
      href: '/supplier/profile'
    }
  ];
};

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

'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/session.scss';
import styles from './cart.module.scss';
import { CartIconComponent } from '@/components/svgs/cart';
import Link from 'next/link';
import { getCart } from '@/helpers/api';
import { useRouter } from 'next/navigation';
import useClientSide from '@/hooks/useClientSide';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/hooks/useRoleAuth';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import NavFooter, { getCustomerButtons } from '@/components/nav/navFooter';

export type CartItem = {
  id: number;
  name: string;
  url: string;
  price: number;
  quantity: number;
};

export default function Page() {
  const router = useRouter();
  const isClient = useClientSide();
  let customerID: number = -1;

  // Route Guarding for logged in users (on page load, check if user is logged in. If not, redirect to login page)
  // Only allows customers to access this page
  useEffect(() => {
    if (isClient) {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.role != 'customer') {
            throw new Error('Invalid role');
          }
          customerID = decoded.id;
        } catch (error) {
          window.localStorage.removeItem('token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [router, isClient]);

  const tempItem: CartItem[] = [];
  const [cart, setCart] = useState(tempItem);
  getCart(customerID).then((res) => setCart(res));

  return (
    <>
      <BrandHeaderComponent></BrandHeaderComponent>
      <div className="main-body">
        <h1>In Cart</h1>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div className={styles.cartItem} key={item.id}>
              <img src={item.url} />
              <div>
                <h3>{item.name}</h3>
                <p className="money">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link href="/cart/checkout">
            <button>
              Checkout <CartIconComponent className="inline" fillColor="#fff"></CartIconComponent>
            </button>
          </Link>
        </div>
        <NavFooter navButtons={getCustomerButtons(1)} />
      </div>
    </>
  );
}

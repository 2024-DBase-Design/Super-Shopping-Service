'use client';

import React, { useEffect, useState } from 'react';
import { getCart, CartItem } from '../page';
import styles from '../cart.module.scss'
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import { FormHydration } from '@/components/input/dropdownInput';
import { useRouter } from 'next/navigation';
import useClientSide from '@/hooks/useClientSide';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/hooks/useRoleAuth';

const checkout = async (formValues: FormValues) => {
  //api call that clears cart, creates an order, and changes balance
}

function calculateCost(cartItems: CartItem[]){
  return cartItems.reduce((total, item) => total += item.price, 0);
}

// TODO: extract the type and common api call functions below
// to a .ts file in the helper/ directory
const testPayments: FormHydration[] = [
  {label: "•••••••••••1234", value:"0"},
  {label: "•••••••••••4567", value:"1"},
  {label: "•••••••••••1580", value:"2"}
]
function getPaymentOptions(): FormHydration[]{
  // api call to make user payments
  return testPayments;
}

const testAddresses: FormHydration[] = [
  {label: "123 Street Street, Cincinnati OH 12345", value:"0"},
  {label: "456 Beep Boop, Cincinnati OH 67890", value:"1"}
]
function getDeliveryAddressOptions(): FormHydration[]{
  return testAddresses;
}

export default function Page() {
  const router = useRouter();
  const isClient = useClientSide();
  const token = window.localStorage.getItem('token');

  // Route Guarding for logged in users (on page load, check if user is logged in. If not, redirect to login page)
  // Only allows customers to access this page
  useEffect(() => {
    if (isClient) {
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.role != 'customer') {
            throw new Error('Invalid role');
          }
        } catch (error) {
          window.localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }
  }, [router, isClient]);

  const tsBs: CartItem[] = [];
  const [cart, setCart] = useState(tsBs);
  const payments: FormHydration[] = getPaymentOptions(decoded.id);
  const testAddresses: FormHydration[] = getDeliveryAddressOptions();
  let total: number = 0;
  let miniCart: CartItem[] = [];
  let i = 0;
  
  getCart().then(res => {setCart(res)
    total = calculateCost(res);
    miniCart = cart.length >= 3 ? cart.slice(0, 3) : cart.slice(cart.length);
    if(cart.length > 3) i++;
  });
  
  const inputs: FormInput[] = [
    {
      name: 'Pay With',
      inputType: InputTypeEnum.DropDown,
      defaultValue: payments[0].label,
      options: payments,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Credit card' }]
    },
    {
      name: 'Delivery Address',
      inputType: InputTypeEnum.DropDown,
      defaultValue: testAddresses[0].label,
      options: testAddresses,
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Delivery address' }
      ]
    }
  ]

  return <><BrandHeaderComponent></BrandHeaderComponent>
  <h1 className='text-white p-2 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'>Checkout</h1>
    <div className='flex items-center justify-center'>
      {miniCart.map((item) => { i++; return(
            <div className={`${styles.cartItem} ${i === 4 ? styles.darkFilter : ''}`} style={{ padding: "0.5em" }}>
              <img src={item.url} width="100"/>
              {i === 4 && (
                <div className={styles.overlayText}><span>+{i-3}</span></div>
              )}
            </div>)})}
    </div>
  <div className='main-body'>
    <h2><b className='inline-block'>Total:</b> {total}</h2>
    <br></br>
    <div className='flex flex-col items-center justify-center'>
      <FormComponent
        inputs={inputs}
        submitAction={checkout}
        submitName="pay"
        buttonClassName="submit-button"
      ></FormComponent>
    </div>
  </div>
  <div style={{backgroundColor: "grey", position: "fixed", bottom:"0"}}>Imagine the navbar is here</div>
  </>
}

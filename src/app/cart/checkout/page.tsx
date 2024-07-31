'use client';

import React, { useEffect, useState } from 'react';
import { CartItem } from '../page';
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
import { getCart, getDeliveryAddressOptions, getPaymentOptions } from '@/helpers/api';
import { buildTwoEntityUrl, EntityType, HttpMethod } from '@/helpers/api';


export default function Page() {
  const router = useRouter();
  const isClient = useClientSide();
  const token = window.localStorage.getItem('token');
  let customerID: number = -1;
  

  const checkout = async (formValues: FormValues) => {
    // API call to create an order
    try {
      const response = await fetch(buildTwoEntityUrl(HttpMethod.POST, EntityType.CUSTOMER, customerID, EntityType.ORDER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardId: formValues.getValue('Pay With'),
          deliveryPlan: {
            "type": "standard",
            "price": 10,
            "deliveryDate": "Tomorrow",
            "sentDate": "Yesterday",
          }
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // If successful, change balance? push to order confirmation page (home page for now)
      console.log('API call successful');
      router.push('/home');

    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  function calculateCost(cartItems: CartItem[]){
    return cartItems.reduce((total, item) => total += item.price, 0);
  }

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
          customerID = decoded.id;
        } catch (error) {
          window.localStorage.removeItem('token');
          router.push('/login');
        }
      }
      else {
        router.push('/login');
      }
    }
  }, [router, isClient]);

  const tempItem: CartItem[] = [];
  const [cart, setCart] = useState(tempItem);
  const tempPayment: FormHydration[] = [];
  const [payments, setPayments] = useState(tempPayment);
  const tempAddr: FormHydration[] = [];
  const [addresses, setAddresses] = useState(tempAddr);

  let total: number = 0;
  let miniCart: CartItem[] = [];
  let i = 0;
  
  getCart(customerID).then(res => {setCart(res)
    total = calculateCost(res);
    miniCart = cart.length >= 3 ? cart.slice(0, 3) : cart.slice(cart.length);
    if(cart.length > 3) i++;
  });
  getPaymentOptions(customerID).then(res => setPayments(res));
  getDeliveryAddressOptions(customerID).then(res => setAddresses(res));
  
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
      defaultValue: addresses[0].label,
      options: addresses,
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

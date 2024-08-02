'use client';

import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import Link from 'next/link';
import React from 'react';
import '@/styles/noSession.scss';
import styles from './supplier-login.module.scss';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import { shrikhand, sintony } from '@/app/fonts';
import { SupplierLogoComponent } from '@/components/svgs/supplier-logo';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useClientSide from '@/hooks/useClientSide';
import { DecodedToken } from '@/hooks/useRoleAuth';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_URL } from '@/helpers/api';

export default function SupplierLoginPage() {
  const router = useRouter();
  const isClient = useClientSide();

  // Route Guarding for logged in users (on page load, check if user is already logged in and redirect to correct home page if so)
  useEffect(() => {
    if (isClient) {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.role === 'customer') {
            // TODO: Change push to customer home page once it is written
            router.push('/home');
          } else if (decoded.role === 'staff') {
            // TODO: Change push to staff home page once it is written
            router.push('/home');
          } else {
            throw new Error('Invalid role');
          }
        } catch (error) {
          window.localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }
  }, [router, isClient]);

  const inputs: FormInput[] = [
    {
      name: 'Name',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
    },
    {
      name: 'Password',
      inputType: InputTypeEnum.Password,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Password' }]
    }
  ];

  const attemptLogin = async (formValues: FormValues) => {
    try {
      // Send login request to API (common Login URL now)
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formValues.getValue('Name'),
          password: formValues.getValue('Password')
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful API call, push to correct home page (same as useEffect code above)
      if (isClient) {
        const token = await response.text();
        if (token) {
          window.localStorage.setItem('token', token);
          try {
            const decoded = jwtDecode<DecodedToken>(token);
            if (decoded.role === 'customer') {
              // TODO: Change push to customer home page once it is written
              router.push('/home');
            } else if (decoded.role === 'staff') {
              // TODO: Change push to staff home page once it is written
              router.push('/home');
            } else {
              throw new Error('Invalid role');
            }
          } catch (error) {
            window.localStorage.removeItem('token');
            router.push('/login');
          }
        }
      }

      console.log('API call successful');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div className={'main-container ' + styles.mainContainer}>
      <BrandHeaderComponent supplier={true}></BrandHeaderComponent>
      <div className={'form-container ' + styles.formContainer}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`${sintony.className} text-center text-4xl font-bold leading-9 tracking-tight`}
            >
              <b>LOGIN</b>
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormComponent
              inputs={inputs}
              submitAction={attemptLogin}
              submitName="Login"
              buttonClassName="submit-button"
            ></FormComponent>
            <p className="mt-2 text-center text-xs text-white">
              <Link href="/login" className="font-semibold">
                Go to Customer Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

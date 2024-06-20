'use client';

import React, { useEffect } from 'react';
import '@/styles/noSession.scss';
import styles from './signup.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import Link from 'next/link';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { FormValues } from '@/helpers/formValues';
import { EntityType, HttpMethod, buildOneEntityUrl } from '@/helpers/api';
import { useRouter } from 'next/router';
import useClientSide from '@/hooks/useClientSide';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/hooks/useRoleAuth';

const SignUpPage = () => {
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
      name: 'Email Address',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Email address' },
        { type: ValidationRuleEnum.Email }
      ]
    },
    {
      name: 'Password',
      inputType: InputTypeEnum.Password,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Password' },
        { type: ValidationRuleEnum.TwoWayBinding, args: 'Confirm Password' }
      ]
    },
    {
      name: 'Confirm Password',
      inputType: InputTypeEnum.Password,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Password' },
        {
          type: ValidationRuleEnum.ConfirmMatch,
          args: 'Password'
        }
      ]
    }
  ];

  const attemptSignup = async (formValues: FormValues) => {
    try {
      const fullName = formValues.getValue('Name');
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // In case of multiple parts for last name

      // Send create request to API (customer specific URL)
      const response = await fetch(buildOneEntityUrl(HttpMethod.POST, EntityType.CUSTOMER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: formValues.getValue('Email Address'),
          password: formValues.getValue('Password')
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful API call, push to correct home page (same as useEffect code above)
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

      console.log('API call successful');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <BrandHeaderComponent></BrandHeaderComponent>
      <div className={'form-container ' + styles.formContainer}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`${shrikhand.className} text-center text-4xl font-bold leading-9 tracking-tight`}
            >
              Sign Up
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormComponent
              inputs={inputs}
              submitAction={attemptSignup}
              submitName="Sign Up"
              buttonClassName="submit-button"
            ></FormComponent>
            <p className="mt-3 text-center text-xs text-white">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold leading-6">
                Log in
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-white">
              <Link href="/supplier" className="font-semibold">
                Go to Supplier Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

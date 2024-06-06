'use client';

import React from 'react';
import { LogoComponent } from '@/components/svgs/logo';
import '@/styles/noSession.scss';
import styles from './login.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import Link from 'next/link';
import { FormValues } from '@/helpers/formValues';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import AUTH_CUSTOMER from '@/helpers/api';

const LoginPage = () => {
  const inputs: FormInput[] = [
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
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Password' }]
    }
  ];

  const attemptLogin = async (formValues: FormValues) => {
    try {
      const response = await fetch(AUTH_CUSTOMER, {
        // Modify the below stuff to match the postman API call
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formValues.getValue('email'),
          password: formValues.getValue('password')
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful API call, like storing cookies
      console.log('API call successful');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div className={'main-container ' + styles.mainContainer}>
      <div className={styles.brandLogo}>
        <h1 className={shrikhand.className + ' ' + styles.header}>Silly Stuffs</h1>
        <LogoComponent className={'mx-auto h-11 w-auto logo ' + styles.logo} />
      </div>
      <div className={'form-container ' + styles.formContainer}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`${shrikhand.className} text-center text-4xl font-bold leading-9 tracking-tight`}
            >
              Login
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormComponent
              inputs={inputs}
              submitAction={attemptLogin}
              submitName="Login"
              buttonClassName="submit-button"
            ></FormComponent>
            <p className="mt-3 text-center text-xs text-white">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold leading-6">
                Create a new account
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

export default LoginPage;

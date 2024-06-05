'use client';

import React from 'react';
import '@/styles/noSession.scss';
import styles from './signup.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import Link from 'next/link';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { FormValues } from '@/helpers/formValues';

const SignUpPage = () => {
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
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Password' }]
    },
    {
      name: 'Confirm Password',
      inputType: InputTypeEnum.Password,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Password' },
        { type: ValidationRuleEnum.ConfirmMatch, args: 'password' }
      ]
    },
    {
      name: 'Credit Card Number',
      inputType: InputTypeEnum.Number,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Credit card number' },
        { type: ValidationRuleEnum.CreditCard }
      ]
    },
    {
      name: 'Address',
      inputType: InputTypeEnum.Address,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
    }
  ];

  const attemptSignup = async (formValues: FormValues) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'PUT',
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

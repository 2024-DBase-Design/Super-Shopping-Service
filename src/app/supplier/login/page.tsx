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

export default function SupplierLoginPage() {
  const inputs: FormInput[] = [
    {
      name: 'Name',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Name' }
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
    // not implemented
  };
  
  return (<div className={'main-container ' + styles.mainContainer}>
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
  </div>)
}

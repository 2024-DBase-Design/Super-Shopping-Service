'use client';

import { useRouter } from 'next/router';
import useRoleAuth from '@/hooks/useRoleAuth';
import React from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import Link from 'next/link';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';

const addNewProduct = (formValues: FormValues) => {
  //If successful, should redirect to /supplier/Products/{newId}
  // Stock cannot be added on a new/non-existant Product
  // So don't worry about that here
};

export default function CustomerDetail() {
  //useRoleAuth(['staff'], '/login');
  const defaultGeneralFormInputs: FormInput[] = [
    {
      name: 'Name',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
    },
    {
      name: 'Description',
      inputType: InputTypeEnum.Text,
      validationRuleNames: []
    },
    {
      name: 'Price',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Price' }]
    },
    {
      name: 'Image',
      inputType: InputTypeEnum.File,
      validationRuleNames: []
    }
  ];

  return (
    <div className={styles.profile}>
      <p>Imagine a header is here</p>
      <div className={styles.nameTag + ' drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'}>ADD PRODUCT</div>
      <Link className={styles.link + ' close-button white'} href="/supplier/products"></Link>
      <div className="main-body">
        <FormComponent
          inputs={defaultGeneralFormInputs}
          submitAction={addNewProduct}
          submitName="Add New"
        ></FormComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

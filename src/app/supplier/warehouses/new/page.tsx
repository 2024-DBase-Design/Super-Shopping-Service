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

const addNewWarehouse = (formValues: FormValues) => {
  //If successful, should redirect to /supplier/warehouses/{newId}
  // Stock cannot be added on a new/non-existant warehouse
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
      name: 'Capacity',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Quantity' }]
    },
    {
      name: 'Address',
      inputType: InputTypeEnum.Address,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
    }
  ];

  return (
    <div className={styles.profile}>
      <p>Imagine a header is here</p>
      <div className={styles.nameTag + ' drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'}>
        ADD WAREHOUSE
      </div>
      <Link className={styles.link + ' close-button white'} href="/supplier/warehouses"></Link>
      <div className="main-body">
        <FormComponent
          inputs={defaultGeneralFormInputs}
          submitAction={addNewWarehouse}
          submitName="Add New"
        ></FormComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

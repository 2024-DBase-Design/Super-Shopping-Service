'use client';

import useRoleAuth from '@/hooks/useRoleAuth';
import React from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import Link from 'next/link';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import { buildOneEntityUrl, HttpMethod, EntityType } from '@/helpers/api';
import { Warehouse } from '@prisma/client';
import { useRouter } from 'next/navigation';

const AddNewWarehouse: React.FC = () => {
  const router = useRouter();

  const addNewWarehouse = async (formValues: FormValues) => {
    try {
      const response = await fetch(buildOneEntityUrl(HttpMethod.POST, EntityType.WAREHOUSE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          capacity: formValues.getValue('Capacity'),
          address: formValues.getValue('Address'),
          name: formValues.getValue('Name')
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const warehouseData: Warehouse = await response.json();

      // Redirect to /supplier/warehouses/{newId}
      router.push('/supplier/warehouses/' + warehouseData.id);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

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
};

export default AddNewWarehouse;

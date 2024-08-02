'use client';

import { useRouter } from 'next/navigation';
import useRoleAuth from '@/hooks/useRoleAuth';
import React from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import Link from 'next/link';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';
import { Product } from '@prisma/client';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import NavFooter, { getStaffButtons } from '@/components/nav/navFooter';

const AddNewProduct: React.FC = () => {
  const router = useRouter();

  const addNewProduct = async (formValues: FormValues) => {
    try {
      const productResponse = await fetch(buildOneEntityUrl(HttpMethod.POST, EntityType.PRODUCT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: formValues.getValue('Image'),
          name: formValues.getValue('Name'),
          description: formValues.getValue('Description'),
          price: formValues.getValue('Price'),
          category: 'Apparel', // TODO - get this from the form
          supplierId: 1, // TODO - get this from the form
          size: 'M', // TODO - get this from the form
          brand: 'Nike' // TODO - get this from the form
        })
      });

      if (!productResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const productData: Product = await productResponse.json();

      // Redirect to /supplier/products/{newId}
      router.push('/supplier/products/' + productData.id);
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
      <BrandHeaderComponent supplier={true} />
      <div className={styles.nameTag + ' drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'}>ADD PRODUCT</div>
      <Link className={styles.link + ' close-button white'} href="/supplier/products"></Link>
      <div className="main-body">
        <FormComponent
          inputs={defaultGeneralFormInputs}
          submitAction={addNewProduct}
          submitName="Add New"
        ></FormComponent>
        <NavFooter navButtons={getStaffButtons(0)} />
      </div>
    </div>
  );
};

export default AddNewProduct;

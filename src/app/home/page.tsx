'use client';

import React from 'react';
import { LogoComponent } from '@/components/svgs/logo';
import '@/styles/noSession.scss';
import styles from './home.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import Link from 'next/link';
import { FormValues } from '@/helpers/formValues';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';

const HomePage = () => {
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

  return (
    <div className={'main-container ' + styles.mainContainer}>
      <div className={styles.topSection}>
        <h1 className={shrikhand.className + ' ' + styles.header}>Silly Stuffs</h1>
        <input placeholder='Search' className={styles.searchBar} type="text" />
      </div>
      <div className={styles.homeCard}>
        <div className={styles.homeSection}>
          <h2>Category</h2>
        </div>
        <div className={styles.homeSection}>
          <h2>Recommended</h2>
        </div>
      </div>
      <div className={styles.navBar}>

      </div>
    </div>
  );
};

export default HomePage;

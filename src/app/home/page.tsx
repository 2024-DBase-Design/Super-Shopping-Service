'use client';

import React from 'react';
import { LogoComponent } from '@/components/svgs/logo';
import '@/styles/noSession.scss';
import styles from './home.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import NavFooter from '@/components/nav/navFooter';
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
        <input placeholder="Search" className={styles.searchBar} type="text" />
      </div>
      <div className={styles.homeCard}>
        <div className={styles.homeSection}>
          <h2>Category</h2>
          <div className={styles.categoryContainer}>
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
            <div className={styles.categoryOptions} />
          </div>
        </div>
        <div className={styles.homeSection}>
          <h2>Recommended</h2>
          <div className={styles.reccomendedContainer}>
            <div className={styles.recommendedOptions} />
            <div className={styles.recommendedOptions} />
            <div className={styles.recommendedOptions} />
            <div className={styles.recommendedOptions} />
            <div className={styles.recommendedOptions} />
            <div className={styles.recommendedOptions} />
          </div>
        </div>
      </div>
      <div className={styles.navBar}>
        <NavFooter
          index={0}
          icons_Src={['/home.svg', '/cart.svg', '/account.svg']}
          btn_Functions={[() => console.log('1'), () => console.log('2'), () => console.log('3')]}
        />
      </div>
    </div>
  );
};

export default HomePage;

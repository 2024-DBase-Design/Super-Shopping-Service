'use client';

import React, { useState } from 'react';
import '@/styles/noSession.scss';
import styles from './signup.module.scss';
import { shrikhand } from '../fonts';
import TextInputComponent from '@/components/input/textInput';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import Link from 'next/link';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';

const SignUpPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  const manualValidate = new ClientEventEmitter();

  const handleEmailChange = (emailValue: string, emailIsValid: boolean) => {
    setEmailValue(emailValue);
    setEmailIsValid(emailIsValid);
    setFormIsValid(emailIsValid && passwordIsValid);
  };

  const handlePasswordChange = (passwordValue: string, passwordIsValid: boolean) => {
    setPasswordValue(passwordValue);
    setPasswordIsValid(passwordIsValid);
    setFormIsValid(emailIsValid && passwordIsValid);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    // check in case user immediately hit login button
    if (formIsValid) {
      setFormIsValid(emailIsValid && passwordIsValid);
      if (!(emailIsValid && passwordIsValid)) {
        manualValidate.emit('validate');
        return; // form is not valid
      }
    } else {
      return; // form is not valid
    }

    // attempt to make api call
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue })
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
    <div className="main-container">
      <BrandHeaderComponent></BrandHeaderComponent>
      <div className={"form-container " + styles.formContainer}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`${shrikhand.className} text-center text-4xl font-bold leading-9 tracking-tight`}
            >
              Sign Up
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <TextInputComponent
                  name="Name"
                  validationRuleNames={[ValidationRuleEnum.Required]}
                  onValueChanged={(value, isValid) => handleEmailChange(value, isValid)}
                  manualValidate={manualValidate}
                ></TextInputComponent>
              </div>
              <div>
                <TextInputComponent
                  name="Email Address"
                  validationRuleNames={[ValidationRuleEnum.Required, ValidationRuleEnum.Email]}
                  onValueChanged={(value, isValid) => handleEmailChange(value, isValid)}
                  manualValidate={manualValidate}
                ></TextInputComponent>
              </div>
              <div>
                <TextInputComponent
                  name="Password"
                  inputType="password"
                  validationRuleNames={[ValidationRuleEnum.Required]}
                  onValueChanged={(value, isValid) => handlePasswordChange(value, isValid)}
                  manualValidate={manualValidate}
                ></TextInputComponent>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex mt-8 w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                  style={{ opacity: formIsValid ? 1 : 0.5 }}
                >
                  Sign Up
                </button>
              </div>
            </form>
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

export default SignUpPage;

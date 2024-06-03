import React from 'react';
import { LogoComponent } from '@/components/svgs/logo';
import '@/styles/login.scss';
import { shrikhand } from '../fonts';
import TextInputComponent from '@/components/input/textInput';
import { ValidationRuleEnum } from '@/components/input/validationRules';

const LoginPage = () => {
  function onSubmit(){

  }

  return (
    <div className="main-container">
      <h1 className={shrikhand.className}>Silly Stuffs</h1>
      <LogoComponent className="mx-auto h-11 w-auto logo" />
      <div className="form-container">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`${shrikhand.className} text-center text-4xl font-bold leading-9 tracking-tight`}
            >
              Login
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                  <TextInputComponent name="Email Address" validationRuleNames={[ValidationRuleEnum.Required, ValidationRuleEnum.Email]}></TextInputComponent>
              </div>

              <div>
                  <TextInputComponent name="Password" inputType="password" validationRuleNames={[ValidationRuleEnum.Required]}></TextInputComponent>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex mt-10 w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-white">
              Don&apos;t have an account?{' '}
              <a href="#" className="font-semibold leading-6">
                Create a new account
              </a>
            </p>
            <p className="mt-2 text-center text-sm text-white">
              <a href="#" className="font-semibold leading-6">
                Create a new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TextInputComponent from '../input/textInput';
import { formIsValidName, FormValues } from '@/helpers/formValues';
import DropDownInputComponent, { FormHydration } from '../input/dropdownInput';
import AddressInputComponent from '../input/addressInput';
import { ValidationRuleType } from '../input/validationRules';

export type FormInput = {
  name: string;
  id?: string;
  className?: string;
  inputType?: string;
  defaultValue?: any;
  options?: FormHydration[];
  validationRuleNames?: ValidationRuleType[];
  manualValidate?: ClientEventEmitter;
};

export const enum InputTypeEnum {
  Text = 'text',
  Password = 'password',
  Date = 'date',
  Number = 'number',
  DropDown = 'dropDown',
  Address = 'address'
}

const FormComponent: React.FC<{
  inputs: FormInput[];
  submitAction: (formValues: FormValues) => any;
  submitName?: string;
  className?: string;
  buttonClassName?: string;
}> = ({ inputs, submitName, submitAction, className, buttonClassName }) => {
  const formValues: FormValues = new FormValues([]);

  for (const input of inputs) {
    formValues.addNewValue({ name: input.name, defaultValue: input.defaultValue });
  }

  const handleInputChange = (name: string, value: string, isValid: boolean) => {
    formValues.updateValue(name, value);
    formValues.updateValidity(name, isValid);
    if (isValid) {
      formValues.checkFormValidity(name);
    } else {
      formValues.updateValidity(formIsValidName, false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    // if form is not valid, force validation on all inputs
    // and don't execute submitAction
    if (!formValues.checkFormValidity()) {
      formValues.forceValidate.emit('validate');
      return;
    }

    submitAction(formValues);
  };

  return (
    <>
      <div className={className}>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              {input.inputType === InputTypeEnum.DropDown ? (
                <DropDownInputComponent
                  name={input.name}
                  options={input.options ?? [{label:'', value:''}]}
                  formValues={formValues}
                  validationRuleNames={input.validationRuleNames}
                  onValueChanged={(value, isValid) => handleInputChange(input.name, value, isValid)}
                  forceValidate={formValues.forceValidate}
                />
              ) : input.inputType === InputTypeEnum.Address ? (
                <AddressInputComponent
                  name={input.name}
                  onValueChanged={(value, isValid) => handleInputChange(input.name, value, isValid)}
                  forceValidate={formValues.forceValidate}
                />
              ) : (
                <TextInputComponent
                  name={input.name}
                  formValues={formValues}
                  validationRuleNames={input.validationRuleNames}
                  onValueChanged={(value, isValid) => handleInputChange(input.name, value, isValid)}
                  forceValidate={formValues.forceValidate}
                  inputType={input.inputType}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`${buttonClassName} flex mt-8 center justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600`}
            style={{ opacity: formValues.getValidity(formIsValidName) ? 1 : 0.5 }}
          >
            {submitName}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;

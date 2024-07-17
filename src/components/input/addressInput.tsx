/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { ValidationRuleEnum, ValidationRuleType } from './validationRules';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TextInputComponent from './textInput';
import { Address } from '@prisma/client';
import { AddressTypeEnum, States } from '@/helpers/address';
import { formIsValidName, FormValues } from '@/helpers/formValues';
import { FormInput, InputTypeEnum } from '../form/form';
import DropDownInputComponent from './dropdownInput';

type AddressInputProps = {
  name: string;
  id?: string;
  defaultValue?: Address;
  onValueChanged?: (value: any, isValid: boolean) => void;
  forceValidate?: ClientEventEmitter;
};

const AddressInputComponent: React.FC<AddressInputProps> = ({
  name,
  id = name.toLowerCase(),
  defaultValue = {
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    zip: null,
    type: AddressTypeEnum.Billing
  },
  onValueChanged,
  forceValidate
}) => {
  const inputs: FormInput[] = [
    {
      name: 'Address Line One',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address line one' }]
    },
    {
      name: 'Address Line Two',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: []
    },
    {
      name: 'City',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'City' }]
    },
    {
      name: 'State',
      inputType: InputTypeEnum.DropDown,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'State' }]
    },
    {
      name: 'Zip Code',
      inputType: InputTypeEnum.Number,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Zip code' },
        { type: ValidationRuleEnum.ZipCode }
      ]
    }
  ];

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

  return (
    <div id={id}>
      <div>
        <TextInputComponent
          name="Address Line One"
          formValues={formValues}
          validationRuleNames={inputs[0].validationRuleNames}
          onValueChanged={(value, isValid) => handleInputChange(inputs[0].name, value, isValid)}
          forceValidate={forceValidate}
          inputType="text"
          defaultValue={defaultValue?.addressLineOne}
        />
      </div>
      <div>
        <TextInputComponent
          name="Address Line Two"
          formValues={formValues}
          validationRuleNames={[]}
          onValueChanged={(value, isValid) => handleInputChange(inputs[1].name, value, isValid)}
          forceValidate={forceValidate}
          inputType="text"
          defaultValue={defaultValue?.addressLineTwo}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div id="city-container" style={{ marginRight: '.5em', width: '35vw' }}>
          <TextInputComponent
            name="City"
            formValues={formValues}
            validationRuleNames={inputs[2].validationRuleNames}
            onValueChanged={(value, isValid) => handleInputChange(inputs[2].name, value, isValid)}
            forceValidate={forceValidate}
            inputType="text"
            defaultValue={defaultValue?.city}
          />
        </div>
        <div id="state-container" style={{ marginRight: '.5em', width: '15vw' }}>
          <DropDownInputComponent
            name="State"
            validationRuleNames={inputs[3].validationRuleNames}
            formValues={formValues}
            onValueChanged={(value, isValid) => handleInputChange(inputs[3].name, value, isValid)}
            forceValidate={forceValidate}
            defaultValue={defaultValue?.state}
            options={States}
            inputClassName="pl-0"
          />
        </div>
        <div id="zip-code-container" style={{ width: '25vw' }}>
          <TextInputComponent
            name="Zip Code"
            formValues={formValues}
            validationRuleNames={inputs[4].validationRuleNames}
            onValueChanged={(value, isValid) => handleInputChange(inputs[4].name, value, isValid)}
            forceValidate={forceValidate}
            inputType="text"
            defaultValue={defaultValue?.zip}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInputComponent;

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Select, { ControlProps, StylesConfig } from 'react-select';
import { ErrorMessageComponent } from './errorMessage';
import {
  getValidationTest,
  ValidationRule,
  ValidationRuleEnum,
  ValidationRuleType
} from './validationRules';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import { FormValues } from '@/helpers/formValues';

export type FormHydration = {
  label: string;
  value: string;
};

type DropDownInputProps = {
  name: string;
  options: FormHydration[];
  formValues: FormValues;
  id?: string;
  className?: string;
  defaultValue?: FormHydration;
  validationRuleNames?: ValidationRuleType[];
  onValueChanged?: (value: any, isValid: boolean) => void;
  forceValidate?: ClientEventEmitter;
};

const DropDownInputComponent: React.FC<DropDownInputProps> = ({
  name,
  options,
  formValues,
  id = name.toLowerCase(),
  className,
  defaultValue = options[0],
  validationRuleNames,
  onValueChanged,
  forceValidate
}) => {
  const [value, setValue] = useState<any>(defaultValue.value);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [focusedBorder, setFocusedBorder] = useState<string>('');
  const validationRules: ValidationRule[] = [];

  if (validationRuleNames) {
    for (const validationRuleName of validationRuleNames) {
      const rule: (formValues: FormValues, value: any) => string =
        getValidationTest(validationRuleName);
      if (rule) {
        validationRules.push(new ValidationRule(formValues, rule));
      }
    }
  }

  function validate(ToValidate: any) {
    setErrorMessages([]);
    if (!validationRules || validationRules.length === 0) return;

    const newErrorMessages = validationRules
      .map((rule) => rule.checkValue(ToValidate))
      .filter((v) => v !== ''); // Filter out empty error messages (passes rule)
    setErrorMessages(newErrorMessages);

    const isValid = newErrorMessages.length === 0;
    if (onValueChanged) {
      onValueChanged(ToValidate, isValid);
    }
  }

  const handleChange = (event: any) => {
    const newValue = event.value;
    setValue(newValue);
    validate(newValue);
  };

  forceValidate?.on('validate', () => {
    validate(value);
  });

  forceValidate?.on(name, () => {
    validate(value);
  });

  function onControlFocus() {
    setFocusedBorder('focusedBorder');
  }
  function onControlBlur() {
    setFocusedBorder('');
  }

  return (
    <>
      <div className={`flex items-center justify-between ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium leading-4">
          {name +
            (validationRuleNames?.map((n) => n.type)?.includes(ValidationRuleEnum.Required)
              ? ' *'
              : '')}
        </label>
      </div>
      <div className="mt-1">
        <Select
          options={options}
          unstyled
          placeholder={defaultValue?.label ?? 'Select...'}
          defaultValue={defaultValue}
          id={id}
          name={name.toLowerCase()}
          className={`${focusedBorder} complex-select pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 ${errorMessages.length > 0 ? 'error-outline' : 'transparent-outline'}`}
          onChange={handleChange}
          onFocus={onControlFocus}
          onBlur={onControlBlur}
        />
      </div>
      <div>
        <ErrorMessageComponent messages={errorMessages} />
      </div>
    </>
  );
};

export default DropDownInputComponent;

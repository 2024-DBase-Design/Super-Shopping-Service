/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { ErrorMessageComponent } from './errorMessage';
import {
  getValidationTest,
  ValidationRule,
  ValidationRuleEnum,
  ValidationRuleType
} from './validationRules';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import { FormValues } from '@/helpers/formValues';

type DropDownInputProps = {
  name: string;
  options: string[];
  formValues: FormValues;
  id?: string;
  className?: string;
  defaultValue?: any;
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
  defaultValue,
  validationRuleNames,
  onValueChanged,
  forceValidate
}) => {
  const [value, setValue] = useState<any>(defaultValue);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
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

  options.push('');
  options = [...new Set(options)];

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
    const newValue = event.target?.value;
    setValue(newValue);
    validate(newValue);
  };

  forceValidate?.on('validate', () => {
    validate(value);
  });

  forceValidate?.on(name, () => {
    validate(value);
  });

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
        <select
          id={name.toLowerCase()}
          name={name.toLowerCase()}
          className={`pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 ${errorMessages.length > 0 ? 'error-outline' : 'transparent-outline'}`}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <ErrorMessageComponent messages={errorMessages} />
      </div>
    </>
  );
};

export default DropDownInputComponent;

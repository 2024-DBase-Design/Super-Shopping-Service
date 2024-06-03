'use client';

import React, { useState } from 'react';
import { ErrorMessageComponent, ValidationRule } from './errorMessage';
import { ValidationRuleDictionary } from './validationRules';
import { EventEmitter } from 'stream';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';

type TextInputProps = {
  name: string;
  id?: string;
  className?: string;
  inputType?: string;
  defaultValue?: any;
  validationRuleNames?: string[];
  required?: boolean;
  onValueChanged?: (value: any, isValid: boolean) => void;
  manualValidate?: ClientEventEmitter;
};

const TextInputComponent: React.FC<TextInputProps> = ({
  name,
  id = name.toLowerCase(),
  className,
  inputType = 'text',
  defaultValue,
  validationRuleNames,
  required = false,
  onValueChanged,
  manualValidate
}) => {
  const [value, setValue] = useState<any>(defaultValue);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const validationRules: ValidationRule[] = [];

  if (validationRuleNames) {
    for (const validationRuleName of validationRuleNames) {
      const rule: ValidationRule | undefined = ValidationRuleDictionary.get(validationRuleName);
      if (rule) {
        validationRules.push(rule);
      }
    }
  }

  function validate() {
    setErrorMessages([]);
    if (!validationRules || validationRules.length === 0) return;

    const newErrorMessages = validationRules
      .map((rule) => rule.checkValue(value))
      .filter((v) => v !== ''); // Filter out empty error messages (passes rule)
    setErrorMessages(newErrorMessages);

    const isValid = newErrorMessages.length === 0;
    if (onValueChanged) {
      onValueChanged(value, isValid);
    }
  }

  const handleChange = (event: any) => {
    const newValue = event.target?.value;
    setValue(newValue);
    validate();
  };

  manualValidate?.on('validate', () => {
    validate();
  });

  return (
    <>
      <div className={`flex items-center justify-between ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium leading-4">
          {name}
        </label>
      </div>
      <div className="mt-1">
        <input
          id={id}
          name={name.toLowerCase()}
          type={inputType}
          required={required}
          className={`pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 ${errorMessages.length > 0 ? 'error-outline' : 'transparent-outline'}`}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        <ErrorMessageComponent messages={errorMessages} />
      </div>
    </>
  );
};

export default TextInputComponent;

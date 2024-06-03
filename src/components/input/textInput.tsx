// Add 'use client' at the very top of your file
'use client';

import React, { useState } from 'react';
import { ErrorMessageComponent, ValidationRule } from './validator';
import { ValidationRuleDictionary } from './validationRules';
import { ErrorIconComponent } from '../svgs/error';

type TextInputProps = {
    name: string;
    id?: string;
    className?: string;
    inputType?: string;
    defaultValue?: any;
    validationRuleNames?: string[];
    required?: boolean;
};

const TextInputComponent: React.FC<TextInputProps> = ({ name, id = name.toLowerCase(), className, inputType = "text", defaultValue, validationRuleNames, required = false }) => {
    const [value, setValue] = useState<any>(defaultValue);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    let validationRules: ValidationRule[] = [];

    if(validationRuleNames){
        for(const validationRuleName of validationRuleNames){
            let rule: ValidationRule | undefined = ValidationRuleDictionary.get(validationRuleName);
            if(rule){
                validationRules.push(rule);
            }
        }
    }

    const handleChange = (event: any) => {
        const newValue = event.target?.value;
        setValue(newValue);
        setErrorMessages([]);
        if (!validationRules || validationRules.length === 0) return;

        const newErrorMessages = validationRules.map(rule => rule.checkValue(newValue)).filter(Boolean); // Filter out falsy values
        setErrorMessages(newErrorMessages);
    };

    return (
        <>
            <div className={`flex items-center justify-between ${className}`}>
                <label htmlFor={id} className="block text-sm font-medium leading-6">
                    {name}
                </label>
            </div>
            <div className="mt-2">
                <input
                    id={id}
                    name={name.toLowerCase()}
                    type={inputType}
                    required={required}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <div style={{display: validationRules.length > 0 ? "" : "none"}}>
                <ErrorIconComponent fillColor='#c76e77'/>
                <ErrorMessageComponent messages={errorMessages}/>
            </div>
        </>
    );
};

export default TextInputComponent;

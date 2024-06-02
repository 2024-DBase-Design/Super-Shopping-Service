import React from 'react';

export const TextInputComponent: React.FC<{ className?: string, inputType?: string, name: string, required?: boolean }> = ({ className, inputType = "text", name, required = false }) => {
    return (
        <><div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6">
            {name}
            </label>
        </div><div className="mt-2">
                <input
                    id={name.toLowerCase()}
                    name={name.toLowerCase()}
                    type={inputType}
                    required={required}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div></>
    );
  };
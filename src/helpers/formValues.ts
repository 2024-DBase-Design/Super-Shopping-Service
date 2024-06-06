/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, useState } from 'react';
import { ClientEventEmitter } from './clientEventEmitter';

type UseState = {
  value: any;
  setValue: Dispatch<any>;
};

export type NewValue = {
  name: string;
  defaultValue: any;
};

export const formIsValidName: string = 'formIsValid';

export class FormValues {
  readonly forceValidate: ClientEventEmitter = new ClientEventEmitter();
  private valueDictionary: Map<string, UseState> = new Map<string, UseState>();
  private validDictionary: Map<string, UseState> = new Map<string, UseState>();

  constructor(values: NewValue[]) {
    for (const value of values) {
      this.addNewValue(value);
    }
    const [formIsValid, setFormvalid] = useState(true);
    this.validDictionary.set(formIsValidName, { value: formIsValid, setValue: setFormvalid });
  }

  /*
   * Adds a new value that updates on change with UseState
   * Each form input has a validity status paired with it
   */
  addNewValue(newValue: NewValue) {
    const [value, setValue] = useState(newValue.defaultValue);
    const [valid, setvalid] = useState(false);
    this.valueDictionary.set(newValue.name, { value, setValue });
    this.validDictionary.set(newValue.name, { value: valid, setValue: setvalid });
  }

  updateValue(name: string, newValue: any) {
    this.valueDictionary.get(name)?.setValue(newValue);
  }

  updateValidity(name: string, newValidity: boolean): boolean {
    return this.validDictionary.get(name)?.setValue(newValidity) ?? false;
  }

  getValue(name: string): any {
    return this.valueDictionary.get(name)?.value;
  }

  getValidity(name: string): boolean {
    return this.validDictionary.get(name)?.value;
  }

  /*
   * UseState variables are updating asynchronously, so sometimes a changed
   * input should be excluded from the search (value in dict will be outdated).
   * This should only be ran if the newlyValidInputName is valid.
   *
   * Searches validDictionary for all keys that end with "isValid"
   * and returns a boolean signifying they are all true or not
   */
  checkFormValidity(newlyValidInputName?: string): boolean {
    let isValidAll = true;

    for (const [key, value] of this.validDictionary.entries()) {
      if (key !== newlyValidInputName && key !== formIsValidName) {
        // If the validDictionary contains an invalid input,
        // end early and return false
        if (value.value === false) {
          isValidAll = false;
          break;
        }
      }
    }

    this.updateValidity(formIsValidName, isValidAll);
    return isValidAll;
  }
}

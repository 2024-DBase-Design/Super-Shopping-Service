import { FormValues } from '@/helpers/formValues';

export class ValidationRule {
  private formValues: FormValues;
  private readonly validationTest: (formValues: FormValues, value: any) => string;

  constructor(
    formValues: FormValues,
    validationTest: (formValues: FormValues, value: any) => string
  ) {
    this.formValues = formValues;
    this.validationTest = validationTest;
  }

  public checkValue(value: any): string {
    return this.validationTest(this.formValues, value);
  }
}

function RequiredClosure(
  fieldName: string = 'this field'
): (formValues: FormValues, value: any) => string {
  return (formValues: FormValues, value: any): string => {
    if (value || typeof value === typeof Boolean) {
      return '';
    } else {
      return `${fieldName} is required.`;
    }
  };
}

function Email(formValues: FormValues, value: string): string {
  const emailRegEx: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegEx.test(value)) {
    return '';
  } else {
    return `${value} is not a valid email.`;
  }
}

function ConfirmMatchClosure(inputName: string): (formValues: FormValues, value: any) => string {
  return (formValues: FormValues, value: any): string => {
    if (value === formValues.getValue(inputName)) {
      return '';
    } else {
      return `These passwords do not match.`;
    }
  };
}

function CreditCard(formValues: FormValues, value: string): string {
  const visaRegEx: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx: RegExp = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx: RegExp = /^(?:3[47][0-9]{13})$/;
  const discovRegEx: RegExp = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

  if (
    visaRegEx.test(value) ||
    mastercardRegEx.test(value) ||
    amexpRegEx.test(value) ||
    discovRegEx.test(value)
  ) {
    return '';
  } else {
    return `${value} is not a valid credit card number.`;
  }
}

function ZipCode(formValues: FormValues, value: string): string {
  const zipCodeRegEx: RegExp = /^\d{5}(?:[-\s]\d{4})?$/;
  if (zipCodeRegEx.test(value)) {
    return '';
  } else {
    return `${value} is not a valid zip code.`;
  }
}

function Error(formValues: FormValues, value: any): string {
  return `ERROR!! Invalid rule value:${value}`;
}

export const enum ValidationRuleEnum {
  Required = 'required',
  Email = 'email',
  ConfirmMatch = 'confirm match',
  CreditCard = 'credit card',
  ZipCode = 'zip code'
}

export type ValidationRuleType = {
  type: ValidationRuleEnum;
  args?: any;
};

export function getValidationTest(
  validationRule: ValidationRuleType
): (formValues: FormValues, value: any) => string {
  switch (validationRule.type) {
    case ValidationRuleEnum.Required:
      return RequiredClosure(validationRule.args);
    case ValidationRuleEnum.Email:
      return Email;
    case ValidationRuleEnum.ConfirmMatch:
      return ConfirmMatchClosure(validationRule.args);
    case ValidationRuleEnum.CreditCard:
      return CreditCard;
    case ValidationRuleEnum.ZipCode:
      return ZipCode;
    default:
      return Error;
  }
}

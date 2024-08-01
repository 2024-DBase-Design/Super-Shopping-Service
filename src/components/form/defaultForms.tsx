import { Address, CreditCard } from '@prisma/client';
import { FormInput, InputTypeEnum } from './form';
import { ValidationRuleEnum } from '../input/validationRules';

export const addressFormDefault: FormInput[] = [
  {
    name: 'Address',
    inputType: InputTypeEnum.Address,
    defaultValue: '',
    validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
  }
];

export function GeneratePrefilledAddressForm(address: Address): FormInput[] {
  const prefilledForm: FormInput[] = addressFormDefault;
  prefilledForm[0].defaultValue = address;
  prefilledForm[0].name +=
    ' ' + address.type.charAt(0).toUpperCase() + address.type.slice(1).toLowerCase();
  if (prefilledForm[0].validationRuleNames) {
    prefilledForm[0].validationRuleNames[0].args = prefilledForm[0].name;
  }

  return prefilledForm;
}

export const creditCardFormDefault: FormInput[] = [
  {
    name: 'Credit Card Number',
    inputType: InputTypeEnum.Text,
    defaultValue: '',
    validationRuleNames: [
      { type: ValidationRuleEnum.Required, args: 'Credit Card Number' },
      { type: ValidationRuleEnum.CreditCard, args: 'Credit Card Number' }
    ]
  },
  {
    name: 'Expiry Date',
    inputType: InputTypeEnum.Text,
    defaultValue: '',
    validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Expiry Date' }]
  },
  {
    name: 'CVV',
    inputType: InputTypeEnum.Text,
    defaultValue: '',
    validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'CVV' }]
  },
  {
    name: 'Billing Address',
    inputType: InputTypeEnum.Address,
    defaultValue: '',
    validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Billing Address' }]
  }
];

export function GeneratePrefilledCreditCardForm(
  creditCard: CreditCard,
  billingAddress: Address
): FormInput[] {
  const prefilledForm: FormInput[] = creditCardFormDefault;
  prefilledForm[0].defaultValue = creditCard.cardNumber;
  prefilledForm[1].defaultValue = creditCard.expiryDate;
  prefilledForm[2].defaultValue = creditCard.cvv;
  prefilledForm[3].defaultValue = billingAddress;

  return prefilledForm;
}

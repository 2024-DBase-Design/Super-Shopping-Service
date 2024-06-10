export type Address = {
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  zipCode: number;
  type: AddressTypeEnum;
};

export enum AddressTypeEnum {
  Delivery = 'DELIVERY',
  Billing = 'BILLING',
  Warehouse = 'WAREHOUSE',
  Supplier = 'SUPPLIER'
}

export const States: string[] = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
  'DC',
  'AS',
  'GU',
  'MP',
  'PR',
  'VI'
];

'use client';

import useRoleAuth from '@/hooks/useRoleAuth';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss'
import '@/styles/session.scss';
import { Address, CreditCard, Customer } from '@prisma/client';
import { AddressTypeEnum } from '@/helpers/address';
import { EditableListComponent, EditableListItem } from '@/components/form/editableList';
import { GeneratePrefilledAddressForm, GeneratePrefilledCreditCardForm } from '@/components/form/defaultForms';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';

type CreditCardAndAddress = {
  creditCard: CreditCard,
  billingAddress: Address
}

type ProfileValues = {
  customer: Customer,
  creditCards: CreditCardAndAddress[],
  addresses: Address[]
}

var testValues: ProfileValues = {
  customer: {
    id: 0,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.aol",
    password: "iL1k3_pie",
    profilePicture: "data:image/jpeg;base64,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",
    balance: 152.26,
    cart: {},
    createdAt: new Date,
    updatedAt: new Date,
  },
  creditCards: [{
    creditCard: {
      id: 0,
      cardNumber: "374245455400126",
      expiryDate: "01/01",
      cvv: "123",
      billingAddressId: 0,
      customerId: 0,
      createdAt: new Date,
      updatedAt: new Date
    },
    billingAddress: {
      id: 1,
      addressLineOne: "123 Street Street",
      addressLineTwo: null,
      city: "Cincinnati",
      state: "OH",
      zip: "12345",
      country: "US",
      type: AddressTypeEnum.Delivery,
      createdAt: new Date,
      updatedAt: new Date,
      customerId: 0,
      staffId: null,
      supplierId: null,
      warehouseId: null
    }
  },{
    creditCard: {
      id: 0,
      cardNumber: "374245455400126",
      expiryDate: "01/01",
      cvv: "123",
      billingAddressId: 0,
      customerId: 0,
      createdAt: new Date,
      updatedAt: new Date
    },
    billingAddress: {
      id: 1,
      addressLineOne: "123 Street Street",
      addressLineTwo: null,
      city: "Cincinnati",
      state: "OH",
      zip: "12345",
      country: "US",
      type: AddressTypeEnum.Delivery,
      createdAt: new Date,
      updatedAt: new Date,
      customerId: 0,
      staffId: null,
      supplierId: null,
      warehouseId: null
    }
  }],
  addresses: [{
    id: 1,
    addressLineOne: "123 Street Street",
    addressLineTwo: null,
    city: "Cincinnati",
    state: "OH",
    zip: "12345",
    country: "US",
    type: AddressTypeEnum.Delivery,
    createdAt: new Date,
    updatedAt: new Date,
    customerId: 0,
    staffId: null,
    supplierId: null,
    warehouseId: null
  },{
    id: 1,
    addressLineOne: "123 Street Street",
    addressLineTwo: null,
    city: "Cincinnati",
    state: "OH",
    zip: "12345",
    country: "US",
    type: AddressTypeEnum.Delivery,
    createdAt: new Date,
    updatedAt: new Date,
    customerId: 0,
    staffId: null,
    supplierId: null,
    warehouseId: null
  },{
    id: 1,
    addressLineOne: "123 Street Street",
    addressLineTwo: null,
    city: "Cincinnati",
    state: "OH",
    zip: "12345",
    country: "US",
    type: AddressTypeEnum.Delivery,
    createdAt: new Date,
    updatedAt: new Date,
    customerId: 0,
    staffId: null,
    supplierId: null,
    warehouseId: null
  }]
}

async function getProfileValues(): Promise<ProfileValues>{
  //make api calls for a customer, their creditcards, and their delivery addresses
  // add billing address information to the credit card object (see CreditCardAndAddress)

  return testValues;
}

export default function Page() {
  //useRoleAuth(['customer'], '/login');
  const [values, setValues] = useState(testValues);
  const tsBs: EditableListItem[] = []
  const [creditCards, setCreditCards] = useState(tsBs);
  const creditCardEmitter: ClientEventEmitter = new ClientEventEmitter;
  const [addresses, setAddresses] = useState(tsBs);
  const addressEmitter: ClientEventEmitter = new ClientEventEmitter;

  useEffect(() => {
    getProfileValues().then(res => {
      setValues(res)
      let tempCreditCards: EditableListItem[] = []
      let tempAddresses: EditableListItem[] = []
      res.creditCards.forEach(c => {
        tempCreditCards.push({displayName: c.creditCard.cardNumber.replace(/\d(?=(?:\D*\d){4})/g, "•"),
          id: c.creditCard.id,
          editFormInputs: GeneratePrefilledCreditCardForm(c.creditCard, c.billingAddress)})
      })
      res.addresses.forEach(a => {
        tempAddresses.push({displayName: a.addressLineOne + "\r\n" + 
          (a.addressLineTwo ? a.addressLineTwo + "\r\n" : "") +
          a.city + ", " + a.state + " " + a.zip,
          id: a.id,
          editFormInputs: GeneratePrefilledAddressForm(a)})
      })
      setCreditCards(tempCreditCards);
      setAddresses(tempAddresses);
    });
  }, [])

  // make appropriate api calls here
  creditCardEmitter.on("edit", (formData: FormData)=>{
    console.log(formData); //has id
  })
  creditCardEmitter.on("delete", (id: number)=>{
    // delete the credit card and its billing address!
    console.log(id);
  })
  creditCardEmitter.on("addNew", (formData: FormData)=>{
    console.log(formData);
  })
  
  addressEmitter.on("edit", (formData: FormData, id: number)=>{
    console.log(formData); // has id
  })
  addressEmitter.on("delete", (id: number)=>{
    console.log(id);
  })
  addressEmitter.on("addNew", (formData: FormData)=>{
    console.log(formData);
  })

  return (
    <div className={styles.profile}>
      <p>Imagine a header is here</p>
      <div className="flex justify-center items-center">
        <img src={values.customer.profilePicture ?? ""} className='drop-shadow-lg'/>
      </div>
      <div className={styles.nameTag + " drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"}>Hello, {values.customer.firstName + " " + values.customer.lastName}</div>
      <div className="main-body">
        <h4>Current Balance</h4>
        <h4 className={styles.money + " money"}>{values.customer.balance}</h4>
        <br></br>
        <h1>Credit Cards</h1>
        <div className='ml-4'>
          <EditableListComponent list={creditCards} name="Credit Card" eventEmitter={creditCardEmitter}></EditableListComponent>
        </div>
        <br></br>
        <h1>Delivery Addresses</h1>
        <div className='ml-4'>
          <EditableListComponent list={addresses} name="Delivery Address" eventEmitter={addressEmitter}></EditableListComponent>
        </div>
      </div>
      <p style={{position: "fixed", bottom: "0"}}>Imagine a footer is here</p>
    </div>
);
}
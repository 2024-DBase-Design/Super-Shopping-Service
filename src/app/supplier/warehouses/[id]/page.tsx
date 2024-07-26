'use client';

import { useRouter } from 'next/router';
import useRoleAuth from '@/hooks/useRoleAuth';
import React, { useEffect, useState } from 'react';
import styles from './detail.module.scss';
import '@/styles/staffSession.scss';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ButtonOptions,
  EditableListComponent,
  EditableListItem
} from '@/components/form/editableList';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import FormComponent, { FormInput } from '@/components/form/form';
import { Address, Warehouse, Stock, AddressType } from '@prisma/client';
import { updateWarehouse } from '../../../../../api/controllers/warehouseController';

type StockWithName = {
  stock: Stock;
  itemName: string;
};

type WarehouseDetailValues = {
  warehouse: Warehouse;
  name: string;
  address: Address;
  stock: StockWithName[];
};

const testValues: WarehouseDetailValues = {
  warehouse: {
    id: 0,
    capacity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  name: 'Warehouse A',
  address: {
    id: 0,
    addressLineOne: 'Warehouse Road',
    addressLineTwo: null,
    city: 'Ware',
    state: 'KY',
    zip: '12345',
    country: '',
    type: AddressType.WAREHOUSE,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: null,
    staffId: null,
    supplierId: null,
    warehouseId: null
  },
  stock: []
};

async function getWarehouseValues(id: number): Promise<WarehouseDetailValues> {
  //make api calls for a warehouse, its address, its stock and the names of those stock items
  // add billing address information to the credit card object (see CreditCardAndAddress)

  return testValues;
}

async function updateWarehouseValues(formValues: FormData) {}

function updateStock(id: number, newValue: FormData) {}

function deleteStock(id: number) {}

function addNewStock(newValue: FormData) {}

function formatAddress(address: Address) {
  if (address.addressLineOne === '') return '';

  return (
    address.addressLineOne +
    '\r\n' +
    (address.addressLineTwo ? address.addressLineTwo + '\r\n' : '') +
    address.city +
    ', ' +
    address.state +
    ' ' +
    address.zip
  );
}

export default function CustomerDetail() {
  //useRoleAuth(['staff'], '/login');
  const defaultValue: WarehouseDetailValues = {
    warehouse: {
      id: 0,
      capacity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    name: '',
    address: {
      id: 0,
      addressLineOne: '',
      addressLineTwo: null,
      city: '',
      state: '',
      zip: '',
      country: '',
      type: 'DELIVERY',
      createdAt: new Date(),
      updatedAt: new Date(),
      customerId: null,
      staffId: null,
      supplierId: null,
      warehouseId: null
    },
    stock: []
  };
  const editableStockFormInputs: FormInput[] = [];
  const defaultEditableStock: EditableListItem[] = [
    { displayName: '', id: 0, editFormInputs: editableStockFormInputs }
  ];
  const { id } = useParams();
  const [values, setValues] = useState(defaultValue);
  const [editableStock, setEditableStock] = useState(defaultEditableStock);
  const orderEventEmitter = new ClientEventEmitter();
  const orderButtonOptions: ButtonOptions = {
    edit: false,
    delete: false,
    addNew: false,
    custom: true
  };
  const stockFormInputs: FormInput[] = [];
  const generalFormInputs: FormInput[] = [];

  useEffect(() => {
    getWarehouseValues(Array.isArray(id) ? parseInt(id.join('')) : parseInt(id ?? '')).then(
      (res) => {
        setValues(res);
      }
    );
  }, []);

  return (
    <div className={styles.profile}>
      <p>Imagine a header is here</p>
      <div className={styles.nameTag + ' drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'}>
        EDIT WAREHOUSE
      </div>
      <Link className={styles.link + ' close-button white'} href="/supplier/warehouses"></Link>

      <div className="main-body">
        <h1>STOCK</h1>
        <div className="ml-4">
          <EditableListComponent
            list={editableStock}
            name="Stock"
            eventEmitter={orderEventEmitter}
            buttonOptions={orderButtonOptions}
          ></EditableListComponent>
        </div>
        <br></br>
        {/*
        <FormComponent
          inputs={generalFormInputs}
          submitAction={() => updateWarehouse}
        ></FormComponent>*/}
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

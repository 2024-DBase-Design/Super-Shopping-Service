'use client';

import { useRouter } from 'next/router';
import useRoleAuth from '@/hooks/useRoleAuth';
import React, { useEffect, useState } from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EditableListComponent, EditableListItem } from '@/components/form/editableList';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { Address, Warehouse, Stock, AddressType } from '@prisma/client';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';

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
  stock: [
    {
      stock: {
        id: 0,
        productId: 0,
        warehouseId: 0,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      itemName: 'Half Eaten Gummy Worms'
    },
    {
      stock: {
        id: 0,
        productId: 0,
        warehouseId: 0,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      itemName: 'Legal IRL Lootbox'
    }
  ]
};

const getWarehouseValues = async (id: number): Promise<WarehouseDetailValues> => {
  //make api calls for a warehouse, its address, its stock and the names of those stock items
  // add billing address information to the credit card object (see CreditCardAndAddress)

  return testValues;
};

async function updateWarehouseValues(formValues: FormValues) {}

function updateStock(id: number, newValue: FormValues) {}

function deleteStock(id: number) {}

function addNewStock(newValue: FormValues) {}

export default function CustomerDetail() {
  //useRoleAuth(['staff'], '/login');
  const defaultEditableStock: EditableListItem[] = [];
  const defaultGeneralFormInputs: FormInput[] = [
    {
      name: 'Name',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
    },
    {
      name: 'Capacity',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Quantity' }]
    },
    {
      name: 'Address',
      inputType: InputTypeEnum.Address,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
    }
  ];
  const defaultStockFormInputs: FormInput[] = [
    {
      name: 'Name',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
    },
    {
      name: 'Quantity',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Quantity' }]
    }
  ];
  const { id } = useParams();
  const [editableStock, setEditableStock] = useState(defaultEditableStock);
  const [generalFormInputs, setGeneralFormInputs] = useState(defaultGeneralFormInputs);
  const stockEventEmitter = new ClientEventEmitter();

  useEffect(() => {
    getWarehouseValues(Array.isArray(id) ? parseInt(id.join('')) : parseInt(id ?? '')).then(
      (res) => {
        const tempEditableStock: EditableListItem[] = [];
        for (const s of res.stock) {
          tempEditableStock.push({
            displayName: s.itemName,
            id: s.stock.id,
            editFormInputs: [
              {
                name: 'Name',
                defaultValue: s.itemName,
                inputType: InputTypeEnum.Text,
                validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
              },
              {
                name: 'Quantity',
                defaultValue: s.stock.quantity,
                inputType: InputTypeEnum.Text,
                validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Quantity' }]
              }
            ]
          });
        }
        setEditableStock(tempEditableStock);

        setGeneralFormInputs([
          {
            name: 'Name',
            defaultValue: res.name,
            inputType: InputTypeEnum.Text,
            validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
          },
          {
            name: 'Capacity',
            defaultValue: res.warehouse.capacity,
            inputType: InputTypeEnum.Text,
            validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Quantity' }]
          },
          {
            name: 'Address',
            defaultValue: res.address,
            inputType: InputTypeEnum.Address,
            validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
          }
        ]);
      }
    );
  }, []);

  stockEventEmitter.on('edit', ([formValues, id]) => updateStock(id, formValues));
  stockEventEmitter.on('delete', (id) => deleteStock(id));
  stockEventEmitter.on('addNew', (formValues) => addNewStock(formValues));

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
            eventEmitter={stockEventEmitter}
            addNewFormInputs={defaultStockFormInputs}
          ></EditableListComponent>
        </div>
        <br></br>
        <FormComponent
          id={id}
          inputs={generalFormInputs}
          submitAction={updateWarehouseValues}
          submitName="Save Changes"
        ></FormComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

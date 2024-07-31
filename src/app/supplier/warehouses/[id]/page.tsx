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
import { Warehouse, Stock, AddressType, Product, Address } from '@prisma/client';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';

type StockWithName = {
  stock: Stock;
  itemName: string;
};

type WarehouseDetailValues = {
  warehouse: Warehouse;
  address: Address;
  stock: StockWithName[];
};

const getWarehouseValues = async (id: number): Promise<WarehouseDetailValues | null> => {
  try {
    const warehouseResponse = await fetch(
      buildOneEntityUrl(HttpMethod.GET, EntityType.WAREHOUSE, id)
    );

    if (!warehouseResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const warehouseData: Warehouse = await warehouseResponse.json();

    const addressResponse = await fetch(
      buildOneEntityUrl(HttpMethod.GET, EntityType.WAREHOUSE, id) + '/addresses'
    );

    if (!addressResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const addressData: Address[] = await addressResponse.json();

    const stockResponse = await fetch(
      buildOneEntityUrl(HttpMethod.GET, EntityType.WAREHOUSE, id) + '/stock'
    );

    if (!stockResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const stockData: Stock[] = await stockResponse.json();

    const stockDataWithNames: StockWithName[] = await Promise.all(
      stockData.map(async (stock: Stock) => {
        const productResponse = await fetch(
          buildOneEntityUrl(HttpMethod.GET, EntityType.PRODUCT, stock.productId)
        );

        if (!productResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const product: Product = await productResponse.json();

        return {
          stock: stock,
          itemName: product.name
        };
      })
    );

    const warehouseInfo: WarehouseDetailValues = {
      warehouse: warehouseData,
      address: addressData[0],
      stock: stockDataWithNames
    };

    return warehouseInfo;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
};

const updateWarehouseValues = async (formValues: FormValues) => {
  try {
    const response = await fetch(
      buildOneEntityUrl(HttpMethod.PUT, EntityType.WAREHOUSE, formValues.getValue('Id')),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formValues.getValue('Name'),
          capacity: formValues.getValue('Capacity'),
          address: formValues.getValue('Address')
        })
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const updateStock = async (id: number, formValues: FormValues) => {
  try {
    const response = await fetch(buildOneEntityUrl(HttpMethod.PUT, EntityType.STOCK, id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemName: formValues.getValue('Name'),
        quantity: formValues.getValue('Quantity')
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const deleteStock = async (id: number) => {
  try {
    const response = await fetch(buildOneEntityUrl(HttpMethod.DELETE, EntityType.STOCK, id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const addNewStock = async (formValues: FormValues) => {
  try {
    const response = await fetch(buildOneEntityUrl(HttpMethod.POST, EntityType.STOCK), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: formValues.getValue('ProductId'),
        warehouseId: formValues.getValue('WarehouseId'),
        quantity: formValues.getValue('Quantity')
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

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
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Capacity' }]
    },
    {
      name: 'Address',
      inputType: InputTypeEnum.Address,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Address' }]
    }
  ];
  const defaultStockFormInputs: FormInput[] = [
    {
      name: 'ProductId',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'ProductId' }]
    },
    {
      name: 'WarehouseId',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'WarehouseId' }]
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
        if (res) {
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
              defaultValue: res.warehouse.name,
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
      }
    );
  }, [id]);

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
          id={Array.isArray(id) ? parseInt(id.join('')) : parseInt(id)}
          inputs={generalFormInputs}
          submitAction={updateWarehouseValues}
          submitName="Save Changes"
        ></FormComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

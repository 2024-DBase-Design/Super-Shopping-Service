/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import useRoleAuth from '@/hooks/useRoleAuth';
import React, { useEffect, useState } from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ButtonOptions,
  EditableListComponent,
  EditableListItem
} from '@/components/form/editableList';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { Product, Warehouse, Stock } from '@prisma/client';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';
import build from 'next/dist/build';
import { buildOneEntityUrl, EntityType, GetStock, HttpMethod } from '@/helpers/api';

export type WarehouseProductInfo = {
  name: string; //name of warehouse
  stock: number; //number of this product in its stock
  id: number; //id of warehouse
};

export type ProductWithWarehouses = {
  product: Product;
  warehouses: WarehouseProductInfo[];
};

const activeWarehouses: WarehouseProductInfo[] = [
  {
    name: "Bobo's Bazaar",
    id: 0,
    stock: 0
  }
];

const getProductValues = async (id: number): Promise<ProductWithWarehouses> => {
  const productWarehouseResponse = await fetch(
    buildOneEntityUrl(HttpMethod.GET, EntityType.PRODUCT, id) + '/warehouses'
  );

  if (!productWarehouseResponse.ok) {
    throw new Error('Network response was not ok');
  }

  const productWarehouseData: ProductWithWarehouses = await productWarehouseResponse.json();
  return productWarehouseData;
};

// get warehouses that could have this item added to it's stock
const getActiveWarehouses = async (): Promise<WarehouseProductInfo[]> => {
  const availableWarehousesResponse = await fetch(
    buildOneEntityUrl(HttpMethod.GET, EntityType.WAREHOUSE) + '/available_space'
  );

  if (!availableWarehousesResponse.ok) {
    throw new Error('Network response was not ok');
  }

  const availableWarehousesData: Warehouse[] = await availableWarehousesResponse.json();

  return availableWarehousesData.map((w) => {
    return {
      name: w.name,
      id: w.id,
      stock: 0
    };
  });
};

const updateProductValues = async (id: number, formValues: FormValues) => {
  const response = await fetch(buildOneEntityUrl(HttpMethod.PUT, EntityType.PRODUCT, id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formValues.getValue('Name'),
      description: formValues.getValue('Description'),
      price: formValues.getValue('Price'),
      image: formValues.getValue('Image'),
      category: 'Apparel', // TODO - get this from the form
      brand: 'Nike', // TODO - get this from the form
      size: 'M' // TODO - get this from the form
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  console.log('Product updated');
};

// pid == product id, wid == warehouse id

async function removeWarehouseFromProduct(pid: number, wid: number) {
  // Get the stock to delete
  const stockToDelete = await GetStock(pid, wid);

  // Delete chosen stock
  if (stockToDelete) {
    const deleteResponse = await fetch(
      buildOneEntityUrl(HttpMethod.DELETE, EntityType.STOCK, stockToDelete.id),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!deleteResponse.ok) {
      throw new Error('Failed to delete stock');
    }

    // Handle success
    console.log('Stock deleted');
  } else {
    throw new Error('Failed to find stock to delete');
  }
}

async function updateWarehouseProductStock(pid: number, wid: number, newStock: number) {
  // Get the stock to update
  const stockToUpdate = await GetStock(pid, wid);

  // Update chosen stock
  if (stockToUpdate) {
    const updateResponse = await fetch(
      buildOneEntityUrl(HttpMethod.PUT, EntityType.STOCK, stockToUpdate.id),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: newStock
        })
      }
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to update stock');
    }

    // Handle success
    console.log('Stock updates');
  } else {
    throw new Error('Failed to find stock to update');
  }
}

const addNewWarehouseToProduct = async (pid: number, wid: number, stock: number) => {
  const reponse = await fetch(buildOneEntityUrl(HttpMethod.POST, EntityType.STOCK), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: pid,
      warehouseId: wid,
      quantity: stock
    })
  });

  if (!reponse.ok) {
    throw new Error('Failed to add stock');
  }

  console.log('Stock added');
};

export default function ProductDetail() {
  const router = useRouter();
  //useRoleAuth(['staff'], '/login');
  const defaultEditableList: EditableListItem[] = [];
  const defaultValue: ProductWithWarehouses = {
    product: {
      id: 0,
      image: null,
      name: '',
      price: 0,
      category: 'Toys',
      brand: 'Toys R Us',
      size: '10cm',
      description: '',
      supplierId: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    warehouses: [
      {
        id: 0,
        name: 'Bozo Bazaar',
        stock: 12
      }
    ]
  };
  const defaultAddNewWarehouseFormInputs: FormInput[] = [
    {
      name: 'Warehouse',
      defaultValue: '',
      inputType: InputTypeEnum.DropDown,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Warehouse' }]
    },
    {
      name: 'Stock',
      inputType: InputTypeEnum.Text,
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Stock' }]
    }
  ];
  const { id } = useParams();
  const pId = Array.isArray(id) ? parseInt(id.join('')) : parseInt(id ?? '');
  const [generalEditableListItem, setGeneralEditableListItem] = useState(defaultEditableList);
  const [warehouseEditableListItem, setWarehouseEditableListItem] = useState(defaultEditableList);
  const [addNewWarehouseFormInputs, setAddNewWarehouseFormInputs] = useState(
    defaultAddNewWarehouseFormInputs
  );
  const [value, setValue] = useState(defaultValue);
  const generalEventEmitter: ClientEventEmitter = new ClientEventEmitter();
  const warehouseEventEmitter: ClientEventEmitter = new ClientEventEmitter();
  const buttonOptions: ButtonOptions = {
    edit: true,
    delete: true,
    addNew: false,
    custom: false
  };
  const [productStock, setProductStock] = useState(0);

  async function deleteProduct(id: number) {
    const response = await fetch(buildOneEntityUrl(HttpMethod.DELETE, EntityType.PRODUCT, id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    // Handle success
    router.push('/supplier/products');
  }

  useEffect(() => {
    getProductValues(pId)
      .then((res) => {
        setValue(res);
        setGeneralEditableListItem([
          {
            displayName: value.product.name,
            id: value.product.id,
            editFormInputs: [
              {
                name: 'Name',
                defaultValue: res.product.name,
                inputType: InputTypeEnum.Text,
                validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Name' }]
              },
              {
                name: 'Description',
                defaultValue: res.product.description,
                inputType: InputTypeEnum.Text,
                validationRuleNames: []
              },
              {
                name: 'Price',
                defaultValue: res.product.price,
                inputType: InputTypeEnum.Text,
                validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Price' }]
              },
              {
                name: 'Image',
                inputType: InputTypeEnum.File,
                validationRuleNames: []
              },
              {
                name: 'Category',
                defaultValue: res.product.category,
                inputType: InputTypeEnum.Text,
                validationRuleNames: []
              },
              {
                name: 'Brand',
                defaultValue: res.product.brand,
                inputType: InputTypeEnum.Text,
                validationRuleNames: []
              },
              {
                name: 'Size',
                defaultValue: res.product.size,
                inputType: InputTypeEnum.Text,
                validationRuleNames: []
              }
            ]
          }
        ]);
        const warehouses: EditableListItem[] = res.warehouses.map((w) => {
          const warehouseFormInputs: FormInput[] = [
            {
              name: 'Stock',
              defaultValue: w.stock,
              inputType: InputTypeEnum.Text,
              validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Stock' }]
            }
          ];
          const item: EditableListItem = {
            displayName: w.name + '\r\n' + w.stock,
            id: w.id,
            editFormInputs: warehouseFormInputs
          };
          return item;
        });
        setWarehouseEditableListItem(warehouses);
        setProductStock(
          res.warehouses.map((w) => w.stock).reduce((partialSum, a) => partialSum + a, 0)
        );
        return res.warehouses;
      })
      .then((productWarehouses) =>
        getActiveWarehouses().then((res) => {
          const warehousesNotInProduct = res.filter(
            (w) => !productWarehouses.map((pW) => pW.id).includes(w.id)
          );
          setAddNewWarehouseFormInputs([
            {
              name: 'Warehouse',
              options: warehousesNotInProduct.map((w) => w.id + '-' + w.name),
              defaultValue: '',
              inputType: InputTypeEnum.DropDown,
              validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Warehouse' }]
            },
            {
              name: 'Stock',
              inputType: InputTypeEnum.Text,
              validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Stock' }]
            }
          ]);
        })
      );
  }, []);

  warehouseEventEmitter.on('delete', (wId) => removeWarehouseFromProduct(pId, wId));
  warehouseEventEmitter.on('edit', ([formValues, wId]: [FormValues, number]) =>
    updateWarehouseProductStock(pId, wId, formValues.getValue('Stock'))
  );
  warehouseEventEmitter.on('addNew', (formValues: FormValues) =>
    updateWarehouseProductStock(
      pId,
      formValues.getValue('Warehouse')[0],
      formValues.getValue('Stock')
    )
  );

  generalEventEmitter.on('delete', (id) => deleteProduct(pId));
  generalEventEmitter.on('edit', ([formValues, id]: [FormValues, number]) =>
    updateProductValues(pId, formValues)
  );

  return (
    <div className={styles.profile}>
      <div className="flex">
        <img
          className="max-w-800 w-screen rounded-none z-[-1]"
          src={value.product.image ?? ''}
        ></img>
      </div>
      <Link className={styles.link + ' close-button white'} href="/supplier/products"></Link>
      <div className="main-body mt-[-5]" style={{ marginTop: '-1em' }}>
        <div className="flex">
          <div>
            <div>{value.product.name}</div>
            <div className="flex">
              <div className="money">{value.product.price}</div>
              <div className="pl-5">
                {value.warehouses.map((w) => w.stock).reduce((partialSum, a) => partialSum + a, 0)}{' '}
                in stock
              </div>
            </div>
            <div>brand: {value.product.brand}</div>
            <div>category: {value.product.category}</div>
            <div>size: {value.product.size}</div>
          </div>
          <div>
            <EditableListComponent
              list={generalEditableListItem}
              name={'Product'}
              eventEmitter={generalEventEmitter}
              buttonOptions={buttonOptions}
            ></EditableListComponent>
          </div>
        </div>
        <br></br>
        <div>{value.product.description}</div>
        <br></br>
        <h2>WAREHOUSE STOCK</h2>
        <EditableListComponent
          list={warehouseEditableListItem}
          name={'Warehouse Stock'}
          eventEmitter={warehouseEventEmitter}
          addNewFormInputs={addNewWarehouseFormInputs}
        ></EditableListComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

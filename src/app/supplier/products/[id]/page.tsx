'use client';

import { useRouter } from 'next/router';
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
import { Product, Warehouse } from '@prisma/client';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import { FormValues } from '@/helpers/formValues';

type WarehouseProductInfo = {
  name: string; //name of warehouse
  stock: number; //number of this product in its stock
  id: number; //id of warehouse
};

type ProductWithWarehouses = {
  product: Product;
  warehouses: WarehouseProductInfo[];
};

const testValue: ProductWithWarehouses = {
  product: {
    id: 0,
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQdJREFUWEftlU0OwiAQhYczeCXdY+KyPZ1bE923q3oek3oCDCZYnAAzw4+NSVk1Bfq+eX0DqptmAysOtQFsDuQ6cH6cgtHtdxdRpEUhjInGFDkwbACpuIOiIFgAueIcCBKgVNxCpFyoDuDEMHgMIgkgqT4k4O9vCoA/7oTte/851C1VHPABsGBzgFT1tuLVALDdzTJAha+oDTldQJ101MVQPYSUIJ4vB9AD9PenVPezvvwk1AMopaCb5iwIMYA6jmCu+0WsNYDfy1bcDmMMwO3wVXFuGEkHfADQwyKKADhXr/goxhvebekgIgBSEJYDQRBm5KhfkwUgAfoJANOM4LIqDmwAf+3AC13y08EsneriAAAAAElFTkSuQmCC',
    name: 'Worm on a String',
    price: 1,
    category: '',
    brand: '',
    size: '5',
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't.",
    supplierId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  warehouses: [
    {
      name: 'Warehouse A',
      id: 2,
      stock: 5
    },
    {
      name: 'Warehouse B',
      id: 3,
      stock: 10
    }
  ]
};

const activeWarehouses: WarehouseProductInfo[] = [
  {
    name: "Bobo's Bazaar",
    id: 0,
    stock: 0
  }
];

const getProductValues = async (id: number): Promise<ProductWithWarehouses> => {
  return testValue;
};

// get warehouses that could have this item added to it's stock
async function getActiveWarehouses(): Promise<WarehouseProductInfo[]> {
  return activeWarehouses;
}

function updateProductValues(id: number, formValues: FormValues) {}

function deleteProduct(id: number) {
  //should delete and redirect to supplier/products since /id no longer exists
}

// pid == product id, wid == warehouse id

function removeWarehouseFromProduct(pid: number, wid: number) {}

function updateWarehouseProductStock(pid: number, wid: number, newStock: number) {}

function addNewWarehouseToProduct(pid: number, wid: number, stock: number) {}

export default function ProductDetail() {
  //useRoleAuth(['staff'], '/login');
  const defaultEditableList: EditableListItem[] = [];
  const defaultValue: ProductWithWarehouses = {
    product: {
      id: 0,
      image: null,
      name: '',
      price: 0,
      category: '',
      brand: '',
      size: '',
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
        <img className="max-w-800 w-screen rounded-none z-[-1]" src={value.product.image}></img>
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

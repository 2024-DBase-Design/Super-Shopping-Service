'use client';

import { Product } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import '@/styles/staffSession.scss';
import SearchComponent from '@/components/search/search';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TableComponent, { ColType, Table, TableCol } from '@/components/table/table';
import Link from 'next/link';
import styles from './products.module.scss';
import { EditIconComponent } from '@/components/svgs/edit';
import { ButtonOptions, EditableListComponent } from '@/components/form/editableList';

type ProductFilter = {
  name: string;
};

const testValue: Product[] = [
  {
    id: 0,
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQdJREFUWEftlU0OwiAQhYczeCXdY+KyPZ1bE923q3oek3oCDCZYnAAzw4+NSVk1Bfq+eX0DqptmAysOtQFsDuQ6cH6cgtHtdxdRpEUhjInGFDkwbACpuIOiIFgAueIcCBKgVNxCpFyoDuDEMHgMIgkgqT4k4O9vCoA/7oTte/851C1VHPABsGBzgFT1tuLVALDdzTJAha+oDTldQJ101MVQPYSUIJ4vB9AD9PenVPezvvwk1AMopaCb5iwIMYA6jmCu+0WsNYDfy1bcDmMMwO3wVXFuGEkHfADQwyKKADhXr/goxhvebekgIgBSEJYDQRBm5KhfkwUgAfoJANOM4LIqDmwAf+3AC13y08EsneriAAAAAElFTkSuQmCC',
    name: 'two left socks',
    price: 10,
    category: '',
    brand: '',
    size: '',
    description: '',
    supplierId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 1,
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQVJREFUWEftlksSgjAMhpOL4TVwoXs9kO7xJHIl3MfJIkPt9JH0IZt2xQDl/5L+SUDaZoIDFw6AkYHiDNxvYes+niZL20wYE41JKmD0AFZxgcpA6ABKxRUQeYBacYZIZKE9gIj54BGINIAl+pCAu78rgP9xEeb77nWgWtpkwAXwBbsDpKLniA8D8NPdzQM581WVoaYKFO02NRzam9A0igDqAZYJ4HM2yu6v13fCZQJEBNrmIggzAL5OQJf3LtYdwKllFudFRADX9TfiQjPmM+A2Ez5vWT6AYvSGzkgHIDu5LAUiBmAEsQG4IFrLNfkjyomlGtZfAHKAiedlR1Ah6G8dAIdn4AsvarpB4pXvhQAAAABJRU5ErkJgggAA',
    name: 'gummy worms',
    price: 50,
    category: '',
    brand: '',
    size: '',
    description: '',
    supplierId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQ1JREFUWEftlTESwiAQRaHQC+gRtIl30MvYxDN5Gb2GtrHSC2iBswUZ3AF2lwXThCoTQv7bz1+w3dA7M+GwM8DsQKkD18M5Gt395SiKtCiEKdGUIgeGDSAV91AUBAugVJwDQQJoxQEi50J1AC+GwVMQWQBJ9TGBcH1TAPxzLwzvw+dYt1RxIATAgs0BctVDxZMBYLubZYAKn6oNOV1AnXTUxVA9hJQgnlcDrG5vs3ucpLrj9+qTEACstaYb+iIIMcD6/jHPzWIUaw4Q9jKIw3DOmdd2+VNxaRhJB0IAqNYPDMC5esVHMV4AbekhUgBSEJYDMRBu4qitKQKQAP0FgOuGOgMaodTaKlugAZsBvp3yxAH+b0wMAAAAAElFTkSuQmCC',
    name: 'random stickers',
    price: 32,
    category: '',
    brand: '',
    size: '',
    description: '',
    supplierId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

//API Connection TODO
async function GetProducts(filter: ProductFilter): Promise<Product[]> {
  return testValue;
}

//API Connection TODO
function DeleteProduct(id: number) {}

export default function Page() {
  const cols: TableCol[] = [
    {
      id: 0,
      name: 'IMAGE',
      type: ColType.Image
    },
    {
      id: 1,
      name: 'NAME',
      type: ColType.Basic
    },
    {
      id: 2,
      name: 'PRICE',
      type: ColType.Basic
    },
    {
      id: 3,
      name: '', //edit link
      type: ColType.Basic
    },
    {
      id: 4,
      name: '', //delete button
      type: ColType.Basic
    }
  ];
  const tsBs: Table = new Table(cols);
  const [table, setTable] = useState(tsBs);
  const [search, setSearch] = useState('');
  const searchEmitter: ClientEventEmitter = new ClientEventEmitter();
  const deleteEmitter: ClientEventEmitter = new ClientEventEmitter();
  const deleteButtonOptions: ButtonOptions = {
    edit: false,
    delete: true,
    addNew: false,
    custom: false
  };

  function updateTable(Products: Product[]) {
    const temp: Table = new Table(cols);
    for (const product of Products) {
      temp.values.push([
        product.image,
        product.name,
        product.price,
        <Link
          key={'e-' + product.id}
          className={styles.link}
          href={'/supplier/products/' + product.id}
        >
          <EditIconComponent fillColor="#00acbb"></EditIconComponent>
        </Link>,
        <EditableListComponent
          key={'d-' + product.id}
          name={'Product'}
          eventEmitter={deleteEmitter}
          list={[
            {
              displayName: product.name,
              id: product.id,
              editFormInputs: []
            }
          ]}
          buttonOptions={deleteButtonOptions}
          showText={false}
        ></EditableListComponent>
      ]);
    }

    setTable(temp);
  }

  useEffect(() => {
    console.log(search);
    GetProducts({ name: search }).then((res) => {
      updateTable(res);
    });
  }, [search]);

  searchEmitter.on('searched', (searchValue) => setSearch(searchValue));
  deleteEmitter.on('delete', (id) => DeleteProduct(id));

  return (
    <div>
      <p>Imagine a header is here</p>
      <SearchComponent eventEmitter={searchEmitter}></SearchComponent>
      <div className="main-body">
        <div className="flex justify-between mb-5">
          <h2>PRODUCTS</h2>
          <Link href={'/supplier/products/new'}>
            <h3>+ ADD NEW</h3>
          </Link>
        </div>
        <TableComponent table={table}></TableComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

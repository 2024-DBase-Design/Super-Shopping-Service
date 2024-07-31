'use client';

import { Warehouse } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import '@/styles/staffSession.scss';
import SearchComponent from '@/components/search/search';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TableComponent, { ColType, Table, TableCol } from '@/components/table/table';
import Link from 'next/link';
import styles from './warehouses.module.scss';
import { EditIconComponent } from '@/components/svgs/edit';
import { ButtonOptions, EditableListComponent } from '@/components/form/editableList';

type WarehouseFilter = {
  name: string;
};

// const testValue: WarehouseWithName[] = [
//   {
//     warehouse: {
//       id: 0,
//       capacity: 10,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     name: "Bobo's Emporium"
//   },
//   {
//     warehouse: {
//       id: 1,
//       capacity: 5902,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     name: "Charlie's Child Labor Factory"
//   },
//   {
//     warehouse: {
//       id: 2,
//       capacity: 12,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     name: "Tooth Fairy's Knick Knacks"
//   },
//   {
//     warehouse: {
//       id: 3,
//       capacity: 100,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     name: 'Warehouse A'
//   },
//   {
//     warehouse: {
//       id: 4,
//       capacity: 999,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     name: 'Warehouse B'
//   }
// ];

//API Connection TODO
async function GetWarehouses(filter: WarehouseFilter): Promise<Warehouse[]> {
  //warehouses do not have their name attached.
  return [];
}

//API Connection TODO
function DeleteWarehouse(id: number) {}

export default function Page() {
  const cols: TableCol[] = [
    {
      id: 0,
      name: 'NAME',
      type: ColType.Basic
    },
    {
      id: 1,
      name: 'CAPACITY',
      type: ColType.Basic
    },
    {
      id: 2,
      name: '', //edit link
      type: ColType.Basic
    },
    {
      id: 3,
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

  function updateTable(warehouses: Warehouse[]) {
    const temp: Table = new Table(cols);
    for (const warehouse of warehouses) {
      temp.values.push([
        warehouse.name,
        warehouse.capacity,
        <Link
          key={'e-' + warehouse.id}
          className={styles.link}
          href={'/supplier/warehouses/' + warehouse.id}
        >
          <EditIconComponent fillColor="#00acbb"></EditIconComponent>
        </Link>,
        <EditableListComponent
          key={'d-' + warehouse.id}
          name={'Warehouse'}
          eventEmitter={deleteEmitter}
          list={[
            {
              displayName: warehouse.name,
              id: warehouse.id,
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
    GetWarehouses({ name: search }).then((res) => {
      updateTable(res);
    });
  }, [search]);

  searchEmitter.on('searched', (searchValue) => setSearch(searchValue));
  deleteEmitter.on('delete', (id) => DeleteWarehouse(id));

  return (
    <div>
      <p>Imagine a header is here</p>
      <SearchComponent eventEmitter={searchEmitter}></SearchComponent>
      <div className="main-body">
        <div className="flex justify-between mb-5">
          <h2>WAREHOUSES</h2>
          <Link href={'/supplier/warehouses/new'}>
            <h3>+ ADD NEW</h3>
          </Link>
        </div>
        <TableComponent table={table}></TableComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

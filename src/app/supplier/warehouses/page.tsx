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
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';

type WarehouseFilter = {
  name: string;
};

const GetWarehouses = async (filter: WarehouseFilter): Promise<Warehouse[]> => {
  try {
    const response = await fetch(
      buildOneEntityUrl(HttpMethod.GET, EntityType.WAREHOUSE) + `/filter/${filter}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching warehouses');
    }

    const warehouses: Warehouse[] = await response.json();
    return warehouses;
  } catch (error) {
    console.error('Error fetching warehouses:', (error as Error).message);
    return [];
  }
};

// Delete a warehouse by id
const DeleteWarehouse = async (id: number) => {
  try {
    const response = await fetch(buildOneEntityUrl(HttpMethod.DELETE, EntityType.WAREHOUSE, id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Error deleting warehouse');
    }
  } catch (error) {
    console.error('Error deleting warehouse:', (error as Error).message);
  }
};

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

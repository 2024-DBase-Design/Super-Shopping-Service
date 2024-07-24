'use client';

import { Customer, Warehouse } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import '@/styles/staffSession.scss';
import SearchComponent from '@/components/search/search';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TableComponent, { ColType, Table, TableCol } from '@/components/table/table';
import Link from 'next/link';
import styles from './customers.module.scss';

type WarehouseFilter = {
  name: string;
};

type WarehouseWithName = {
  warehouse: Warehouse;
  name: string;
};

const testValue: WarehouseWithName[] = [
  {
    warehouse: {
      id: 0,
      capacity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    name: "Bobo's Factory"
  }
];

async function GetWarehouses(filter: WarehouseFilter): Promise<WarehouseWithName[]> {
  //warehouses do not have their name attached.
  return testValue;
}

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
    }
  ];
  const tsBs: Table = new Table(cols);
  const [table, setTable] = useState(tsBs);
  const [search, setSearch] = useState('');
  const searchEmitter: ClientEventEmitter = new ClientEventEmitter();

  function updateTable(warehouses: WarehouseWithName[]) {
    const temp: Table = new Table(cols);
    for (const warehouse of warehouses) {
      temp.values.push([
        warehouse.name,
        warehouse.warehouse.capacity,
        <Link
          key={warehouse.warehouse.id}
          className={styles.link}
          href={'/supplier/warehouses/' + warehouse.warehouse.id}
        >
          Details
        </Link>
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

  return (
    <div>
      <p>Imagine a header is here</p>
      <SearchComponent eventEmitter={searchEmitter}></SearchComponent>
      <div className="main-body">
        <TableComponent table={table}></TableComponent>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

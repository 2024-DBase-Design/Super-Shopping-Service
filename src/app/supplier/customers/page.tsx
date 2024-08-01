'use client';

import { Customer } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import '@/styles/staffSession.scss';
import SearchComponent from '@/components/search/search';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TableComponent, { ColType, Table, TableCol } from '@/components/table/table';
import Link from 'next/link';
import styles from './customers.module.scss';
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';
import useClientSide from '@/hooks/useClientSide';

type CustomerFilter = {
  name: string;
};

const GetCustomers = async (filter: CustomerFilter): Promise<Customer[]> => {
  const customerRes = await fetch(buildOneEntityUrl(HttpMethod.GET, EntityType.CUSTOMER));
  if (!customerRes.ok) {
    throw new Error('Failed to fetch customers');
  }
  const customers: Customer[] = await customerRes.json();

  if (filter.name === '') {
    return customers;
  }
  return customers.filter((customer) => {
    return customer.firstName.includes(filter.name) || customer.lastName.includes(filter.name);
  });
};

export default function Page() {
  const cols: TableCol[] = [
    {
      id: 0,
      name: '', // profile picture
      type: ColType.Image
    },
    {
      id: 1,
      name: 'NAME',
      type: ColType.Basic
    },
    {
      id: 2,
      name: 'BALANCE',
      type: ColType.Money
    },
    {
      id: 3,
      name: '', // three dots
      type: ColType.Basic
    }
  ];
  const tsBs: Table = new Table(cols);
  const [table, setTable] = useState(tsBs);
  const [search, setSearch] = useState('');
  const searchEmitter: ClientEventEmitter = new ClientEventEmitter();

  function updateTable(customers: Customer[]) {
    const temp: Table = new Table(cols);
    for (const customer of customers) {
      temp.values.push([
        customer.profilePicture,
        customer.firstName + ' ' + customer.lastName,
        customer.balance,
        <Link key={customer.id} className={styles.link} href={'/supplier/customers/' + customer.id}>
          Details
        </Link>
      ]);
    }

    setTable(temp);
  }

  useEffect(() => {
    console.log(search);
    GetCustomers({ name: search }).then((res) => {
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

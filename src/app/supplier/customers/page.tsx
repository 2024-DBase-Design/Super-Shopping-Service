'use client';

import { Customer } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import '@/styles/staffSession.scss';
import SearchComponent from '@/components/search/search';
import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import TableComponent, { ColType, Table, TableCol } from '@/components/table/table';
import Link from 'next/link';
import styles from './customers.module.scss';

type CustomerFilter = {
  name: string;
};

const testValue: Customer[] = [
  {
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    profilePicture:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQdJREFUWEftlU0OwiAQhYczeCXdY+KyPZ1bE923q3oek3oCDCZYnAAzw4+NSVk1Bfq+eX0DqptmAysOtQFsDuQ6cH6cgtHtdxdRpEUhjInGFDkwbACpuIOiIFgAueIcCBKgVNxCpFyoDuDEMHgMIgkgqT4k4O9vCoA/7oTte/851C1VHPABsGBzgFT1tuLVALDdzTJAha+oDTldQJ101MVQPYSUIJ4vB9AD9PenVPezvvwk1AMopaCb5iwIMYA6jmCu+0WsNYDfy1bcDmMMwO3wVXFuGEkHfADQwyKKADhXr/goxhvebekgIgBSEJYDQRBm5KhfkwUgAfoJANOM4LIqDmwAf+3AC13y08EsneriAAAAAElFTkSuQmCC',
    balance: 100,
    cart: null,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-02-01T00:00:00Z')
  },
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    password: 'secret456',
    profilePicture:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQVJREFUWEftlksSgjAMhpOL4TVwoXs9kO7xJHIl3MfJIkPt9JH0IZt2xQDl/5L+SUDaZoIDFw6AkYHiDNxvYes+niZL20wYE41JKmD0AFZxgcpA6ABKxRUQeYBacYZIZKE9gIj54BGINIAl+pCAu78rgP9xEeb77nWgWtpkwAXwBbsDpKLniA8D8NPdzQM581WVoaYKFO02NRzam9A0igDqAZYJ4HM2yu6v13fCZQJEBNrmIggzAL5OQJf3LtYdwKllFudFRADX9TfiQjPmM+A2Ez5vWT6AYvSGzkgHIDu5LAUiBmAEsQG4IFrLNfkjyomlGtZfAHKAiedlR1Ah6G8dAIdn4AsvarpB4pXvhQAAAABJRU5ErkJgggAA',
    balance: 200,
    cart: null,
    createdAt: new Date('2024-03-01T00:00:00Z'),
    updatedAt: new Date('2024-04-01T00:00:00Z')
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    password: 'secure789',
    profilePicture:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQ1JREFUWEftlTESwiAQRaHQC+gRtIl30MvYxDN5Gb2GtrHSC2iBswUZ3AF2lwXThCoTQv7bz1+w3dA7M+GwM8DsQKkD18M5Gt395SiKtCiEKdGUIgeGDSAV91AUBAugVJwDQQJoxQEi50J1AC+GwVMQWQBJ9TGBcH1TAPxzLwzvw+dYt1RxIATAgs0BctVDxZMBYLubZYAKn6oNOV1AnXTUxVA9hJQgnlcDrG5vs3ucpLrj9+qTEACstaYb+iIIMcD6/jHPzWIUaw4Q9jKIw3DOmdd2+VNxaRhJB0IAqNYPDMC5esVHMV4AbekhUgBSEJYDMRBu4qitKQKQAP0FgOuGOgMaodTaKlugAZsBvp3yxAH+b0wMAAAAAElFTkSuQmCC',
    balance: 300,
    cart: null,
    createdAt: new Date('2024-05-01T00:00:00Z'),
    updatedAt: new Date('2024-06-01T00:00:00Z')
  }
];

async function GetCustomers(filter: CustomerFilter): Promise<Customer[]> {
  return testValue;
}

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

'use client';

import { Address, Staff } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import { AddressTypeEnum } from '@/helpers/address';
import '@/styles/staffSession.scss';
import useClientSide from '@/hooks/useClientSide';
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/hooks/useRoleAuth';
import { BrandHeaderComponent } from '@/components/brandHeader/brandHeader';
import NavFooter, { getStaffButtons } from '@/components/nav/navFooter';

type StaffProfileValues = {
  staff: Staff;
  address: Address;
};

const testValue: StaffProfileValues = {
  staff: {
    id: 0,
    firstName: 'Joe',
    lastName: 'Mama',
    email: 'gotte@m.com',
    password: 'your_mother',
    profilePicture:
      'data:image/jpeg;base64,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',
    salary: 10.0,
    jobTitle: 'Ponzi Pro',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  address: {
    id: 0,
    addressLineOne: '123 Gamer Boulevard',
    addressLineTwo: null,
    city: 'Cincinnati',
    state: 'Agony',
    zip: '12345',
    country: 'US',
    type: AddressTypeEnum.Billing,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: null,
    staffId: 0,
    supplierId: null,
    warehouseId: null
  }
};

export default function Page() {
  const GetProfileInformation = async (): Promise<StaffProfileValues> => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const decoded = jwtDecode<DecodedToken>(token);
      const res = await fetch(buildOneEntityUrl(HttpMethod.GET, EntityType.STAFF, decoded.id));

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Staff = await res.json();

      const res2 = await fetch(
        buildOneEntityUrl(HttpMethod.GET, EntityType.STAFF, data.id) + '/address'
      );

      if (!res2.ok) {
        return { staff: data, address: testValue.address };
      }

      const data2: Address = await res2.json();

      return { staff: data, address: data2 };
    } catch (error) {
      console.error(error);
      return testValue;
    }
  };

  const tsBs: StaffProfileValues = {
    staff: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePicture: '',
      salary: 0,
      jobTitle: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    address: {
      id: 0,
      addressLineOne: '',
      addressLineTwo: null,
      city: '',
      state: '',
      zip: '',
      country: '',
      type: AddressTypeEnum.Billing,
      createdAt: new Date(),
      updatedAt: new Date(),
      customerId: null,
      staffId: 0,
      supplierId: null,
      warehouseId: null
    }
  };
  const [values, setValues] = useState(tsBs);

  useEffect(() => {
    GetProfileInformation().then((res) => {
      setValues(res);
    });
  }, []);

  return (
    <div className={styles.profile}>
      <BrandHeaderComponent supplier={true}></BrandHeaderComponent>
      <div className="flex justify-center items-center">
        <img src={values.staff.profilePicture ?? ''} className="drop-shadow-lg" />
      </div>
      <div className={styles.nameTag + ' drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]'}>
        GET BACK TO WORK {values.staff.firstName + ' ' + values.staff.lastName}
      </div>
      <div className="main-body">
        <h4>JOB TITLE</h4>
        <p>{values.staff.jobTitle}</p>
        <br></br>
        <h4>SALARY</h4>
        <p className={'money'}>{values.staff.salary} / HR</p>
        <br></br>
        <h4>ADDRESS</h4>
        <p>
          {values.address.addressLineOne +
            '\r\n' +
            (values.address.addressLineTwo ? values.address.addressLineTwo + '\r\n' : '') +
            values.address.city +
            ', ' +
            values.address.state +
            ' ' +
            values.address.zip}
        </p>
        <NavFooter navButtons={getStaffButtons(3)} />
      </div>
    </div>
  );
}

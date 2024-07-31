'use client';

import { useRouter } from 'next/router';
import useRoleAuth from '@/hooks/useRoleAuth';
import React, { useEffect, useState } from 'react';
import styles from '../detail.module.scss';
import '@/styles/staffSession.scss';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { pid } from 'process';

type ProductWithStock = {
  product: Product;
  stock: number;
};

const testValue: ProductWithStock = {
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
  stock: 12
};

const getProductValues = async (id: number): Promise<ProductWithStock> => {
  return testValue;
};

function addProductToCart(id: number) {}

export default function ProductDetail() {
  //useRoleAuth(['staff'], '/login');
  const defaultValue: ProductWithStock = {
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
    stock: 0
  };
  const { id } = useParams();
  const pId = Array.isArray(id) ? parseInt(id.join('')) : parseInt(id ?? '');
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    getProductValues(pId).then((res) => {
      setValue(res);
    });
  }, []);

  return (
    <div className={styles.profile}>
      <div className="flex">
        <img className="max-w-800 w-screen rounded-none z-[-1]" src={value.product.image}></img>
      </div>
      <Link className={styles.link + ' close-button white'} href="/home"></Link>
      <div className="main-body mt-[-5]" style={{ marginTop: '-1em' }}>
        <div className="flex justify-between">
          <div>
            <div>{value.product.name}</div>
            <div className="flex">
              <div className="money">{value.product.price}</div>
              <div className="pl-5">
                {value.stock + ' '}
                in stock
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => addProductToCart(pId)}>+ Add to Cart</button>
          </div>
        </div>
        <br></br>
        <div>{value.product.description}</div>
      </div>
      <p style={{ position: 'fixed', bottom: '0' }}>Imagine a footer is here</p>
    </div>
  );
}

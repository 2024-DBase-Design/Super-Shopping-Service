/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import styles from './productPreview.module.scss';
import { Product } from '@prisma/client';
type ProductPreviewProps = {
  name: string;
  price: number;
  image: string;
  stock: number;
};

const ProductPreviewComponent: React.FC<ProductPreviewProps> = ({
    name = "",
    price = 0,
    image = "",
    stock = 0
}) => {
  return (
    <a href=''>
        <div className={`${styles.product_preview}`}>
            <img src={image} />
            <p>{name}</p>
            <div className={`${styles.price_stock}`}>
                <p className={`${styles.price}`}>${price}</p>
                <p className={`${styles.stock}`}>{stock} in stock</p>
            </div>
        </div>
    </a>
  );
};

export default ProductPreviewComponent;

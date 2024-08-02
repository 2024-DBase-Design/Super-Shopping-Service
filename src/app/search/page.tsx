'use client';

import React from 'react';
import { useState } from 'react';
import { Product } from '@prisma/client';
import ProductPreviewComponent from '@/components/products/productPreview';
import '@/styles/noSession.scss';
import styles from './search.module.scss';
import { shrikhand } from '../fonts';
import NavFooter, { getCustomerButtons } from '@/components/nav/navFooter';
import { buildOneEntityUrl, EntityType, HttpMethod } from '@/helpers/api';

const getStockAmount = async (productId: number): Promise<number> => {
  const stockAmountRes = await fetch(
    buildOneEntityUrl(HttpMethod.GET, EntityType.PRODUCT, productId) + '/stock'
  );

  if (!stockAmountRes.ok) {
    throw new Error('Failed to get stock amount');
  }

  const stockAmount: number = await stockAmountRes.json();

  return stockAmount;
};

const SearchPage = () => {
  const [getSearchResults, setSearchResults] = useState({
    products: [] as Product[]
  });

  const conductSearch = async (searchText: string) => {
    try {
      const response = await fetch(
        buildOneEntityUrl(HttpMethod.GET, EntityType.PRODUCT) +
          '/search' +
          `?name=${encodeURIComponent(searchText)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data: Product[] = await response.json();
      setSearchResults({ products: data });
    } catch (error) {
      console.error('Error conducting search:', error);
      setSearchResults({ products: [] });
    }
  };

  const [getSearchText, setSearchText] = useState('');

  return (
    <div className={'main-container ' + styles.mainContainer}>
      <div className={styles.topSection}>
        <h1 className={shrikhand.className + ' ' + styles.header}>Silly Stuffs</h1>
        <div className={styles.searchButtonCombo}>
          <input
            placeholder="Search"
            className={styles.searchBar}
            type="text"
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
            }}
          />
          <button onClick={() => conductSearch(getSearchText)}> GO </button>
        </div>
      </div>
      <div className={styles.homeCard}>
        <div className={styles.homeSection}>
          <div className={styles.resultsContainer}>
            {getSearchResults.products.map(async (product, i) => (
              <ProductPreviewComponent
                image={product.image ?? ''}
                name={product.name}
                price={product.price}
                stock={await getStockAmount(product.id)}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
      <NavFooter navButtons={getCustomerButtons(0)} />
    </div>
  );
};

export default SearchPage;

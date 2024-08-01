'use client';

import React, { useState } from 'react';
import { Product, Stock } from '@prisma/client';
import ProductPreviewComponent from '@/components/products/productPreview';
import { LogoComponent } from '@/components/svgs/logo';
import '@/styles/noSession.scss';
import styles from './home.module.scss';
import { shrikhand } from '../fonts';
import { ValidationRuleEnum } from '@/components/input/validationRules';
import NavFooter, { getCustomerButtons } from '@/components/nav/navFooter';
import Link from 'next/link';
import { FormValues } from '@/helpers/formValues';
import FormComponent, { FormInput, InputTypeEnum } from '@/components/form/form';
import { GetAllProducts, getStockAmount } from '@/helpers/api';
import { useEffect } from 'react';

type ProductWithStock = {
  product: Product;
  stock: number;
};

type RecommendedProducts = {
  products: ProductWithStock[];
};

const testValue: RecommendedProducts = {
  products: [
    {
      product: {
        id: 0,
        image:
          'data:image/jpeg;base64,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',
        name: 'test item 1',
        price: 10,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    },
    {
      product: {
        id: 1,
        image:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wgARCABkAGQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//aAAwDAQACEAMQAAAB6MySwu6YqtLq5dprNdplVanUzAdI6hgKnfITpXFCmrhooXpXFZVtWVWtq1MAUdpdszOUHTaK0mh+jNmHarC3GiEM2YLE6yLTOzTns0jSiUpFbM3szOUVq1EDBO7KNLNOd1VxXGtvSXjW1dSxM32VZjMINIIzoLcnVTRpVDIwrL0OdNLZmnOqMtkgaUdKQ0zIOVnCKYAl1hWmQSANv//EACMQAAICAgIDAAIDAAAAAAAAAAABAhEDEhAhEyAxIiMyQUL/2gAIAQEAAQUC5Y2XzZubC79GfSUfezyP0mh/                <ProductPreviewComponent image={product.image ?? ''} name={product.name} price={product.price} stock={getStockAmount(product.id)} />LKpctIcRwpShIp8JM8YsZohQojYsmr+8tMnEUTXi0hzNR4iOGC9c03tvI2mfsZ42zx+sviZZqjxxKK5//EAB0RAAICAgMBAAAAAAAAAAAAAAABESACEBIhMTD/2gAIAQMBAT8BEhRpoeJx0kzwTpiqciSRe/BM6qsxskTJJJ2q/wD/xAAeEQADAAIDAAMAAAAAAAAAAAAAARECIBASMSFBUf/aAAgBAgEBPwEb/B0oshZF4ch6NC1+iU6EIT4090aKI8KijxEiDxIdScsWn//EACIQAAEDAwQDAQAAAAAAAAAAAAABESEQIDEwQVFhEjJQcf/aAAgBAQAGPwL63RxT3ORlvU6q6jokILXFviLFnY5IxFXp0OhOwokkErew29GS+bsXsuSDkisaGWHz+24MGKTr/wD/xAAfEAEAAwEBAQEBAQEBAAAAAAABABEhMRBBYVFxgZH/2gAIAQEAAT8hryow9Fy5YliBjPqHqyVaKRz/AL6y5cxATHwlXMCuxYGIXxHh8feEf2TqJ0mXCQ5D4x9pXYxpTewHW0ILOLyH5QP2VgdtQz6IiX5UPKlzbL63WP4j3Z1tw4SutdwBR+UFbbb/AOSzjHuInbQ+rKQdhuPjuSnR/wBhRVoiWsFiv6MBQGXqT80mi/lyxtJR/CBqPvIW4hp+jJ8y2KmnXYkS3CxghKDBhICln32NVAFZyqVDIB3EfKm2jR9IChcKPS2b4N/IPrpGxdhUVGRMFZQgDamY8Zdz+QgvDYtpqSwpQlXSV2jIrhBvWa9lWRGBS6yj9fWY60Zbyr/YlRq4ji/9lbueJQ5KiC5Y5s12AuP8ERsX/vhmMXJgFw+z+HnfpDuTMuXDni1GlnL8sOSpA+VP/9oADAMBAAIAAwAAABCFsZH8HL02w9J/DEsxCig1FiG+DrJw6jDBM2x4EZj3GOJ1970P/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECExQWEg/9oACAEDAQE/EI3tujqwhYflrgDsbNZnjR49ZQdgNh4LI59vxvywDL0skR7n8Y1J3PcDZBmMa6EReDNc+J/j/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECFBMVFh/9oACAECAQE/EJzqYPcKQl9swZJRfUEo4XC6zq/i8rRbLVq5+TmaXX2FW3x6tjE6jOzijM2MjWZPJQxZoefYcL2zz98Tn//EACEQAQACAgIDAAMBAAAAAAAAAAEAESExQVFhcYEQkaGx/9oACAEBAAE/ECK/DCm4rtjZjDBqLDYzF7xNGX7KVLIyihtl6VC+2B3dkKSxvSJW45irmNZjzC6xlctPMzLTNBdTgweQrMEdEQWogtGCcoo3efwt7nEasWiL1b6EK4o/uVAC1jzF9Ur5hVh+wsQAJRHf4CUs9SwDS4HbCLbZQxcInnzEJwKZJf25Slh8VMxTQDC/dVHyBbllaliGULGzES4K8wSXBR3EQFLNK+JZYgKzzLJbDNZV6gcidKvUVIrBx+MazbBfCAqqdOZV/wCkGaF5nUHqWLSAYJSfcFHF4No+5UohggBy7zEkavGYU2KAQq5iEU9hYXsbqK1XqP0W0wyF8PmAoNlGOoGLwWZsGJSGFAyiBWO4jg6dPGd/IJEBqxvyR8CUKdxalwbvKRBDhp4gUWVHX2HkBeRpguh/CYDo/kQUK4hCMCoGtXM4HbUWhFwZvzKL5bTxKAMGnWtMrSosg19mWWvx3DQ+8yxwBZ3EFuoKXg4JoO4PEbzg+S0wXvDCimMHctuJb1lMNQMF2y+uolg2rl6rg65ghGU3mBuArmHFtGpoZvMU6RnALR16jamnxJGKuM3AY1HbCuksrceCorh/QS3RlqswOQhIUfu4UC6uv1HSS5aoR3MCAR4ZbADgKl4HaXXonjqV26gpjEWyf2WbuMdvM4U/cFMExzmVhseipnmfcCaplu4K6v8AErcYqlu7lsxDuoX5F9sLDv7jrELkIhTiU6n/2Q==",
        name: 'test item 2',
        price: 15,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    },
    {
      product: {
        id: 2,
        image:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wgARCABkAGQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//aAAwDAQACEAMQAAAB6MySwu6YqtLq5dprNdplVanUzAdI6hgKnfITpXFCmrhooXpXFZVtWVWtq1MAUdpdszOUHTaK0mh+jNmHarC3GiEM2YLE6yLTOzTns0jSiUpFbM3szOUVq1EDBO7KNLNOd1VxXGtvSXjW1dSxM32VZjMINIIzoLcnVTRpVDIwrL0OdNLZmnOqMtkgaUdKQ0zIOVnCKYAl1hWmQSANv//EACMQAAICAgIDAAIDAAAAAAAAAAABAhEDEhAhEyAxIiMyQUL/2gAIAQEAAQUC5Y2XzZubC79GfSUfezyP0mh/KGhj990h5ItLJFnXDH7THJoSsyRSSiyMp25dy9K4/wBODk4E/q6hGVuUhSZbQpm6PJxk6cMhu9Ux0jZ6tpxjjaJR7tW49n95e4xVyyXddJ7jdEepTmO+H8Eiu3jiZOndwjjJoX4y/kMXFmLKpctIcRwpShIp8JM8YsZohQojYsmr+8tMnEUTXi0hzNR4iOGC9c03tvI2mfsZ42zx+sviZZqjxxKK5//EAB0RAAICAgMBAAAAAAAAAAAAAAABESACEBIhMTD/2gAIAQMBAT8BEhRpoeJx0kzwTpiqciSRe/BM6qsxskTJJJ2q/wD/xAAeEQADAAIDAAMAAAAAAAAAAAAAARECIBASMSFBUf/aAAgBAgEBPwEb/B0oshZF4ch6NC1+iU6EIT4090aKI8KijxEiDxIdScsWn//EACIQAAEDAwQDAQAAAAAAAAAAAAABESEQIDEwQVFhEjJQcf/aAAgBAQAGPwL63RxT3ORlvU6q6jokILXFviLFnY5IxFXp0OhOwokkErew29GS+bsXsuSDkisaGWHz+24MGKTr/wD/xAAfEAEAAwEBAQEBAQEBAAAAAAABABEhMRBBYVFxgZH/2gAIAQEAAT8hryow9Fy5YliBjPqHqyVaKRz/AL6y5cxATHwlXMCuxYGIXxHh8feEf2TqJ0mXCQ5D4x9pXYxpTewHW0ILOLyH5QP2VgdtQz6IiX5UPKlzbL63WP4j3Z1tw4SutdwBR+UFbbb/AOSzjHuInbQ+rKQdhuPjuSnR/wBhRVoiWsFiv6MBQGXqT80mi/lyxtJR/CBqPvIW4hp+jJ8y2KmnXYkS3CxghKDBhICln32NVAFZyqVDIB3EfKm2jR9IChcKPS2b4N/IPrpGxdhUVGRMFZQgDamY8Zdz+QgvDYtpqSwpQlXSV2jIrhBvWa9lWRGBS6yj9fWY60Zbyr/YlRq4ji/9lbueJQ5KiC5Y5s12AuP8ERsX/vhmMXJgFw+z+HnfpDuTMuXDni1GlnL8sOSpA+VP/9oADAMBAAIAAwAAABCFsZH8HL02w9J/DEsxCig1FiG+DrJw6jDBM2x4EZj3GOJ1970P/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECExQWEg/9oACAEDAQE/EI3tujqwhYflrgDsbNZnjR49ZQdgNh4LI59vxvywDL0skR7n8Y1J3PcDZBmMa6EReDNc+J/j/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECFBMVFh/9oACAECAQE/EJzqYPcKQl9swZJRfUEo4XC6zq/i8rRbLVq5+TmaXX2FW3x6tjE6jOzijM2MjWZPJQxZoefYcL2zz98Tn//EACEQAQACAgIDAAMBAAAAAAAAAAEAESExQVFhcYEQkaGx/9oACAEBAAE/ECK/DCm4rtjZjDBqLDYzF7xNGX7KVLIyihtl6VC+2B3dkKSxvSJW45irmNZjzC6xlctPMzLTNBdTgweQrMEdEQWogtGCcoo3efwt7nEasWiL1b6EK4o/uVAC1jzF9Ur5hVh+wsQAJRHf4CUs9SwDS4HbCLbZQxcInnzEJwKZJf25Slh8VMxTQDC/dVHyBbllaliGULGzES4K8wSXBR3EQFLNK+JZYgKzzLJbDNZV6gcidKvUVIrBx+MazbBfCAqqdOZV/wCkGaF5nUHqWLSAYJSfcFHF4No+5UohggBy7zEkavGYU2KAQq5iEU9hYXsbqK1XqP0W0wyF8PmAoNlGOoGLwWZsGJSGFAyiBWO4jg6dPGd/IJEBqxvyR8CUKdxalwbvKRBDhp4gUWVHX2HkBeRpguh/CYDo/kQUK4hCMCoGtXM4HbUWhFwZvzKL5bTxKAMGnWtMrSosg19mWWvx3DQ+8yxwBZ3EFuoKXg4JoO4PEbzg+S0wXvDCimMHctuJb1lMNQMF2y+uolg2rl6rg65ghGU3mBuArmHFtGpoZvMU6RnALR16jamnxJGKuM3AY1HbCuksrceCorh/QS3RlqswOQhIUfu4UC6uv1HSS5aoR3MCAR4ZbADgKl4HaXXonjqV26gpjEWyf2WbuMdvM4U/cFMExzmVhseipnmfcCaplu4K6v8AErcYqlu7lsxDuoX5F9sLDv7jrELkIhTiU6n/2Q==',
        name: 'test item 3',
        price: 100,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    },
    {
      product: {
        id: 3,
        image:
          'data:image/jpeg;base64,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',
        name: 'test item 4',
        price: 30,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    },
    {
      product: {
        id: 4,
        image:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wgARCABkAGQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//aAAwDAQACEAMQAAAB6MySwu6YqtLq5dprNdplVanUzAdI6hgKnfITpXFCmrhooXpXFZVtWVWtq1MAUdpdszOUHTaK0mh+jNmHarC3GiEM2YLE6yLTOzTns0jSiUpFbM3szOUVq1EDBO7KNLNOd1VxXGtvSXjW1dSxM32VZjMINIIzoLcnVTRpVDIwrL0OdNLZmnOqMtkgaUdKQ0zIOVnCKYAl1hWmQSANv//EACMQAAICAgIDAAIDAAAAAAAAAAABAhEDEhAhEyAxIiMyQUL/2gAIAQEAAQUC5Y2XzZubC79GfSUfezyP0mh/KGhj990h5ItLJFnXDH7THJoSsyRSSiyMp25dy9K4/wBODk4E/q6hGVuUhSZbQpm6PJxk6cMhu9Ux0jZ6tpxjjaJR7tW49n95e4xVyyXddJ7jdEepTmO+H8Eiu3jiZOndwjjJoX4y/kMXFmLKpctIcRwpShIp8JM8YsZohQojYsmr+8tMnEUTXi0hzNR4iOGC9c03tvI2mfsZ42zx+sviZZqjxxKK5//EAB0RAAICAgMBAAAAAAAAAAAAAAABESACEBIhMTD/2gAIAQMBAT8BEhRpoeJx0kzwTpiqciSRe/BM6qsxskTJJJ2q/wD/xAAeEQADAAIDAAMAAAAAAAAAAAAAARECIBASMSFBUf/aAAgBAgEBPwEb/B0oshZF4ch6NC1+iU6EIT4090aKI8KijxEiDxIdScsWn//EACIQAAEDAwQDAQAAAAAAAAAAAAABESEQIDEwQVFhEjJQcf/aAAgBAQAGPwL63RxT3ORlvU6q6jokILXFviLFnY5IxFXp0OhOwokkErew29GS+bsXsuSDkisaGWHz+24MGKTr/wD/xAAfEAEAAwEBAQEBAQEBAAAAAAABABEhMRBBYVFxgZH/2gAIAQEAAT8hryow9Fy5YliBjPqHqyVaKRz/AL6y5cxATHwlXMCuxYGIXxHh8feEf2TqJ0mXCQ5D4x9pXYxpTewHW0ILOLyH5QP2VgdtQz6IiX5UPKlzbL63WP4j3Z1tw4SutdwBR+UFbbb/AOSzjHuInbQ+rKQdhuPjuSnR/wBhRVoiWsFiv6MBQGXqT80mi/lyxtJR/CBqPvIW4hp+jJ8y2KmnXYkS3CxghKDBhICln32NVAFZyqVDIB3EfKm2jR9IChcKPS2b4N/IPrpGxdhUVGRMFZQgDamY8Zdz+QgvDYtpqSwpQlXSV2jIrhBvWa9lWRGBS6yj9fWY60Zbyr/YlRq4ji/9lbueJQ5KiC5Y5s12AuP8ERsX/vhmMXJgFw+z+HnfpDuTMuXDni1GlnL8sOSpA+VP/9oADAMBAAIAAwAAABCFsZH8HL02w9J/DEsxCig1FiG+DrJw6jDBM2x4EZj3GOJ1970P/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECExQWEg/9oACAEDAQE/EI3tujqwhYflrgDsbNZnjR49ZQdgNh4LI59vxvywDL0skR7n8Y1J3PcDZBmMa6EReDNc+J/j/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECFBMVFh/9oACAECAQE/EJzqYPcKQl9swZJRfUEo4XC6zq/i8rRbLVq5+TmaXX2FW3x6tjE6jOzijM2MjWZPJQxZoefYcL2zz98Tn//EACEQAQACAgIDAAMBAAAAAAAAAAEAESExQVFhcYEQkaGx/9oACAEBAAE/ECK/DCm4rtjZjDBqLDYzF7xNGX7KVLIyihtl6VC+2B3dkKSxvSJW45irmNZjzC6xlctPMzLTNBdTgweQrMEdEQWogtGCcoo3efwt7nEasWiL1b6EK4o/uVAC1jzF9Ur5hVh+wsQAJRHf4CUs9SwDS4HbCLbZQxcInnzEJwKZJf25Slh8VMxTQDC/dVHyBbllaliGULGzES4K8wSXBR3EQFLNK+JZYgKzzLJbDNZV6gcidKvUVIrBx+MazbBfCAqqdOZV/wCkGaF5nUHqWLSAYJSfcFHF4No+5UohggBy7zEkavGYU2KAQq5iEU9hYXsbqK1XqP0W0wyF8PmAoNlGOoGLwWZsGJSGFAyiBWO4jg6dPGd/IJEBqxvyR8CUKdxalwbvKRBDhp4gUWVHX2HkBeRpguh/CYDo/kQUK4hCMCoGtXM4HbUWhFwZvzKL5bTxKAMGnWtMrSosg19mWWvx3DQ+8yxwBZ3EFuoKXg4JoO4PEbzg+S0wXvDCimMHctuJb1lMNQMF2y+uolg2rl6rg65ghGU3mBuArmHFtGpoZvMU6RnALR16jamnxJGKuM3AY1HbCuksrceCorh/QS3RlqswOQhIUfu4UC6uv1HSS5aoR3MCAR4ZbADgKl4HaXXonjqV26gpjEWyf2WbuMdvM4U/cFMExzmVhseipnmfcCaplu4K6v8AErcYqlu7lsxDuoX5F9sLDv7jrELkIhTiU6n/2Q==',
        name: 'test item 5',
        price: 9,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    },
    {
      product: {
        id: 5,
        image:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wgARCABkAGQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//aAAwDAQACEAMQAAAB6MySwu6YqtLq5dprNdplVanUzAdI6hgKnfITpXFCmrhooXpXFZVtWVWtq1MAUdpdszOUHTaK0mh+jNmHarC3GiEM2YLE6yLTOzTns0jSiUpFbM3szOUVq1EDBO7KNLNOd1VxXGtvSXjW1dSxM32VZjMINIIzoLcnVTRpVDIwrL0OdNLZmnOqMtkgaUdKQ0zIOVnCKYAl1hWmQSANv//EACMQAAICAgIDAAIDAAAAAAAAAAABAhEDEhAhEyAxIiMyQUL/2gAIAQEAAQUC5Y2XzZubC79GfSUfezyP0mh/KGhj990h5ItLJFnXDH7THJoSsyRSSiyMp25dy9K4/wBODk4E/q6hGVuUhSZbQpm6PJxk6cMhu9Ux0jZ6tpxjjaJR7tW49n95e4xVyyXddJ7jdEepTmO+H8Eiu3jiZOndwjjJoX4y/kMXFmLKpctIcRwpShIp8JM8YsZohQojYsmr+8tMnEUTXi0hzNR4iOGC9c03tvI2mfsZ42zx+sviZZqjxxKK5//EAB0RAAICAgMBAAAAAAAAAAAAAAABESACEBIhMTD/2gAIAQMBAT8BEhRpoeJx0kzwTpiqciSRe/BM6qsxskTJJJ2q/wD/xAAeEQADAAIDAAMAAAAAAAAAAAAAARECIBASMSFBUf/aAAgBAgEBPwEb/B0oshZF4ch6NC1+iU6EIT4090aKI8KijxEiDxIdScsWn//EACIQAAEDAwQDAQAAAAAAAAAAAAABESEQIDEwQVFhEjJQcf/aAAgBAQAGPwL63RxT3ORlvU6q6jokILXFviLFnY5IxFXp0OhOwokkErew29GS+bsXsuSDkisaGWHz+24MGKTr/wD/xAAfEAEAAwEBAQEBAQEBAAAAAAABABEhMRBBYVFxgZH/2gAIAQEAAT8hryow9Fy5YliBjPqHqyVaKRz/AL6y5cxATHwlXMCuxYGIXxHh8feEf2TqJ0mXCQ5D4x9pXYxpTewHW0ILOLyH5QP2VgdtQz6IiX5UPKlzbL63WP4j3Z1tw4SutdwBR+UFbbb/AOSzjHuInbQ+rKQdhuPjuSnR/wBhRVoiWsFiv6MBQGXqT80mi/lyxtJR/CBqPvIW4hp+jJ8y2KmnXYkS3CxghKDBhICln32NVAFZyqVDIB3EfKm2jR9IChcKPS2b4N/IPrpGxdhUVGRMFZQgDamY8Zdz+QgvDYtpqSwpQlXSV2jIrhBvWa9lWRGBS6yj9fWY60Zbyr/YlRq4ji/9lbueJQ5KiC5Y5s12AuP8ERsX/vhmMXJgFw+z+HnfpDuTMuXDni1GlnL8sOSpA+VP/9oADAMBAAIAAwAAABCFsZH8HL02w9J/DEsxCig1FiG+DrJw6jDBM2x4EZj3GOJ1970P/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECExQWEg/9oACAEDAQE/EI3tujqwhYflrgDsbNZnjR49ZQdgNh4LI59vxvywDL0skR7n8Y1J3PcDZBmMa6EReDNc+J/j/8QAHBEBAQEAAwEBAQAAAAAAAAAAAQARECFBMVFh/9oACAECAQE/EJzqYPcKQl9swZJRfUEo4XC6zq/i8rRbLVq5+TmaXX2FW3x6tjE6jOzijM2MjWZPJQxZoefYcL2zz98Tn//EACEQAQACAgIDAAMBAAAAAAAAAAEAESExQVFhcYEQkaGx/9oACAEBAAE/ECK/DCm4rtjZjDBqLDYzF7xNGX7KVLIyihtl6VC+2B3dkKSxvSJW45irmNZjzC6xlctPMzLTNBdTgweQrMEdEQWogtGCcoo3efwt7nEasWiL1b6EK4o/uVAC1jzF9Ur5hVh+wsQAJRHf4CUs9SwDS4HbCLbZQxcInnzEJwKZJf25Slh8VMxTQDC/dVHyBbllaliGULGzES4K8wSXBR3EQFLNK+JZYgKzzLJbDNZV6gcidKvUVIrBx+MazbBfCAqqdOZV/wCkGaF5nUHqWLSAYJSfcFHF4No+5UohggBy7zEkavGYU2KAQq5iEU9hYXsbqK1XqP0W0wyF8PmAoNlGOoGLwWZsGJSGFAyiBWO4jg6dPGd/IJEBqxvyR8CUKdxalwbvKRBDhp4gUWVHX2HkBeRpguh/CYDo/kQUK4hCMCoGtXM4HbUWhFwZvzKL5bTxKAMGnWtMrSosg19mWWvx3DQ+8yxwBZ3EFuoKXg4JoO4PEbzg+S0wXvDCimMHctuJb1lMNQMF2y+uolg2rl6rg65ghGU3mBuArmHFtGpoZvMU6RnALR16jamnxJGKuM3AY1HbCuksrceCorh/QS3RlqswOQhIUfu4UC6uv1HSS5aoR3MCAR4ZbADgKl4HaXXonjqV26gpjEWyf2WbuMdvM4U/cFMExzmVhseipnmfcCaplu4K6v8AErcYqlu7lsxDuoX5F9sLDv7jrELkIhTiU6n/2Q==',
        name: 'test item 6',
        price: 7,
        category: 'test category',
        brand: 'test brand',
        size: 'test size',
        description: 'test description',
        supplierId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      stock: 10
    }
  ]
};

const getRecommendedItems = async (): Promise<RecommendedProducts> => {
  try {
    const products: Product[] = await GetAllProducts();

    if (products.length === 0) {
      throw new Error('No products found');
    }

    const stock: number[] = await Promise.all(
      products.map((product) => getStockAmount(product.id))
    );

    const productsWithStock: ProductWithStock[] = products.map((element, index) => {
      return { product: element, stock: stock[index] };
    });

    const recommendedProducts: RecommendedProducts = { products: productsWithStock };

    return recommendedProducts;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};

const HomePage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProducts>({
    products: []
  });

  useEffect(() => {
    // Get recommended items
    getRecommendedItems().then((res) => {
      setRecommendedProducts(res);
    });
  }, []);

  const inputs: FormInput[] = [
    {
      name: 'Email Address',
      inputType: InputTypeEnum.Text,
      defaultValue: '',
      validationRuleNames: [
        { type: ValidationRuleEnum.Required, args: 'Email address' },
        { type: ValidationRuleEnum.Email }
      ]
    },
    {
      name: 'Password',
      inputType: InputTypeEnum.Password,
      defaultValue: '',
      validationRuleNames: [{ type: ValidationRuleEnum.Required, args: 'Password' }]
    }
  ];

  return (
    <div className={'main-container ' + styles.mainContainer}>
      <div className={styles.topSection}>
        <h1 className={shrikhand.className + ' ' + styles.header}>Silly Stuffs</h1>
        <input placeholder="Search" className={styles.searchBar} type="text" />
      </div>
      <div className={styles.homeCard}>
        <div className={styles.homeSection}>
          <h2>Category</h2>
          <div className={styles.categoryContainer}>
            {['art', 'clothing', 'toy', 'food', 'cosmetic', 'mess', 'electronics', 'more'].map(
              (title) => (
                <div key={title}>
                  <div className={styles.categoryOptions} />
                  <p className={styles.categoryTitle}>{title}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className={styles.homeSection}>
          <h2>Recommended</h2>
          <div className={styles.reccomendedContainer}>
            {recommendedProducts.products.map((element) => (
              <ProductPreviewComponent
                key={element.product.id}
                image={element.product.image ?? ''}
                name={element.product.name}
                price={element.product.price}
                stock={element.stock}
              />
            ))}
          </div>
        </div>
      </div>
      <NavFooter navButtons={getCustomerButtons(0)} />
    </div>
  );
};

export default HomePage;

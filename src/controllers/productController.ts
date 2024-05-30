import { Request, Response } from "express";
import {
  Product,
  ProductPrice,
  SearchProductsRequest,
  AddProductRequest,
} from "../models";

let products: Product[] = [];
let productPrices: ProductPrice[] = [];

export const addProduct = (req: Request, res: Response) => {
  const {
    id,
    name,
    description,
    category,
    brand,
    size,
    image,
    price,
  }: AddProductRequest = req.body;

  // Ensure all required fields are present
  if (
    !id ||
    !name ||
    !description ||
    !category ||
    !brand ||
    !size ||
    price === undefined
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newProduct: Product = {
    id,
    name,
    description,
    category,
    brand,
    size,
    image,
  };
  products.push(newProduct);

  const newProductPrice: ProductPrice = { productId: id, price };
  productPrices.push(newProductPrice);

  res.status(201).json({ ...newProduct, price });
};

export const getProductDetails = (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = products.find((p) => p.id === Number(productId));
  if (product) {
    const productPrice = productPrices.find((pp) => pp.productId === Number(productId));
    res.json({ ...product, price: productPrice?.price });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = (req: Request, res: Response) => {
  const { productId } = req.params;
  const updatedDetails = req.body;
  let product = products.find((p) => p.id === Number(productId)) as Product;
  if (product) {
    product = { ...product, ...updatedDetails };
    products = products.map((p) => (p.id === Number(productId) ? product : p));
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const { productId } = req.params;
  products = products.filter((p) => p.id !== Number(productId));
  productPrices = productPrices.filter((pp) => pp.productId !== Number(productId));
  res.status(204).send();
};

export const setProductPrice = (req: Request, res: Response) => {
  const { productId } = req.params;
  const { price }: { price: number } = req.body;
  const existingProduct = products.find((p) => p.id === Number(productId));
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  const existingPriceIndex = productPrices.findIndex(
    (pp) => pp.productId === Number(productId)
  );
  if (existingPriceIndex !== -1) {
    productPrices[existingPriceIndex].price = price;
  } else {
    return res.status(404).json({ message: "Product price not found" });
  }
  res.json({ productId, price });
};

export const searchProducts = (req: Request, res: Response) => {
  const { query, category, brand, size }: SearchProductsRequest =
    req.query as unknown as SearchProductsRequest;
  const result = products
    .filter((p) => {
      return (
        (!query || p.name.includes(query)) &&
        (!category || p.category === category) &&
        (!brand || p.brand === brand) &&
        (!size || p.size === size)
      );
    })
    .map((product) => {
      const productPrice = productPrices.find(
        (pp) => pp.productId === product.id
      );
      return { ...product, price: productPrice?.price };
    });
  res.json(result);
};

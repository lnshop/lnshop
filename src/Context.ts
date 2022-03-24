import { createContext, useContext } from 'react';

type LineItem = [Product, number];
export type Cart = [LineItem] | [];
export interface CartContextType {
  // set the type of state to be handled with context
  cart: Cart,
  setCart: (cart: Cart) => void,
  addToCart: (product: Product, cart: Cart) => void,
  removeFromCart: (product: Product, cart: Cart) => void
}

export const CartContext = createContext<CartContextType>(
  {
    cart: [] as Cart, 
    setCart:(cart: Cart) => {return null;}, 
    addToCart:(x:Product,y:Cart)=>{return null;},
    removeFromCart:(x:Product,y:Cart)=>{return null;}
  }
);
export const useCart = () => useContext(CartContext);

export interface Product {
  img: string,
  name: string,
  price: string,
  sku?: string,
  category?: string,
  inventory: number,
}
export type Products = [Product] | [];

export interface ProductsContextType {
  // set the type of state to be handled with context
  products: Products,
  setProducts: (products: Products) => void,
  getProducts: () => void
}

export const ProductsContext = createContext<ProductsContextType>(
  {
    products: [] as Products, 
    setProducts:(products: Products) => {return null;}, 
    getProducts:()=>null
  }
);
export const useProducts = () => useContext(ProductsContext);

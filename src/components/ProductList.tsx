import React, {FC} from 'react';
import ProductCard from './ProductCard';
import classes from "./ProductList.module.scss";
import { Product, useProducts } from '../Context';

export const ProductList: FC = () => {
  const {products} = useProducts();
  return (
    <div className="App">
      <div className={classes.columns}>
        {
          products && products.length>0 && products.map((product:Product)=>
          <div className={classes.column} key={product.sku}> 
            <ProductCard  product={product} />
            </div>)
        }
      </div>
    </div>
  );
}

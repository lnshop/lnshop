import PropTypes from 'prop-types'
import classes from "./ProductCard.module.scss";
import {useCart, Product} from '../Context'

const ProductCard = (props: any) => {
  const { cart, addToCart } = useCart();
  function add(product:Product) {
    addToCart(product, cart)
    console.log('You added '+ product.name + ' to the cart.');
  }
  return (
    <div className={classes.card}>
        <img src={props.product.img} alt="product" />
        <div className={classes.cardHeader}>
          <span className={classes.title}>{props.product.name}</span>
          <p className={classes.price}>{props.product.price} Sats</p>
        </div>
        <button onClick={(e) => add(props.product)}>Add to Cart</button>
    </div>
  )
}

ProductCard.propTypes = {
  product:PropTypes.any
}

export default ProductCard

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
        <h2>{props.product.name}</h2>
        <p className={classes.price}>{props.product.price} Sats</p>
        <p>Take this pet home with you today.</p>
        <p><button onClick={(e) => add(props.product)}>Add to Cart</button></p>
    </div>
  )
}

ProductCard.propTypes = {
  product:PropTypes.any
}

export default ProductCard
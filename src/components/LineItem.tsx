import React from 'react'
import PropTypes from 'prop-types'
import classes from './LineItem.module.scss';
import {useCart, Product} from '../Context'

const LineItem = (props: any) => {
    const { cart, addToCart, removeFromCart } = useCart();
    function add(product:Product) {
        addToCart(product, cart)
        console.log('You added '+ product.name + ' to the cart.');
    }
    function remove(product:Product) {
        removeFromCart(product, cart)
        console.log('You removed '+ product.name + ' from the cart.');
    }
    const prod:Product = props.lineItem[0];
    const qnty:number = props.lineItem[1];
    return (
        <div className={classes.CartItems}>
            <div className={classes.imagebox}>
                <img alt={prod.name} src={prod.img}/>
            </div>
            <div className={classes.about}>
                <h2 className={classes.title}>{prod.name}</h2>

            </div>
            <div className={classes.counter}>
                <div className={classes.btn} onClick={(e) => add(prod)}>+</div>
                <div className={classes.count}>{qnty}</div>
                <div className={classes.btn} onClick={(e) => remove(prod)}>-</div>
            </div>
            <div className={classes.prices}>
                <div className={classes.amount}>{prod.price} Sats</div>
            </div>
        </div>
    )
}

LineItem.propTypes = {
    lineItem:PropTypes.any
}

export default LineItem
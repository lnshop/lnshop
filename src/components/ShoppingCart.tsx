import PropTypes from 'prop-types'
import {useCart, Product} from '../Context'
import classes from './ShoppingCart.module.scss'
import LineItem from './LineItem'
import { useNavigate } from "react-router-dom";


const ShoppingCart = (props: any) => {
    const { cart, setCart } = useCart();
    let subtotal = 0;
    let itemCount = 0;
    const navigate = useNavigate();

    function removeAll() {
    setCart([]);
    console.log('You emptied the cart.');
    }

    function checkout() {
        if(itemCount>0){
            navigate("/ln-invoice");
        } else {
            alert('Please Add an item to the cart before checkout!');
        }
    }

    cart && cart.length>0 && cart.map((li:[Product,number]) => {
        itemCount += li[1];
        subtotal += li[1] * parseInt(li[0].price)
        return null;
    })

    return (
            <div className={classes.CartContainer}>
                <div className={classes.Header } onClick={(e) => removeAll()}>
                    <h5 className={classes.Action} >Remove all?</h5>
                </div>

                {
                cart && cart.length>0 && cart.map((li:[Product,number])=>
                <div className={classes.column} key={li[0].sku}> 
                    <LineItem lineItem={li} />
                    </div>)
                }
                
                
                <hr /> 
                <div className={classes.checkout}>
                    <div className={classes.total}>
                        <div>
                            <div className={classes.Subtotal}>Sub-Total</div>
                            <div className={classes.items}>{itemCount} items</div>
                        </div>
                        <div className={classes.totalamount}>{subtotal} Sats</div>
                    </div>
                    <button className={classes.button} onClick={(e) => checkout()}>Pay with Lightning⚡️</button>
                </div>
            </div>
  )
}
ShoppingCart.propTypes = {
    product:PropTypes.any
}
export default ShoppingCart
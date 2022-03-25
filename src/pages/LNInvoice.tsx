import React, { useEffect, useRef } from "react";
import LNPayment from "../components/LNPayment";
import classes from "../styles/invoice.module.scss";
import {useCart, Product} from '../Context';
import { requestInvoice } from 'lnurl-pay';
import { Satoshis } from "lnurl-pay/dist/types/types";
import shock from "./shock.gif";
import { useNavigate } from "react-router-dom";


const LNInvoice = () => {
    const [invoiceCode, setInvoice] = React.useState('');
    const [paymentHash, setPaymentHash] = React.useState('');
    const { cart } = useCart();
    let subtotal = 0;
    let reciept:Record<any,any>  = {};
    let webLNBrowser:boolean = true;
    const navigate = useNavigate();

    cart && cart.length>0 && cart.map((li:[Product,number]) => {

        reciept[li[0].name]+=li[0].price;
        subtotal += li[1] * parseInt(li[0].price)
        return null;
    })

    let stopPolling = false;
    //const shouldStopPolling = () => stopPolling;

    const getInvoice = async ()=>{
      const { invoice, params, successAction, validatePreimage } =
          await requestInvoice({
            lnUrlOrAddress: 'alivesession77@walletofsatoshi.com',//'frazras@pay.bitcoinjungle.app',
            tokens: subtotal as Satoshis
          });
       if ((window as any).webln) {
          await (window as any).webln.enable();
      
          const payResponse = await (window as any).webln.sendPayment(invoice);
      
          (document as any).getElementById("preimage").innerHTML = payResponse.preimage;
      
          if (validatePreimage(payResponse.preimage)) {
            navigate("/success");
          } else {
            alert("fail");
          }
        } else {
          console.log("No Webln");
          webLNBrowser = false;
          setInvoice(invoice);
        }
          
        
    }

      useEffect(()=>{
        getInvoice();
      },[invoiceCode])

      function useDidUpdateEffect(fnk:any, inputs:any) {
        const didMountRef = useRef(false);
      
        useEffect(() => {
          if (didMountRef.current) { 
            return fnk();
          }
          didMountRef.current = true;
        }, [inputs]);
      }

    return <div className={classes.lnInvoice}>
        <h1>Processing Lightning ⚡️ Payment</h1>
        {webLNBrowser && <img src={shock} alt="lightning bolts" />}
        {!webLNBrowser &&  <><h2>Scan the QR Code to Pay.</h2> <LNPayment invoice={invoiceCode}/>
        <h2>Or Copy the Invoice Below</h2>
        <p>{invoiceCode}</p></>}
        <input type="hidden" id="preimage" />
        <input type="hidden" id="payment-hash" />
        <input type="hidden" id="payment-request" />
        <div id="success"></div>
    </div>;
};

export default LNInvoice;

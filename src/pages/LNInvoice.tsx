import React, { useEffect, useRef } from "react";
import LNPayment from "../components/LNPayment";
import classes from "../styles/invoice.module.scss";
import {useCart, Product} from '../Context'
//import { poll } from 'poll'

const LNInvoice = () => {
    const [invoice, setInvoice] = React.useState('');
    const [paymentHash, setPaymentHash] = React.useState('');
    const { cart } = useCart();
    let subtotal = 0;
    let reciept:Record<any,any>  = {};

    cart && cart.length>0 && cart.map((li:[Product,number]) => {

        reciept[li[0].name]+=li[0].price;
        subtotal += li[1] * parseInt(li[0].price)
        return null;
    })

    let stopPolling = false;
    //const shouldStopPolling = () => stopPolling;

    const getInvoice=()=>{
      fetch('https://cybermart.com.jm/api/v1/payments/',
      {
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Api-Key':'5cc6e1a550ac465597c4d316fe8e08c0'
          },
          body: JSON.stringify(
              {
                  "out": false, 
                  "amount": subtotal, 
                  "memo": Object.values(reciept).join(","), 
                  "webhook": "google.com"
              }),
          method: 'post'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        
        setInvoice(myJson.payment_request);
        setPaymentHash(myJson.payment_hash);
        console.log(myJson);
        return myJson;
      });
    }

      const checkPaid=()=>{
        console.log(invoice);
        console.log(paymentHash);
        console.log("------------");
        fetch('https://cybermart.com.jm/api/v1/payments/'+paymentHash
        ,{
            headers : { 
                //'Content-Type': 'application/json',
                //'Accept': 'application/json',
                'X-Api-Key':'5cc6e1a550ac465597c4d316fe8e08c0'
            }
        }
        )
          .then(function(response){
            return response.json();
          })
          .then(function(myJson) {
           if(myJson.paid){
             alert("Payment is Successful");
             //stopPolling = true;
           }
          });
          return;
      }

      useEffect(()=>{
        getInvoice();
      },[])

      function useDidUpdateEffect(fnk:any, inputs:any) {
        const didMountRef = useRef(false);
      
        useEffect(() => {
          if (didMountRef.current) { 
            return fnk();
          }
          didMountRef.current = true;
        }, [inputs]);
      }

      //useDidUpdateEffect(poll(checkPaid, 2000, shouldStopPolling),[paymentHash])

    return <div className={classes.lnInvoice}>
        <h1>Lightning ⚡️ Invoice</h1>
        <h2>Scan the QR Code to Pay.</h2>
        {invoice && <LNPayment invoice={invoice}/>}
        <h2>Or Copy the Invoice Below</h2>
        <p>{invoice}</p>
        <button onClick={(e) => /* poll(checkPaid, 2000, shouldStopPolling)*/null}>Test</button>
    </div>;
};

export default LNInvoice;

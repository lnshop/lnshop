import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LNInvoice from "./pages/LNInvoice";
import PageTwo from "./pages/PageTwo";
import Success from "./pages/Success";
import PageCTA from "./pages/PageCTA";
import { Cart, CartContext, Product, Products, ProductsContext } from './Context';
import React, { SetStateAction, useEffect } from "react";
import productFile from "./products.json";
import Airtable from 'airtable';

function App() {
    const [cart, setCart] = React.useState([] as Cart);
    const addToCart = (product:Product, cart:Cart) => {
        const newcart = cart.slice();
        let found = false;
        for (let i = 0; i < newcart.length; i++) {
            const li = newcart[i];
            if(li[0] === product) {
                li[1]++;
                found = true;
                break;
            }
        }
        if(!found){
            newcart.push([product,1])
        }
        setCart(newcart as SetStateAction<Cart>);
    }
    const removeFromCart = (product:Product, cart:Cart) => {
        const newcart = cart.slice();
        let remove = 0;
        for (let i = 0; i < newcart.length; i++) {
            const li = newcart[i];
            if(li[0] === product) {
                li[1]--;
                if (li[1] < 1) { 
                    remove = i+1; 
                    break;
                }
            }
        }
        if(remove){
            newcart.splice(remove-1, 1)
        }
        setCart(newcart as SetStateAction<Cart>);
    }
    const [products, setProducts] = React.useState([] as Products     );

    const getProducts=async ()=>{
        console.log("compare below");
        console.log(productFile);
        let pr = await getProductsFromAirtable()
        console.log(pr);
        console.log("compare below");
          setProducts(productFile as SetStateAction<Products>);
    }

    const getProductsFromAirtable=()=>{
        var base = new Airtable({apiKey: 'key2jHRYjdc5tCgYn'}).base('appRJdZDlKqnCx42O');
        let table = [] as any;
        base('Inventory').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
                console.log('Retrieved', record.fields);
                table.push(record.fields);
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        return table;
    }

    
    


    useEffect(()=>{
      getProducts()
    },[])
  
    return (
        <ProductsContext.Provider value={{products, setProducts, getProducts}}>
            <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart}}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ln-invoice" element={<LNInvoice />} />
                        <Route path="/page-two" element={<PageTwo />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/page-cta" element={<PageCTA />} />
                    </Routes>
                </Layout>
            </CartContext.Provider>
        </ProductsContext.Provider>
    );
}

export default App;

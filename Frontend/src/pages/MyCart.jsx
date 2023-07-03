import {Link, Navigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import Header from "../components/Header";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import Footer from '../components/footer';

export default function MyCart ({user}) {

  if (user) {

    user = JSON.parse (user);

    const [product, setProduct] = useState({description : "", id : "", name : "", price : 0});
    const [cart, setCart] = useState ([]);
    const [total, setTotal] = useState (0);
    const [lista, setLista] = useState([]);
    const one = useRef (false);

    function listItems () {
      
    Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        let items = response.data;
        for (let i = 0; i < items.products.length; i ++) {
          Axios.get ("/products/"+ items.products [i])
          .then ((response) => {
            // console.log (response.data)
            let item = response.data;
            setCart ((cart) => [...cart, item]);
            setTotal ((total) => total + parseFloat (item.price));
          })
        }
    });
  }

    useEffect (() => {
      if (one.current) return ;
      one.current = true;
      listItems ();
    }, []);

    function addItem (id) {
      Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        let items = response.data;
        items.products.push (id)
        
        Axios.patch ("/users/" +user.id + "/cart" , items)
        .then (() => {
          window.location.reload ();
        })
      });
    }

    function removeItem (id) {
      Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        let items = response.data;
        items.products.splice (id, 1);
        
        Axios.patch ("/users/" +user.id + "/cart" , items)
        .then (() => {
          window.location.reload ();
        })
      });
    }

    function nav (id) {
      window.location.href = `http://localhost:5173/product?id=${id}`
    }

    function clearCart () {
      Axios.patch ("/users/" +user.id + "/cart" , {})
        .then (() => {
          window.location.reload ();
        })
    }

    function createOrder () {
      Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        if (response.data.products.length > 0) {
          console.log (response.data)
        Axios.post ("/orders/" + response.data.id, {data : {}})
        .then ((response) => {
          window.location.href = `http://localhost:5173/payment?order=${response.data.order_id}`
        })
        .catch (() => {
          Swal.fire({
            icon: "error",
            iconColor:"#ff0000",
            color: "#ffffff",
            title: "<div id = 'opa'> Opa </div>",
            text: "Para que você possa comprar algo verifique se há pelo menos 1 item no seu carrinho",
            footer: "",
            confirmButtonColor:"#ff0000",
            background: "#000000",
            confirmButtonText:"OK!"
      
          })
        })
      } else {
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa </div>",
          text: "Para que você possa comprar algo verifique se há pelo menos 1 item no seu carrinho",
          footer: "",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
    
        })
      }
      });
    }

  return (

    <div data-theme="night" className = "flex flex-col min-h-screen bg-base-100">

        <Header />

        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th> Item </th>
                        <th> Preço </th>
                        <th> Adicionar </th>
                        <th> Remover </th>
                    </tr>
                </thead>
                <tbody id = "body">
                {cart.map ( (cart, key) => (
                      <tr key = {key}>
                      <th className = "link link-success font-aldrich"><button onClick = {() => {nav (cart.id)}}>{cart.name}</button></th>
                      <td className = "font-aldrich"> {cart.price} </td >
                      <td> <button className = "btn btn-outline btn-success font-aldrich" id = {key} onClick = { () => {addItem (cart.id)}}> + </button> </td>
                      <td> <button className = "btn btn-outline btn-error font-aldrich" id = {key} onClick = { () => {removeItem (cart.id)}}> - </button> </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className = "grid grid-cols-2s">
          <div className = "font-aldrich place-self-center"> Total : {total}</div> <br />
          <button className = "btn btn-outline btn-success font-aldrich w-1/4 place-self-center" id = "buy" onClick = {createOrder}> Comprar </button> <br/>
          <button className = "btn btn-outline btn-success font-aldrich w-1/4 place-self-center" onClick = {clearCart}> Limpar carrinho </button>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
    </div>

  );
} else {
  return <Navigate to = "/" replace/>;
}
}
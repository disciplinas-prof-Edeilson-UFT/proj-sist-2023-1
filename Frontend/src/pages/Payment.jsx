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
    const one = useRef (false);
    

    function listItems () {
      Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        let items = response.data;
        Axios.get("/products?search=")
        .then((response) => {
          let allProducts=(response.data);
          for (let i = 0; i < items.products.length; i++) {
            for (let j = 0; j < allProducts.length; j++) {
              let product = allProducts[j];
              let item = items.products[i];
              if (item === product.id) {
                setCart ((cart) => [...cart, product]);
                setTotal ((total) => total + parseFloat (product.price));
              }
            }
          }
      });
    });
    Axios.get ("/users/" +user.id + "/cart")
      .then ((response) => {
        let items = response.data;
        for (let i = 0; i < items.products.length; i++) {
          useEffect(() => {
            Axios.get("/products/"+ID)
              .then((response) => {
                setProduct(response.data);
                setCart ((cart) => [...cart, product]);
                setTotal ((total) => total + parseFloat (product.price));
              });
          }, []);
        }
        
    });
  }

    useEffect (() => {
      if (one.current) return ;
      one.current = true;
      listItems ();
    }, []);

    function nav (id) {
        window.location.href = `http://localhost:5173/product?id=${id}`
    }

    function fatura () {

        let method = null, i;
        let checked = document.getElementsByName ("tipo")

        for (i = 0; i < checked.length; i++) {
            if(checked[i].checked == true){
              method = checked[i].value;
            }
        }

        if (method != null) {

            let parameters = new URLSearchParams (window.location.search);
            let id = parameters.get ("order");

            let data = {
                user_id : user.id,
                order_id : id,
                type : method
            }

            Axios.post ("/invoices" , data)
            .then ((response) => {
                window.location.href = `http://localhost:5173/pay?invoiceId=${response.data.id}&method=${data.type}&total=${response.data.amount}&orderID=${id}`;
            })

        } else {
            Swal.fire({
                icon: "error",
                iconColor:"#ff0000",
                color: "#ffffff",
                title: "<div id = 'opa'> Opa </div>",
                text: "Selecione um método de pagamento",
                footer: "",
                confirmButtonColor:"#ff0000",
                background: "#000000",
                confirmButtonText:"OK!"
          
              })
        }

    }

      return (

        <div data-theme="night">

        <Header />
        <div className = "bg-base-100 flex flex-col min-h-screen">
            <div className="h-screen">
                <div className="flex w-full">
                            <table className="table w-3/4 bg-base-100 shadow-xl overflow-x-auto">
                                        <thead>
                                            <tr>
                                                <th> Item </th>
                                                <th> Preço </th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody id = "body">
                                            {cart.map ( (cart, key) => (
                                            <tr key = {key}>
                                            <th className = "link link-success font-aldrich"><button onClick = {() => {nav (cart.id)}}>{cart.name}</button></th>
                                            <td className = "font-aldrich"> {cart.price} </td >
                                            <td className = "font-aldrich"> {cart.quantity} </td>
                                            </tr>
                                            ))}
                                        </tbody>
                            </table>
                    <div className="divider divider-horizontal"></div>
                    <div className="grid h-full flex-grow card bg-base-100 rounded-box place-items-center">
                        <form>
                            <div className="card w-10/12 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title"> Método de pagamento </h2>
                                    <p> Digite seu endereço e escolha o método de pagamento </p>
                                    <div className="card-actions justify-end">
                                        <div className="dropdown">
                                            <div className = "font-aldrich place-self-center"> Total : {total}</div>
                                            <label tabIndex="0" className="btn btn-outline btn-success mt-5">Pagamento</label>
                                                <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a><input type="radio" id="cartao" name="tipo" value="card" className="radio" />Cartão</a></li>
                                                    <li><a><input type="radio" id="pix" name="tipo" value="pix" className="radio" />Pix</a></li>
                                                    <li><a><input type="radio" id="boleto" name="tipo" value="billet" className="radio" />Boleto</a></li>
                                                    <input type="button" id="botao" value="Ir pagar" className="btn btn-success" onClick = {() => {fatura ()}}/>
                                                </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
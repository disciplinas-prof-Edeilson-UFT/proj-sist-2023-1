import { useEffect, useState } from "react";
import Header from "../components/Header";
import {Link, Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import Footer from '../components/footer';


export default function Pay ({user}) {
    if(user){
        
        
        user=JSON.parse(user);
        const [cards, setCards] = useState ([]);
        let parameters = new URLSearchParams (window.location.search);
        let total = parameters.get ("total");
        
    useEffect(()=>{
        let parameters = new URLSearchParams (window.location.search);
        let method = parameters.get ("method");
        if(method == "pix"){
            document.getElementById("cartao").style.display="none"
            document.getElementById("boleto").style.display="none"
        }else{
            if(method == "billet"){
                document.getElementById("pix").style.display="none"
                document.getElementById("cartao").style.display="none" 
            }else{
                document.getElementById("pix").style.display="none"
                document.getElementById("boleto").style.display="none"
            }
        }
        Axios.get ("/users/"+user.id+"/cards")
            .then ((response) => {
            setCards (response.data);
        })
    },[])
    function pay(){
        let parameters = new URLSearchParams (window.location.search);
        let invoice = parameters.get ("invoiceId");
        Axios.get(`/invoices/${invoice}`)
        .then(()=>{
            Axios.get ("/users/" +user.id + "/cart")
                .then ((response) => {
                  if (response.data.products.length > 0) {
                    let items = response.data;
                    for (let i = 0; i < items.products.length; i ++) {
                      Axios.get ("/products/"+ items.products[i])
                      .then ((response) => {
                        let parameters = new URLSearchParams (window.location.search);
                        let order = parameters.get ("orderID");
                        let invoice = parameters.get ("invoiceId");
                        let data = {
                          order_id : order,
                          user_id : user.id,
                          invoice_id: invoice,
                          product_id: response.data.id,
                          certificate_url : response.data.license_url
                        }
                        console.log("data:",data);
                        Axios.post ("/certificates",data)
                        .then ((response) => {
                          console.log("response:",response);
                        })
                      })
                   
                      
                    }
                }
                }).then (() => {
                    Swal.fire({
                        icon: "success",
                        iconColor:"#00FF7F",
                        color: "#ffffff",
                        title: "<div id = 'success'> Sucesso ! </div>",
                        text: " Compra efetuada com sucesso! ",
                        footer: "",
                        confirmButtonColor:"#00FF7F",
                        background: "#000000",
                        confirmButtonText:"OK!"
                      }).then (() => {
                        Axios.patch ("/users/" +user.id + "/cart" , {})
                        window.location.href="http://localhost:5173/";
                    })
              })
              
        })
    }
    
    return (
        <div>
            <Header/>
            <div id="boleto" className="flex flex-col hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-bold">Pague agora!</h1>
                        <br/>
                        <img src="/boleto.jpg" className="max-w-2xl rounded-lg shadow-2xl" />
                        <br/>
                        <div className = "font-aldrich place-self-center"> Total : {total}</div> <br />
                        <button className="btn btn-primary" onClick={pay}>Pagar</button>
                    </div>
                </div>
            </div>
            <div id="pix" className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="/QRcode.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Pague agora!</h1>
                        <p className="py-6">00020126460014br.gov.bcb.pix0111030427171350209Alfandega52040000530398654041.005802BR5925JOAO GABRIEL ALVES DE SOU6006PALMAS62290525HDj18obIv5O7vgEK4cG47qG4L6304509A</p>
                        <div className = "font-aldrich place-self-center"> Total : {total}</div><br/>
                        <button className="btn btn-primary" onClick={pay}>Pagar</button>
                    </div>
                </div>
            </div>
            <div id="cartao">
                <br/>
                <div className = "grid grid-cols-2s">
                    <div className = "font-aldrich place-self-center"> Total : {total}</div> <br />
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th className = "font-aldrich" > Titular </th>
                                <th className = "font-aldrich" > Últimos números do cartão </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                            {cards.map ((cards, key) => (
                                <tr key = {key}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="https://www.kidsecia.com.br/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/4/_/4_2_14.jpg" alt = "cartão" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className = "font-bold font-aldrich" > {cards.owner_name} </div>
                                                <div className = "text-sm opacity-50 font-aldrich" > {cards.expiration_date} </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className = "font-aldrich" >
                                            {cards.card_number}
                                            <br/>
                                        </td>
                                        <th>
                                            <button className = "btn btn-outline btn-success btn-xl font-aldrich" onClick={pay}> Pagar com este cartão </button>
                                        </th>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="mt-auto">
          <Footer />
        </div>
        </div>
    );
}else{return <Navigate to = "/" replace/>;}}
import {Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../components/Header";
import Axios from "../api/Api";
import Footer from '../components/footer';

export default function Wallet ({user}) {

    if (user) {

        user = JSON.parse (user);

        const [cards, setCards] = useState ([]);
        useEffect (() => {
            Axios.get ("/users/"+user.id+"/cards")
            .then ((response) => {
            setCards (response.data);
            })
        }, []);

        function deleteCard (id) {
            Axios.delete ("/cards/"+id , {data: {}})
            .then (() => {
                window.location.reload ();
            })
        }

        function updateCard (id) {
            window.location.href = `/updatecard/?id=${id}`;
        }

        return (
            <div>

                <Header />

                <div className="flex flex-col min-h-screen overflow-x-auto w-full relative">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th className = "font-aldrich" > Titular </th>
                                <th className = "font-aldrich" > Últimos números do cartão </th>
                                <th> </th>
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
                                            <button className = "btn btn-outline btn-success btn-xl font-aldrich" onClick = {() => {updateCard (cards.id)}}> Editar cartão </button>
                                        </th>
                                        <th>
                                            <button onClick={() => {deleteCard (cards.id)}} className = "btn btn-outline btn-error btn-xl font-aldrich"> Remover cartão </button>
                                        </th>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                </div>
                <div className = "grid grid-cols-2s">
                <Link to = "/addcard" className = "btn btn-outline btn-success font-aldrich w-1/4 place-self-center mt-20"> <button id = "buy"> Adicionar cartão  </button> </Link>
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
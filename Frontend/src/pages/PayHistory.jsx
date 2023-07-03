import {Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../components/Header"
import Footer from '../components/footer';
import Axios from "../api/Api";
import Button from "../components/button";


export default function PayHistory ({user}) {

    if (user) {
        
        user = JSON.parse (user);
        const [history, setHistory] = useState ([]);
        useEffect (() => {
            Axios.get ("/users/"+user.id+"/invoices")
            .then ((response) => {
            setHistory (response.data);
            })
        }, []);
        function nav(key){
            window.location.href = `http://localhost:5173/pay?invoiceId=${history[key].id}&method=${history[key].type}&total=${history[key].amount}&orderID=${history[key].order_id}`;
        }
        return (
            <div>

                <Header />

                <div className="flex flex-col min-h-screen overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th className = "font-aldrich" > Data </th>
                                <th className = "font-aldrich" > Número da Transação </th>
                                <th className = "font-aldrich" > Valor </th>
                                <th className = "font-aldrich" > Status da Transação </th>
                                <th className = "font-aldrich" > Método de Pagamento </th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                        {history.map ((history, key) => (
                            <tr key = {key}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className = "font-aldrich" > {history.created_at} </div>
                                        </div>
                                    </div>
                                </td>
                                <td className = "font-aldrich" >
                                    {history.id}
                                    <br/>
                                </td>
                                <td className = "font-aldrich" >
                                    R$ {history.amount}
                                    <br/>
                                </td>
                                <td className = "font-aldrich" >
                                    {history.status}
                                    <br/>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className = "font-aldrich" > {history.type} </div>
                                            <div className = "text-sm opacity-50 font-aldrich" > Número: {history.card_id} </div>
                                        </div>
                                    </div>
                                </td>
                                
                                    <td className={history.status == "created"?"":"hidden"}>
                                        <Button string='Efetuar pagamento' funcao={()=>{nav(key)}} />
                                    </td>
                                 
                            </tr>
                            
                             ))}
                        </tbody>

                    </table>
                </div>
                <div className="mt-auto">
                <Footer />
               </div>
            </div>
        );
    } else {
        return <Navigate to = "/" replace/>;
    }
};



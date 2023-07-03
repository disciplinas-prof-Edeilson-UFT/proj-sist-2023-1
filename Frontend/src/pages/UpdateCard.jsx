import {Navigate} from "react-router-dom";
import Axios from "../api/Api";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import * as Yup from "yup";
import Footer from '../components/footer';

export default function UpdateCard ({user}) {
  const [cards, setCards] = useState ([]);
  Axios.get ("/users/"+user.id+"/cards")
  .then ((response) => {
    setCards (response.data.length != 0);
  })


  if (user && cards) {

  async function UpdateCard (event) {

    event.preventDefault (event);

    let data = {
      owner_name: document.querySelector ("#owner").value,
	    card_number: document.querySelector ("#card").value,
	    expiration_date: document.querySelector ("#date").value
    };


    let validation = Yup.object().shape ({
      owner_name: Yup.string().required().min(10).max(80),
	    card_number: Yup.string().required().max(20).min(20),
	    expiration_date: Yup.string().required()
    });

    validation.validate (data).then (() => {

      let parameters = new URLSearchParams (window.location.search);
      let id = parameters.get ("id");

      Axios.patch ("/cards/" + id, data)
    .then(() =>{
      Swal.fire({
        icon: "success",
        iconColor:"#00FF7F",
        color: "#ffffff",
        title: "<div id = 'success'> Sucesso ! </div>",
        text: "Cartão atualizado",
        footer: "Os dados do seu cartão foram atualizados.",
        confirmButtonColor:"#00FF7F",
        background: "#000000",
        confirmButtonText:"<a href = '/wallet'> OK </a>!"
  
      })
      .then (() => {
        window.location.href = "http://localhost:5173/wallet";
      })
    })})
    .catch(() => {
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "<div id = 'opa'> Opa </div>",
        text: "Não conseguimos atualizar seu cartão!",
        footer: "Verifique se todos os campos foram preenchidos. O número do cartão deve ter exatos 20 caracteres, o nome do titular deve estar completo ou ter no máximo 80 caracteres. Pode ser que você ainda nem tenha cadastrado um cartão, caso isso ocorra primeiro adicione um ! ",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
      })
    });

  }


  return (

      <div data-theme="night" className = "flex flex-col min-h-screen w-screen h-screen bg-base-100">

        <Header />

        <div className = "grid place-items-center">

          <form onSubmit= {UpdateCard} className = "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

            <div className="card flex-shrink-0 w-full max-w-sm">
              <div className="card-body">
                <p className="text-4xl font-bold font-aldrich text-white"> Atualizar Cartão </p>
                <div className="form-control">
                  <label className="label">
                    <span className="text-primary label-text"> Número do cartão : </span>
                  </label>
                  <input type="number" placeholder="Número do cartão" className="input input-bordered w-full max-w-xs font-aldrich" id = "card"/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-primary label-text"> Nome do titular : </span>
                  </label>
                  <input type="text" placeholder="Nome do titular" className="input input-bordered w-full max-w-xs font-aldrich" id = "owner"/>
                </div>
                <div className="form-control">
                    <label className="label">
                      <span className="text-primary label-text"> Data de validade : </span>
                    </label>
                    <input type="month" className="input input-bordered w-full max-w-xs font-aldrich" id = "date"/>
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" value = "Atualizar meu cartão" className="btn btn-primary font-aldrich" />
                </div>
              </div>
            </div>

          </form>
          
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
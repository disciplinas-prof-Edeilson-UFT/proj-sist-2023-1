import {Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import Header from "../components/Header";
import * as Yup from "yup";
import Footer from '../components/footer';

export default function MyCard ({user}) {

  if (user) {

    async function AttCard (event) {

      user = JSON.parse (user);

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

        Axios.post ("/users/"+user.id+"/cards", data)
      .then(() =>{
        Swal.fire({
          icon: "success",
          iconColor:"#00FF7F",
          color: "#ffffff",
          title: "<div id = 'success'> Sucesso ! </div>",
          text: "Cartão atualizado",
          footer: "O cartão foi adicionado . ",
          confirmButtonColor:"#00FF7F",
          background: "#000000",
          confirmButtonText:"OK!"
    
        })
        .then (() => {
          window.location.href = "http://localhost:5173/wallet";
        })
      })
      .catch(() =>{
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa </div>",
          text: "Não conseguimos adicionar seu cartão!",
          footer: "Verifique se ele já não foi usado ou se há um campo em branco.",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
        })
      });
      }).catch(() => {
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa </div>",
          text: "Não conseguimos adicionar seu cartão!",
          footer: "Verifique se todos os campos forma preenchidos. O número do cartão deve ter exatos 20 caracteres, o nome do titular deve estar completo ou ter no máximo 80 caracteres.",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
    
        })
      });

    }

  return (

      <div data-theme="night" className = "flex flex-col min-h-screen w-screen h-screen bg-base-100">

        <Header />

        <div className = "grid place-items-center mt-10">

          <form onSubmit= {AttCard} className = "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

            <div className="card flex-shrink-0 w-full max-w-sm">
              <div className="card-body">
                <p className="text-4xl font-bold font-aldrich text-white"> Adicionar Cartão </p>
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
                  <input type = "submit" value = "Adicionar meu cartão" className="btn btn-primary font-aldrich" />
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
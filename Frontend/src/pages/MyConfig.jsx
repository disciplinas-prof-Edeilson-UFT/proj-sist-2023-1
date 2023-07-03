import {Link, Navigate} from "react-router-dom";
import {useEffect} from "react";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import Header from "../components/Header";
import * as Yup from "yup";
import Footer from '../components/footer';

export default function MyConfig ({user}) {

  if (user) {

    user = JSON.parse (user);

    useEffect (() => {
      document.querySelector ("#first").value = user.first_name;
	    document.querySelector ("#last").value = user.last_name;
	    document.querySelector ("#email").value = user.email;
    }, []);

  async function AttUser (event) {

    event.preventDefault (event);

    let data = {
      first_name: document.querySelector ("#first").value,
	    last_name: document.querySelector ("#last").value,
	    email: document.querySelector ("#email").value
    }

    let validation = Yup.object().shape({
      first_name: Yup.string().required().min(1).max(30),
	    last_name: Yup.string().required().min(1).max(30),
	    email: Yup.string().email().required()
    });

    validation.validate (data).then (() => {
      Axios.patch ("/users/"+user.id, data)
    .then(() =>{
      localStorage.setItem("userData", JSON.stringify ({
        email: document.querySelector ("#email").value,
        first_name: document.querySelector ("#first").value,
        id: user.id,
        isVerified: user.isVerified,
        last_name: document.querySelector ("#last").value
      }));
      Swal.fire({
        icon: "success",
        iconColor:"#00FF7F",
        color: "#ffffff",
        title: "Ok",
        text: "Dados atualizados",
        footer: "",
        confirmButtonColor:"#00FF7F",
        background: "#000000",
        confirmButtonText:"OK!"
        })
        .then (() => {
          window.location.reload();
        })
    })
    .catch(() =>{
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "<div id = 'opa'> Opa </div>",
        text: "Não conseguimos atualizar seus dados!",
        footer: "Verifique se há um campo em branco ou algo digitado de forma incorreta.",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
  
      })
    });
    }).catch (() => {
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "<div id = 'opa'> Opa </div>",
        text: "Não conseguimos atualizar seus dados!",
        footer: "Verifique se há um campo em branco ou algo digitado de forma incorreta. O nome e sobrenome devem ter no máximo 30 carateres.",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
  
      })
    });

  }

  return (

      <div data-theme="night" className = "flex flex-col min-h-screen w-screen h-screen bg-base-100">

        <Header />

        <div className = "grid place-items-center mt-5">

          <form onSubmit= {AttUser} className = "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

            <div className="container mx-auto p-4 py-8 pb-1 card  max-w-5xl  shadow-2xl bg-base-300">
              <div className="card-body">
                <p className="text-4xl font-bold font-aldrich text-white"> Seus dados : </p>
                <div className="form-control">
                  <label className="label">
                    <span className="text-primary label-text"> Nome : </span>
                  </label>
                  <input type="text" placeholder = "nome" className="input input-bordered w-full font-aldrich" id = "first"/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-primary label-text"> Sobrenome : </span>
                  </label>
                  <input type="text" placeholder = "sobrenome" className="input input-bordered w-full max-w-xs font-aldrich" id = "last"/>
                </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-primary label-text"> Email : </span>
                    </label>
                    <input type="email" placeholder = "email" className="input input-bordered w-full max-w-xs font-aldrich" id = "email"/>
                </div>
                <div className="form-control mt-6">
                  <input type = "submit" value = "Atualizar meus dados" className="btn btn-success font-aldrich" id = "attData"/>
                </div>
                <div className="form-control mt-6">
                  <Link to = "/retrieve" className = "btn btn-success font-aldrich"><button> Alterar senha </button></Link>
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
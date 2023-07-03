import {Link, Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import  * as Yup from "yup";
import Cookies from "js-cookie";

export default function Login ({user}) {

  if (!user) {

    async function Login (event) {

      event.preventDefault();

      let data = {
        email: document.querySelector ("#email").value, 
        password: document.querySelector ("#password").value
      }

      let validation = Yup.object ().shape ({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8)
      });

      validation.validate (data).then ( () => {

        Axios.post ("/authentication/signin", data)
        .then((response) => {
          Cookies.set ("userData" , JSON.stringify (response.data), {expires : 1});
          window.location = "/";
      })
        .catch(() =>{
          Swal.fire({
            icon: "error",
            iconColor:"#ff0000",
            color: "#ffffff",
            title: "<div id = 'opa'> Opa </div>",
            text: "Seu Email ou senha estão errados!",
            footer: "Tente digitar novamente, caso não tenha cadastro, clique em 'Não tem conta?'",
            confirmButtonColor:"#ff0000",
            background: "#000000",
            confirmButtonText:"OK!"
      
          })
        })
      }).catch (() => {
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa </div>",
          text: "Seu Email ou senha estão errados! Lembre-se que as senhas tem no mínimo 8 caracteres",
          footer: "Tente digitar novamente, caso não tenha cadastro, clique em Não tem conta?",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
    
        })
      });
    }
  
  return (
          
        <div data-theme="night" className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl font-bold font-aldrich text-white">Li-sense</h1>
              <p className="py-6 font-aldrich text-white">Novas idéias precisam de proteção, afinal, pirataria anda na velocidade da luz</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <form method = "POST" onSubmit= {Login}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" id = "email" name = "email"/>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Senha</span>
                    </label>
                    <input type="password" placeholder="senha" className="input input-bordered" id = "password" name = "password"/>
                    <label className="label">
                      <Link to = "/retrieve" className="label-text-alt link link-hover font-aldrich text-primary-focus">Esqueceu sua senha?</Link>
                      <Link to = "/signup" className="label-text-alt link link-hover font-aldrich text-primary-focus">Não tem conta?</Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" value = "Login" className="btn btn-outline btn-primary text-primary-focus" id = "Login"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
    );
  } else {
    return <Navigate to = "/" replace/>;
  }
}
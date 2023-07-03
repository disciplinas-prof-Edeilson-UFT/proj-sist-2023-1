import {Link, Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function SignUp({user}) {

  if (!user) {

  async function SignUp (event) {

    event.preventDefault();

    document.getElementById ("button").disabled = true;

    let data = {
      first_name: document.querySelector ("#first").value,
      last_name: document.querySelector ("#last").value,
      email: document.querySelector ("#email").value, 
      password: document.querySelector ("#password").value
    }

    let validation = Yup.object().shape({
      first_name: Yup.string().required().max(20).min(1),
      last_name: Yup.string().required().max(30).min(1),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required()
    })

    validation.validate (data).then ( () => {
  
      Axios.post ("/authentication/signup", data)
      .then(() =>{
        Axios.post ("/authentication/email", {email: document.querySelector ("#email").value});
        Swal.fire({
          icon: "success",
          iconColor:"#00FF7F",
          color: "#ffffff",
          title: "Conta criada",
          text: "Clique em ok para ir para a tela de login.",
          footer: "",
          confirmButtonColor:"#00FF7F",
          background: "#000000",
          confirmButtonText:"OK!"
          })
          .then (() => {
            window.location.href = "/login"
          })
      })
      .catch(() =>{
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "Opa",
          text: "Esse email já foi utilizado!",
          footer: "Tente digitar outro email. Caso você queira recuperar uma conta clique em 'recuperar conta'.",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
        })
        .then (() => {
          document.getElementById ("button").disabled = false;
        })
      })
    }).catch (() => {
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "Opa",
        text: "Digite credenciais válidas !",
        footer: "Nome e sobrenome devem ter no máximo 30 caracteres e no mínimo 1, a senha deve ter pelo menos 8 caracteres e todos os campos devem estar preenchidos!",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
  
      })
    });}

    return (
  
      <div data-theme="night">
          
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
              <div className="text-6xl font-bold font-aldrich text-white">Li-sense</div>
                <span className="label-text font-aldrich text-white">Vamos começar a aventura, e nela você está com a defesa máxima !</span>
                <form method = "POST" onSubmit= {SignUp}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Primeiro Nome</span>
                    </label>
                    <input type="text" placeholder="primeiro nome" className="input input-bordered" id="first" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Segundo Nome</span>
                    </label>
                    <input type="text" placeholder="segundo nome" className="input input-bordered" id="last" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" id="email" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Senha</span>
                    </label>
                    <input type="password" placeholder="senha" className="input input-bordered" id="password" />
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" id = "button" value = "Criar conta" className="btn btn-outline btn-primary text-primary-focus" />
                  </div>
                </form>
                <Link to = "/retrieve" className="label-text-alt link link-hover font-aldrich text-primary-focus">Recuperar conta</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
  
    );
  } else {
    return <Navigate to = "/" replace/>;
  }
  }
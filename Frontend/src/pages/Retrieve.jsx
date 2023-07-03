import {Link} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function Retrieve() {

  async function Retrieve (event) {

    event.preventDefault();

    let data = {email: document.querySelector ("#email").value};
    document.getElementById ("button").disabled = true;

    let validation = Yup.object().shape({
      email: Yup.string().email().required()
    });

    validation.validate (data).then (() => {
      Axios.post ("/authentication/email/recovery", data)
      .then(() =>{
        Swal.fire({
        icon: "success",
        iconColor:"#00FF7F",
        color: "#ffffff",
        title: "Ok",
        text: "Email de recuperação enviado",
        footer: "Enviaremos no email que foi digitado. Verifique a caixa de entrada ou spam do email que foi digitado.",
        confirmButtonColor:"#00FF7F",
        background: "#000000",
        confirmButtonText:"OK!"
        })
        .then (() => {
          window.location.reload ();
        })
      })
    }).catch (() => {
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "Opa",
        text: "Esse email está errado!",
        footer: "Tente digitar outro email, ou verifique se o email digitado está certo ou realmente foi cadastrado.",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
      });
      document.getElementById ("button").disabled = false;
    });
    
  }

    return (
  
      <div data-theme="night">

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="text-6xl font-bold font-aldrich text-center text-white">Li-sense</div>
                <span className="label-text font-aldrich text-white">Digite seu email abaixo para que você possa recuperara a sua conta. Após isso, verifique seu email.</span>
                <form method = "POST" onSubmit= {Retrieve}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" id = "email"/>
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" id = "button" value = "Recuperar" className="btn btn-outline btn-primary text-primary-focus" />
                  </div>
                </form>
                <Link to = "/login" className="label-text-alt link link-hover font-aldrich text-primary-focus">Já tem conta ?</Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  
    );
  }
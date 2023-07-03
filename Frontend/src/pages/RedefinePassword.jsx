import {Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function RedefinePassword() {


  async function Redefine (event) {

    event.preventDefault();

    let data = {
      email: document.querySelector ("#email").value, 
      password: document.querySelector ("#password").value
    }

    let validation = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required()
    })

    validation.validate (data).then ( () => {
  
      Axios.post ("/authentication/recovery", data)
      .then(() =>{
        Swal.fire({
            icon: "success",
            iconColor:"#00FF7F",
            color: "#ffffff",
            title: "Ok",
            text: "Senha atualizada",
            footer: "",
            confirmButtonColor:"#00FF7F",
            background: "#000000",
            confirmButtonText:"<a href = '/'> OK! </a>"
            })
      })
      .catch(() =>{
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "Opa",
          text: "Usuário não encontrado!",
          footer: "Verifique se o email foi digitado corretamente",
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
        title: "Opa",
        text: "Digite credenciais válidas !",
        footer: "Todos os campos devem estar preenchidos. Verifique se o email foi digitado corretamente e a senha tem mais de oito caracteres",
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
              <div className="text-6xl font-bold font-aldrich text-white"> Li-sense </div>
                <span className="label-text font-aldrich text-white"> Que bom que você vai conseguir recuperar sua conta ! </span>
                <form method = "POST" onSubmit= {Redefine}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary"> Email </span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" id="email" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary"> Senha </span>
                    </label>
                    <input type="password" placeholder="senha" className="input input-bordered" id="password" />
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" value = "Redefinir senha" className="btn btn-outline btn-success text-primary-focus" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
  
    );
  }
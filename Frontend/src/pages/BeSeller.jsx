import {Link, Navigate} from "react-router-dom";
import Axios from "../api/Api";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Footer from '../components/footer';

export default function BeSeller({user}) {

  let userSeller = JSON.parse (user);

  if (user && userSeller.is_seller == false) {

  async function BeSeller (event) {

    event.preventDefault();

    let data = {
      social_name: document.querySelector ("#social").value,
      user_document: document.querySelector ("#document").value,
      document_type: document.querySelector ("#type").value
    }

    let validation = Yup.object().shape({
      social_name: Yup.string().required().max(20).min(1),
      user_document: Yup.string().required().max(14).min(11),
      document_type: Yup.string().required()
    })

    validation.validate (data).then ( () => {
      user=JSON.parse(user);
      Axios.post ("/users/" + user.id + "/seller" , data)
      .then (() => {
        Swal.fire({
          icon: "success",
          iconColor:"#00FF7F",
          color: "#ffffff",
          title: "<div id = 'ok'> Ok </div>",
          text: "Você agora é um vendedor ! ",
          footer: "Agora você pode vender seus produtos na nossa loja ! ",
          confirmButtonColor:"#00FF7F",
          background: "#000000",
          confirmButtonText:"OK!"
          })
          .then (() => {
            user.is_seller = true;
            user.document_type = data.document_type;
            user.social_name = data.social_name;
            user.user_document = data.user_document;
            Cookies.set("userData",JSON.stringify (user),{expires:1});
            window.location.href = "/"
          })
      })
      .catch (() => {
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa ! </div>",
          text: "Verifique se você não digitou nada errado . ",
          footer: "",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
          });
      })
    })
    .catch (() => {
        Swal.fire({
          icon: "error",
          iconColor:"#ff0000",
          color: "#ffffff",
          title: "<div id = 'opa'> Opa ! </div>",
          text: "Verifique se você não digitou nada errado . ",
          footer: "Nunhem campo deve estar em branco, o nome social deve ter no máximo 20 caracteres e o cpf/cnpj deve ter no mínimo 11 e no máximo 14 caracteres . ",
          confirmButtonColor:"#ff0000",
          background: "#000000",
          confirmButtonText:"OK!"
          });
    })
}

    return (
  
      <div >
          
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
              <div className="text-6xl font-bold font-aldrich text-white">Li-sense</div>
                <span className="label-text font-aldrich text-white">Se aventure conosco!</span>
                <form method = "POST" onSubmit= {BeSeller}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">Razão Social</span>
                    </label>
                    <input type="text" placeholder="razão social" className="input input-bordered" id="social" />
                  </div>
                  <div className="form-control">
                    <label className="label" form="cpf">
                      <span className="label-text font-aldrich text-primary">Selecione um para informar:</span>
                    </label> 
                      <select name="type" id="type" form="cpfform" className="input input-bordered">
                        <option value="cpf">CPF</option>
                        <option value="cnpj">CNPJ</option>
                      </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary">CPF ou CNPJ</span>
                    </label>
                    <input type="number_format" className="input input-bordered"  pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"  placeholder="cpf ou cnpj" id="document"></input>
                  </div>
                  <div className="form-control mt-6">
                  <input type = "submit" value = "Tornar-se Vendedor" className="btn btn-outline btn-primary text-primary-focus" />
                  </div>
                </form>
                <Link to = "/" className="label-text-alt link link-hover font-aldrich text-primary-focus">Voltar</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  
    );
  } else {
    return <Navigate to = "/" replace/>;
  }
  }
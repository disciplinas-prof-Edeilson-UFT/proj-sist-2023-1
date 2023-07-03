import {Link} from "react-router-dom";
import Axios from "../api/Api";

export default function VerifyEmail() {

  let parameters = new URLSearchParams (window.location.search);
  let email = parameters.get ("email");

  Axios.get(`/authentication/email?email=${email}`)
  .then ((response) => {
    console.log (response.data);
    console.log (email);
  }) 

  return (
          
    <div data-theme="night" className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <div className="text-6xl font-bold font-aldrich text-white"> Li-sense </div>
        <p className="py-6 font-aldrich text-white text-center "> Email verificado </p>
        <p className="label-text-alt link link-hover font-aldrich text-primary-focus text-center"><Link to = "/"> Voltar para página principal </Link></p>
      </div>
    </div>
  </div>
  
    );
  }
import {Navigate} from 'react-router-dom';
import Header from '../components/Header';
import Axios from "../api/Api";
import * as Yup from "yup";
import { Web3Storage } from 'web3.storage';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Footer from '../components/footer';

export default function AddProduct({user}) {

  let userSeller = JSON.parse (user);

  if (user && userSeller.is_seller == true) {
  
  user = JSON.parse(user);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    Axios.get("/categories")
    .then((response)=>{
      setCategories(response.data)
    })
  },[])
      
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  async function newCategory(){
    let data = {
      name: document.querySelector("#info-category").value
    };
    let validation = Yup.object().shape({
      name: Yup.string().required().max(20).min(2)
    });
    validation.validate(data) .then (() => {
      Axios.post("/categories", data)
        .then((response) =>{
          Swal.fire({
            icon: "success",
            iconColor:"#00FF7F",
            color: "#ffffff",
            title: "<div id = 'success'> Sucesso ! </div>",
            text: " Item adicionado ",
            footer: "Clique em ok para prosseguir",
            confirmButtonColor:"#00FF7F",
            background: "#000000",
            confirmButtonText:"OK!"
          });
          window.location.reload();
        })
      })
  }
  
  async function addProduct (event) {

    event.preventDefault (event);

    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4"});
    const fileInput = document.getElementById ("imageInput")
    const certification = document.getElementById ("CertificationInput")

    let checked = document.getElementsByName('categoria');
    let valor = [];

    document.getElementById ("button").disabled = true;

    for (let i = 0; i < checked.length; i++) {
      if(checked[i].checked == true){
        valor.push(checked[i].value);
      }
    }

    let checkboxes = document.getElementsByName('tipo');
    let values;
    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked == true){
        values = checkboxes[i].value;
      }
    }

    let data = {
      description: document.querySelector("#info").value,
      name: document.querySelector("#name").value,
      price: Number(document.querySelector("#price").value),
      photo: await client.put (fileInput.files),
      license_url: await client.put(certification.files),
      categories: valor,
      type: values
    };
    let validation = Yup.object().shape({
      description: Yup.string().required().max(500).min(1),
      name: Yup.string().required().max(20).min(1),
      price: Yup.number().positive().required(),
      photo: Yup.string().required(),
      categories: Yup.array().required().min(1),
      type: Yup.string().required()
    });
    validation.validate(data) .then (() => {
      Axios.post("/users/"+user.id+"/products", data)
        .then((response) =>{
          Swal.fire({
            icon: "success",
            iconColor:"#00FF7F",
            color: "#ffffff",
            title: "<div id = 'success'> Sucesso ! </div>",
            text: " Item adicionado ",
            footer: "",
            confirmButtonColor:"#00FF7F",
            background: "#000000",
            confirmButtonText:"OK!"
          }).then (() => {
            data.id = response.data.id;
            user.products.push(data)
            Cookies.set("userData", JSON.stringify (user),{expires:1});
            window.location.reload ();
          })
        })
        .catch(error => {
          document.getElementById ("button").disabled = false;
          Swal.fire({
            icon: "error",
            iconColor:"#ff0000",
            color: "#ffffff",
            title: "<div id = 'opa'> Opa </div>",
            text: "Não conseguimos adicionar seu produto!",
            footer: "Verifique se tudo está digitado corretamente ou se você é vendedor.",
            confirmButtonColor:"#ff0000",
            background: "#000000",
            confirmButtonText:"OK!"
      
          })
        });
    })
    .catch (() => {
      document.getElementById ("button").disabled = false;
      Swal.fire({
        icon: "error",
        iconColor:"#ff0000",
        color: "#ffffff",
        title: "Opa",
        text: " Verifique os campos ! ",
       footer: "Algum campo está errado, nada deve estar nulo, o preço deve ter valor positivo e deve haver uma imagem .",
        confirmButtonColor:"#ff0000",
        background: "#000000",
        confirmButtonText:"OK!"
      })
    })
    
  }

    return (
        
        
      <div data-theme="night" className = "flex flex-col min-h-screen bg-base-100">
        
        <Header />

          <div className = "grid grid-cols-3 gap-10  md:flex"> 
            <h1 className="container mx-24 p-4  m-4 border-l-4 border-white text-5xl font-bold font-aldrich text-white ">Adicionar Produtos.</h1>
          </div>

          <div className="container mx-auto p-4 py-8 pb-1 card  max-w-5xl  shadow-2xl bg-base-300">
              <div className="card-body">

                <form >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-lg text-primary">Nome do Produto</span>
                    </label>
                    <input type="text" placeholder="Nome do produto" className="input input-bordered" id = "name"/>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-lg text-primary">Descrição do Produto</span>
                    </label>
                    <input type="text" placeholder="Descrição do Produto" className="input input-bordered" id = "info"/>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-lg text-primary">Preço do Produto</span>
                    </label>
                    <input type="number" placeholder="R$:00,00" className="input input-bordered" id = "price"/>
                  
                  </div>
                  </div>
                  <div className="flex flex-col items-center">
             
                <label htmlFor="imageInput" className="mt-4 mb-2 font-medium text-lg text-primary ">
                 Insira a imagem do Produto:
                </label>
                <input type="file" accept="image/*" id="imageInput" onChange={handleFileInputChange} className="file-input file-input-ghost w-full max-w-xs btn-outline btn-primary" />
                {imageUrl && (
                     <img
                    src={imageUrl}
                    alt=" Imagem do produto "
                    className="mt-4 rounded-md"
                       />
                        )}
                 </div>
                 <div className="flex flex-col items-center">
             
                <label className="mt-4 mb-2 font-medium text-lg text-primary ">
                 Insira o certificado do produto em pdf:
                </label>
                <input type="file" accept=".pdf" id = "CertificationInput" className="file-input file-input-ghost w-full max-w-xs btn-outline btn-primary" />
                
                 </div>
                  <div className="form-control"></div>
                  
                  <div className="dropdown dropdown-right">
                    <br />
                    <span className="label-text font-aldrich text-lg text-primary">Escolha a categoria do Produto:
                      </span>
                    <label tabIndex={0} className="btn m-1 btn-outline btn-primary">Categorias</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      {categories.map((categories, key)=>(<li key={key} ><a><input type="checkbox" name='categoria' value={categories.id} className="checkbox" />{categories.name}</a></li>))}
                    </ul>
                  </div>
                  <div className="dropdown dropdown-right">
                    <br />
                    <span className="label-text font-aldrich text-lg text-primary">Escolha o tipo do Produto:
                      </span>
                    <label tabIndex={1} className="btn m-1 btn-outline btn-primary">Tipos</label>
                    <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><input type="radio" id="documento" name="tipo" value="documento" className="radio" />Documento</a></li>
                    <li><a><input type="radio" id="audio" name="tipo" value="audio" className="radio" />Audio</a></li>
                    <li><a><input type="radio" id="video" name="tipo" value="video" className="radio" />Vídeo</a></li>
                    </ul>
                  </div>
                  <div className="form-control mt-6">
                    <input type = "button" id = "button" onClick={addProduct} value = "Adicionar Produto" className="btn btn-outline btn-primary text-primary-focus text-lg font-bold"/>
                  </div>
                  </form>
                  <label htmlFor="my-modal" className="btn btn-outline btn-primary">Adicionar Nova Categoria</label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal ">
                      <div className="modal-box">
                        <form onSubmit={newCategory}>
                        <h3 className="font-bold text-lg">Insira a nova categoria:</h3>
                        <input type="text" placeholder="Nome da categoria" className="input input-bordered" id = "info-category"/>
                        <div className="modal-action">
                          
                        </div>
                        <input type="submit" value="Adicionar" className="btn btn-outline btn-success"/>
                        </form>
                      </div>
                    </div>
              </div>
            </div>
            <div className="mt-80">
            <Footer />
           </div>
      </div>
  
    ); } else {
        return <Navigate to = "/" replace/>;
      }
  }

import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Axios from "../api/Api";
import * as Yup from "yup";
import { Web3Storage } from 'web3.storage';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Footer from '../components/footer';

export default function EditProduct({ user }) {

  let userSeller = JSON.parse(user);
  

  if (user && userSeller.is_seller == true) {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [categories, setCategories] = useState([]);

    let produto = [];

    useEffect(() => {
      let parameters = new URLSearchParams(window.location.search);
      let ID = parameters.get("id");
      for (const product of userSeller.products) {
        if (ID === product.id) {
          produto = product;
          document.querySelector("#info").value = product.description;
          document.querySelector("#name").value = product.name;
          document.querySelector("#price").value = product.price;
          setSelectedType(product.type);
          setSelectedCategories(product.categories);
        }
      }
      

      Axios.get("/categories")
        .then((response) => {
          setCategories(response.data)
        });
    }, []);

    useEffect(() => {
      async function fetchProductImage() {
        const client = new Web3Storage({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4',
        });
    
        const imagem = [];
        const res = await client.get(produto.photo);

        if (res.ok) {
          const files = await res.files();
          const image = files[0];
          imagem.push(image);
        }

        setImageUrl(URL.createObjectURL(new Blob(imagem))); // Pass a Blob object instead of an array
      }
      fetchProductImage();
    }, [produto.photo]);


    const handleFileInputChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }; 
    

    async function newCategory() {
      let data = {
        name: document.querySelector("#info-category").value
      };
      let validation = Yup.object().shape({
        name: Yup.string().required().max(20).min(2)
      });
      validation.validate(data).then(() => {
        Axios.post("/categories", data)
          .then((response) => {
            Swal.fire({
              icon: "success",
              iconColor: "#00FF7F",
              color: "#ffffff",
              title: "<div id='success'> Sucesso ! </div>",
              text: " Item adicionado ",
              footer: "Clique em ok para prosseguir",
              confirmButtonColor: "#00FF7F",
              background: "#000000",
              confirmButtonText: "OK!"
            });
            window.location.reload();
          })
      })
    }

    const handleCategoryChange = (event, categoryId) => {
      const isChecked = event.target.checked;
      setSelectedCategories((prevSelectedCategories) => {
        if (isChecked) {
          return [...prevSelectedCategories, categoryId];
        } else {
          return prevSelectedCategories.filter((id) => id !== categoryId);
        }
      });
    };
    
    const handleTypeChange = (type) => {
      setSelectedType(type);
    };

    async function altProduct(event) {
      event.preventDefault(event);

      const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4" });
      const fileInput = document.getElementById("imageInput");

      let checked = document.getElementsByName('categoria');
      let valor = [];

      document.getElementById("button").disabled = true;

      for (let i = 0; i < checked.length; i++) {
        if (checked[i].checked == true) {
          valor.push(checked[i].value);
        }
      }

      let checkboxes = document.getElementsByName('tipo');
      let values;
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
          values = checkboxes[i].value;
        }
      }

      let data = {
        description: document.querySelector("#info").value,
        name: document.querySelector("#name").value,
        price: document.querySelector("#price").value,
        photo: await client.put(fileInput.files),
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
      validation.validate(data).then(() => {
        Axios.patch("/products/" + produto.id, data)
          .then(() => {
            Swal.fire({
              icon: "success",
              iconColor: "#00FF7F",
              color: "#ffffff",
              title: "<div id='success'> Sucesso ! </div>",
              text: " Item editado ",
              footer: "",
              confirmButtonColor: "#00FF7F",
              background: "#000000",
              confirmButtonText: "OK!"
            }).then(() => {
              user.products.push(data)
              localStorage.setItem("userData", JSON.stringify(user));
              window.location.reload();
            })
          })
          .catch(error => {
            document.getElementById("button").disabled = false;
            Swal.fire({
              icon: "error",
              iconColor: "#ff0000",
              color: "#ffffff",
              title: "<div id='opa'> Opa </div>",
              text: "Não conseguimos editar seu produto!",
              footer: "Verifique se tudo está digitado corretamente ou se você é vendedor.",
              confirmButtonColor: "#ff0000",
              background: "#000000",
              confirmButtonText: "OK!"
            })
          });
      })
        .catch(() => {
          document.getElementById("button").disabled = false;
          Swal.fire({
            icon: "error",
            iconColor: "#ff0000",
            color: "#ffffff",
            title: "Opa",
            text: " Verifique os campos! ",
            footer: "Algum campo está errado, nada deve estar nulo, o preço deve ter valor positivo e deve haver uma imagem.",
            confirmButtonColor: "#ff0000",
            background: "#000000",
            confirmButtonText: "OK!"
          })
        })
    }

    return (
      <div data-theme="night" className="bg-base-100">
        <Header />
        <div className="grid grid-cols-3 gap-10 md:flex">
          <h1 className="container mx-24 p-4 m-4 border-l-4 border-white text-5xl font-bold font-aldrich text-white">Editar Produtos.</h1>
        </div>
        <div className="container mx-auto p-4 py-12 card max-w-5xl shadow-2xl bg-base-300">
          <div className="card-body">
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-aldrich text-lg text-primary">Nome do Produto</span>
                </label>
                <input type="text" className="input input-bordered" id="name" defaultValue={produto.name} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-aldrich text-lg text-primary">Descrição do Produto</span>
                </label>
                <input type="text" className="input input-bordered" id="info" defaultValue={produto.description} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-aldrich text-lg text-primary">Preço do Produto</span>
                </label>
                <input type="number" className="input input-bordered" id="price" defaultValue={produto.price} />
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
                <input type="file" accept=".pdf" className="file-input file-input-ghost w-full max-w-xs btn-outline btn-primary" />
              </div>
              <div className="form-control"></div>
              <div className="dropdown dropdown-right">
                <br />
                <span className="label-text font-aldrich text-lg text-primary">Escolha a categoria do Produto:</span>
                <label tabIndex={0} className="btn m-1 btn-outline btn-primary">Categorias</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a>
                        <input
                          type="checkbox"
                          name="categoria"
                          value={category.id}
                          className="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => handleCategoryChange(e, category.id)}
                        />
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown dropdown-right">
                <br />
                <span className="label-text font-aldrich text-lg text-primary">
                  Escolha o tipo do Produto:
                </span>
                <label tabIndex={1} className="btn m-1 btn-outline btn-primary">
                  Tipos
                </label>
                <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a>
                      <input
                        type="radio"
                        id="documento"
                        name="tipo"
                        value="documento"
                        className="radio"
                        checked={selectedType === "documento"}
                        onChange={() => handleTypeChange("documento")}a
                      />
                      Documento
                    </a>
                  </li>
                  <li>
                    <a>
                      <input
                        type="radio"
                        id="audio"
                        name="tipo"
                        value="audio"
                        className="radio"
                        checked={selectedType === "audio"}
                        onChange={() => handleTypeChange("audio")}
                      />
                      Audio
                    </a>
                  </li>
                  <li>
                    <a>
                      <input
                        type="radio"
                        id="video"
                        name="tipo"
                        value="video"
                        className="radio"
                        checked={selectedType === "video"}
                        onChange={() => handleTypeChange("video")}
                      />
                      Vídeo
                    </a>
                  </li>
                </ul>
              </div>

              <div className="form-control mt-6">
                <input type="button" id="button" onClick={altProduct} value="Editar Produto" className="btn btn-outline btn-primary text-primary-focus text-lg font-bold" />
              </div>
            </form>
            <label htmlFor="my-modal" className="btn btn-outline btn-primary">Adicionar Nova Categoria</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal ">
              <div className="modal-box">
                <form>
                  <h3 className="text-xl mb-4">Nova Categoria</h3>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-aldrich text-primary text-lg">Nome</span>
                    </label>
                    <input type="text" className="input input-bordered" id="info-category" />
                  </div>
                  <div className="modal-action">
                    <input type="button" onClick={newCategory} value="Adicionar" className="btn btn-outline btn-primary text-primary-focus text-lg font-bold" />
                    <label htmlFor="my-modal" className="btn btn-primary">Fechar</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

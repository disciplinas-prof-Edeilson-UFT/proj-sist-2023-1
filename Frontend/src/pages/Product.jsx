import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Axios from "../api/Api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Web3Storage } from "web3.storage";
import Footer from '../components/footer';

export default function Product({ user }) {

  const [product, setProduct] = useState({ description: "", id: "", name: "", price: 0 });
  const [productImages, setProductImages] = useState([]);
  const [license, setLicense] = useState([]);
  let cart = {};

  let parameters = new URLSearchParams(window.location.search);
  let ID = parameters.get("id");

  async function fetchProductImages(image, data) {
    const client = new Web3Storage({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4',
    });

    const images = [];
    const res = await client.get(image);
    if (res.ok) {
      const files = await res.files();
      const image = files[0];
      images.push(image);
    }

    setProductImages(images);

    if (data) {
      const license = [];
      const res = await client.get(data);
      if (res.ok) {
        const files = await res.files();
        const image = files[0];
        license.push(image);
      }
      setLicense(`https://ipfs.io/ipfs/${license[0].cid}`);

    }
  }


  useEffect(() => {

    Axios.get("/products/" + ID)
      .then((response) => {
        setProduct(response.data);
        fetchProductImages(response.data.photo, response.data.license_url);
      });


  }, []);

  async function AddCart() {

    if (user) {

      let userData = JSON.parse(user);
      Axios.get("/users/" + userData.id + "/cart")
        .then((response) => {
          cart = response.data;
          cart.products.push(product.id);

          Axios.patch("/users/" + userData.id + "/cart", cart).then(() => {
            Swal.fire({
              icon: "success",
              iconColor: "#00FF7F",
              color: "#ffffff",
              title: "<div id = 'success'> Sucesso ! </div>",
              text: " Item adicionado ",
              footer: "",
              confirmButtonColor: "#00FF7F",
              background: "#000000",
              confirmButtonText: "OK!"
            })
          })

        })
        .catch(() => {
          let cart = { products: [product.id] }
          Axios.patch("/users/" + userData.id + "/cart", cart)
            .then(() => {
              Swal.fire({
                icon: "success",
                iconColor: "#00FF7F",
                color: "#ffffff",
                title: "<div id = 'success'> Sucesso ! </div>",
                text: " Item adicionado ",
                footer: "",
                confirmButtonColor: "#00FF7F",
                background: "#000000",
                confirmButtonText: "OK!"
              })
            })
        })


    } else {
      Swal.fire({
        icon: "error",
        iconColor: "#ff0000",
        color: "#ffffff",
        title: "<div id = 'opa'> Opa </div>",
        text: "Faça login primeiro!",
        footer: "Para adicionar o item ao carrinho faça login primeiro",
        confirmButtonColor: "#ff0000",
        background: "#000000",
        confirmButtonText: "OK!"
      })
    }

  }

  return (

    <div data-theme="night">

      <Header />

      <div className="hero min-h-screen bg-base-200">
        <div className='flex flex-col'>
          <div className="card flex-col lg:flex-row  shadow-2xl p-12">
            <figure>
              {productImages[0] ? (
                <img src={URL.createObjectURL(productImages[0])} alt="Produto" className="w-48 h-48 sm:w-72 sm:h-72 rounded-2xl shadow-2xl border-primary-focus border-4" />
              ) : (
                <span> Load... </span>
              )}
            </figure>
            <div className='divider lg:divider-horizontal'></div>
            <div>
              <h1 className="text-5xl font-bold">{product.name}</h1>
              <p className="py-6">{product.description}</p>

              <div className=" grid grid-cols-2 gap-4">
                <Link to="#" className="btn btn-primary">Comprar R$ {product.price}</Link>
                <input type="button" onClick={AddCart} value="Adicionar ao Carrinho" className="btn btn-primary" />
              </div>
            </div>

          </div>
          <div>
            <div className='w-full flex items-center justify-end mt-10'>
              <a href={license} download>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Ver licença
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>

    </div>

  );
}
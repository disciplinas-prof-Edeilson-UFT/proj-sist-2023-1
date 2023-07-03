import Header from "../components/Header";
import Axios from "../api/Api";
import { useEffect, useState } from "react";
import {Web3Storage} from "web3.storage";
import Footer from '../components/footer';

export default function SearchProduct(){

const [product, setProduct] = useState ([]);
const [productImages, setProductImages] = useState([]);

  useEffect (()=>{
    let parameters = new URLSearchParams (window.location.search);
    let id = parameters.get ("search");
    Axios.get("/products?search="+id)
    .then((response)=>{
      setProduct(response.data)
    });

    async function fetchProductImages() {
      const client = new Web3Storage({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4',
      });

      const images = [];

      for (const p of product) {
        try {
          const res = await client.get(p.photo);
          if (res.ok) {
            const files = await res.files();
            const image = files[0];
            images.push(image);
          }
        } catch (error) {
          console.error(`Failed to retrieve image for product ID ${p.id}:`, error);
        }
      }

      setProductImages(images);
    }

    fetchProductImages();
  },[product]);

  function nav (id) {
    window.location.href = `http://localhost:5173/product?id=${id}`
  }
    return(
    <div>
    
    <Header/>
    
    <div className="flex flex-col min-h-screen overflow-x-auto w-full">
    <table className="table w-full">
      {/* head */}
      <thead>
        <tr>         
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
     {product.map((product,key)=>(
       
       <tr key = {key}>
          <td>
              <div className="flex items-center space-x-3">
                <div className="avatar p-6">
                <div className="mask mask-squircle w-20 h-20">
                  <figure className="rounded-full w-20 h-20 overflow-hidden">
                    {productImages[key] ? (
                      <img src={URL.createObjectURL(productImages[key])} alt="Produto" className="w-full h-full object-cover" />
                    ) : (
                      <span> Load... </span>
                    )}
                  </figure>
                </div>
                </div>
                  <div>
                    <button onClick={() => {nav(product.id)}} className = "font-bold font-aldrich" > {product.name} </button>
                  </div>
              </div>
            </td>
            <td className = "font-aldrich" >{product.description}</td>
            <td className = "font-aldrich"> R$:{product.price}</td>
        </tr>
       
                                      
     
     ))}
      </tbody>
      
    </table>
  </div>
  <div className="mt-auto">
          <Footer />
        </div>
  </div>
  );
}
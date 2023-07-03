import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Axios from "../api/Api";
import ProductCard from '../components/ProductCard';
import Footer from '../components/footer';


export default function Home() {

  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    Axios.get("/categories")
    .then((response)=>{
      setCategories(response.data)
    })

  },[])
  
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    Axios.get("/products?search=")
    .then((response)=>{
      setProducts(response.data)
    })

  },[])

  function funcao (id) {
    window.location.href = `product?id=${id}`;
  }

    return (
  
      <div data-theme="night" className = "flex flex-col min-h-screen bg-base-100">

        <Header />
          <div className = "h-96 place-content-center md:flex md:flex-row">

              <div className="carousel h-5/6 w-5/6 mt-10 rounded">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="Compre.png" alt = "Banner" className="w-full object-fill" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-success">❮</a> 
                  <a href="#slide2" className="btn btn-success">❯</a>
                </div>
             </div> 
            <div id="slide2" className="carousel-item relative w-full">
              <img src="seguro.png" alt = "Banner" className="w-full object-fill" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-success">❮</a> 
                <a href="#slide3" className="btn btn-success">❯</a>
              </div>
            </div> 
            <div id="slide3" className="carousel-item relative w-full">
              <img src="vendido.png" alt = "Banner" className="w-full object-fill" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-success">❮</a> 
                <a href="#slide4" className="btn btn-success">❯</a>
              </div>
            </div> 
            <div id="slide4" className="carousel-item relative w-full">
              <img src="fat.png" alt = "Banner" className="w-full object-fill" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-success">❮</a> 
                <a href="#slide1" className="btn btn-success">❯</a>
              </div>
            </div>
              </div>

          </div>
          <ProductCard products={products} string="Comprar" funcao={funcao}/>
          <div className="mt-auto">
            <Footer />
          </div>
      </div>
      
    );
  }
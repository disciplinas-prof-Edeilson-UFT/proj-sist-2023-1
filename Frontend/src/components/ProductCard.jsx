import { Link } from "react-router-dom";
import { Web3Storage } from 'web3.storage'
import { useEffect, useState } from 'react';
import Button from "./button";

export default function ProductCard({ products, string, funcao }) {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    async function fetchProductImages() {
      const client = new Web3Storage({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzY2MzQjI0NjRDNTZBMDJFRGU3NDYxQzBGZjQ1NjMzM0EwNmEzMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU4MTQxMDIwMjgsIm5hbWUiOiJsaXNlbnNlIn0.U8G3EnwgzKp6gbJ8I4jG90rqf4VZ7IdaDAeiLCjfdc4',
      });

      const images = [];

      for (const product of products) {
        try {
          const res = await client.get(product.photo);
          if (res.ok) {
            const files = await res.files();
            const image = files[0];
            images.push(image);
          }
        } catch (error) {
          console.error(`Failed to retrieve image for product ID ${product.id}:`, error);
        }
      }

      setProductImages(images);
    }

    fetchProductImages();
  }, [products]);

  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      {products.map((product, key) => (
        <div className="card w-96 bg-base-100 shadow-xl border-primary border-r-4 border-b-4 mx-auto" key={key}>
          <div className="">
            <figure>
              {productImages[key] ? (
                <img className="w-32 h-32 sm:w-48 sm:h-48" src={URL.createObjectURL(productImages[key])} alt="Produto" />
              ) : (
                <span>Image Loading...</span>
              )}
            </figure>
          </div>
          <div className="card-body rounded-2xl">
            <h2 className="card-title font-aldrich text-primary">{product.name}</h2>
            <p className="font-aldrich text-primary">
              Preço: {product.price} <br />
              Descrição: {product.description}
            </p>
            <Button string={string} funcao={funcao} product={product.id}/>
          </div>
        </div>
      ))}
    </div>
  );
}

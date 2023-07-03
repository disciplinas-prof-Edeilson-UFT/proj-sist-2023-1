import { Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';

export default function HomeSeller({ user }) {
  const userSeller = JSON.parse(user);
  const [products, setProducts] = useState([]);

  if (user && userSeller.is_seller === true) {    

    function funcao(id) {
      window.location.href = `altproduct?id=${id}`;
    }

    return (
      <div data-theme="night" className="flex flex-col min-h-screen bg-base-100">
        <Header />

        <div className="container mx-24 p-4 m-4 border-l-4 border-white text-5xl font-bold font-aldrich text-white">
          Página do vendedor
        </div>
        <div className="label-text font-aldrich text-xl text-primary container mx-auto p-auto py-8 pb-1 card max-w-6xl shadow-2xl bg-base-300">
          <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10 md:flex md:flex-row md:place-content-center">
            <Link to="/addproduct" className="btn btn-success mt-10 font-aldrich w-1/3 h-1/2">
              Adicionar Produto
            </Link>
            <Link to="/" className="btn btn-success mt-10 font-aldrich w-1/3 h-1/2">
              Voltar para página inicial
            </Link>
          </div>

          <ProductCard products={userSeller.products} string="Editar" funcao={funcao} />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" replace />;
  }
}

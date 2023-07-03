import { Link, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Web3Storage } from "web3.storage";
import Axios from "../api/Api";
import Header from "../components/Header";
import Footer from '../components/footer';

export default function MyLicenses({ user }) {
  if (user) {
    user = JSON.parse(user);

    const [licenses, setLicenses] = useState([]);
    const [productNames, setProductNames] = useState({});
    const one = useRef(false);

    function listLicenses() {
      Axios.get(`/users/${user.id}/certificates`)
        .then((response) => {
          let items = response.data;
          for (let i = 0; i < items.length; i++) {
            let item = items[i];
            setLicenses((licenses) => [...licenses, item]);
            fetchProductName(item.product_id);
          }
        });
    }

    useEffect(() => {
      if (one.current) return;
      one.current = true;
      listLicenses();
    }, []);

    function certificado_red(license) {
      window.location.href = `https://ipfs.io/ipfs/${license}`;
    }

    function produto_red(id) {
      Axios.get("/products/" + id)
        .then((response) => {
          window.location.href = `https://ipfs.io/ipfs/${response.data.photo}`;
        });
    }

    function fetchProductName(id) {
      Axios.get("/products/" + id)
        .then((response) => {
          setProductNames((prevProductNames) => ({
            ...prevProductNames,
            [id]: response.data.name
          }));
        });
    }

    return (
      <div data-theme="night" className="flex flex-col min-h-screen bg-base-100">
        <Header />

        <div className="grid grid-cols-3 gap-10  md:flex">
          <h1 className="container mx-24 p-4  m-4 border-l-4 border-white text-5xl font-bold font-aldrich text-white">
            Minhas licenças
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-20">
          {licenses.map((license, key) => (
            <div key={key} className="label-text font-aldrich text-xl text-primary container mx-auto p-4 py-12 card  max-w-5xl  shadow-2xl bg-base-300">
              <div className="card-body">
                <div className="justify-between flex flex-col">
                  <div>
                    <p className="label-text font-aldrich text-3xl text-primary mb-4">
                      Licença do produto: {productNames[license.product_id]}
                    </p>
                  </div>
                  <div>
                    <p className="mt-2 label-text font-aldrich text-xl text-primary mb-4">
                      Essa licença foi adquirida pelo usuário de id: {user.id}
                    </p>
                  </div>
                  <div className="mt-2 mb-4">
                    <p className="break-words">Essa licença é referente ao produto de id: {license.product_id}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='w-full flex items-center justify-end mt-10'>
                  <button onClick={() => { certificado_red(license.certificate_url) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Ver certificado
                  </button>
                  <button onClick={() => { produto_red(license.product_id) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                    Ver produto
                  </button>
                </div>
              </div>
            </div>
          ))}
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

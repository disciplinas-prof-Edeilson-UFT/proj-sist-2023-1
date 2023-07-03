import {Link, Navigate} from "react-router-dom";
import Header from "../components/Header";
import {useEffect} from "react";
import Footer from '../components/footer';

export default function MyProfile ({user}) {

  if (user) {

    user = JSON.parse (user);

    useEffect (() => {
      if (user.is_seller == false) {
        document.getElementById ("document").style.display = "none";
        document.getElementById ("name").style.display = "none";
      }
    }, []);

    return (

      <div data-theme="night" className = "flex flex-col min-h-screen w-screen h-screen bg-base-100">

        <Header />

        <div className = "grid place-items-center mt-5">

          <div className = "container mx-auto p-4 py-8 pb-1 card  max-w-xl  shadow-2xl bg-base-300">

            <div className="card flex-shrink-0 w-full">
              <div className="card-body">
                <div className="grid h-70 grid-cols-3 gap-10 md:flex md:flex-row mt-10 place-content-center" >
              <div className="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-emerald-300">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <table className="shadow-2xl table w-full">
                  <tbody>
                    <tr className="mt-10">
                      <th> Primeiro nome : </th>
                      <td> {user.first_name} </td>
                    </tr>
                    <tr className="mt-10">
                      <th> Sobrenome : </th>
                      <td> {user.last_name} </td>
                    </tr>
                    <tr className="mt-10">
                      <th> E-mail : </th>
                      <td> {user.email} </td>
                    </tr>
                    <tr className="mt-10" id = "name">
                      <th> Razão social : </th>
                      <td> {user.social_name} </td>
                    </tr>
                    <tr className="mt-10" id = "document">
                      <th> {user.document_type} : </th>
                      <td> {user.user_document} </td>
                    </tr>
                  </tbody>
                </table>

              <Link to = "/config" className = "btn btn-success mt-10 font-aldrich">Alterar</Link>

              </div>
            </div>

          </div>
          
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    
    );
  } else {
    return <Navigate to = "/" replace/>;
  }
  }

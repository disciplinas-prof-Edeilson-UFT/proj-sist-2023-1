import {React, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Retrieve from "./pages/Retrieve";
import Home from "./pages/Home";
import Product from "./pages/Product";
import MyProfile from "./pages/MyProfile";
import MyConfig from "./pages/MyConfig";
import AddProduct from "./pages/AddProduct";
import MyCart from "./pages/MyCart";
import AltProduct from "./pages/AltProduct";
import BeSeller from "./pages/BeSeller";
import MyCard from "./pages/MyCard";
import HomeSeller from "./pages/HomeSeller";
import RedefinePassword from "./pages/RedefinePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Wallet from "./pages/Wallet";
import PayHistory from "./pages/PayHistory";
import Payment from "./pages/Payment";
import SearchProduct from "./pages/SearchProduct";
import UpdateCard from "./pages/UpdateCard";
import MyLicenses from "./pages/MyLicenses";
import Cookies from "js-cookie";
import Pay from "./pages/Pay";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy.jsx";
import Contributors from "./pages/Contributors.jsx";

export default function App() {

    let user = Cookies.get ("userData");

    return (

        <BrowserRouter>

            <Routes>

                <Route path = "/login" element = {<Login user = {user}/>} />
                <Route path = "/signup" element = {<SignUp user = {user}/>} />
                <Route path = "/retrieve" element = {<Retrieve user = {user}/>} />
                <Route path = "/" element = {<Home user = {user}/>} />
                <Route path = "/product" element = {<Product user = {user}/>} />
                <Route path = "/config" element = {<MyConfig user = {user}/>} />
                <Route path = "/profile" element = {<MyProfile user = {user}/>} />
                <Route path = "/cart" element = {<MyCart user = {user} />} />
                <Route path = "/addproduct" element = {<AddProduct user = {user} />} />
                <Route path = "/altproduct" element = {<AltProduct user = {user} />} />
                <Route path = "/beseller" element = {<BeSeller user = {user} />} />
                <Route path = "/addcard" element = {<MyCard  user = {user}/>}/>
                <Route path = "/homeseller" element = {<HomeSeller user = {user} />}/>
                <Route path = "/redefinepassword" element = {<RedefinePassword/>}/>
                <Route path = "/authentication/email-authentication" element = {<VerifyEmail/>}/>
                <Route path = "/wallet" element = {<Wallet user = {user}  />}/>
                <Route path = "/payhistory" element = {<PayHistory  user = {user}/>}/>
                <Route path = "/payment" element = {<Payment user = {user}  />}/>
                <Route path = "/products" element = {<SearchProduct/>}/>
                <Route path = "/updatecard" element = {<UpdateCard user = {user}/>}/>
                <Route path = "/my-lisences" element = {<MyLicenses user = {user}/>} />
                <Route path = "/pay" element = {<Pay user = {user}/>} />
                <Route path = "/terms" element = {<Terms user = {user}/>} />
                <Route path = "/privacy" element = {<Privacy user = {user}/>} />
                <Route path = "/contributors" element = {<Contributors user = {user}/>} />
            </Routes>

        </BrowserRouter>

    );
}

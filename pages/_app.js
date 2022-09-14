import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const [user, setUser] = useState({ value: null });
  const [key, setkey] = useState(0);

  const [progress, setProgress] = useState(0)

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(50)
    })

    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })

    // console.log("I am useEffect from app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    }
    catch (error) {
      console.log(error);
      localStorage.clear();
    }

    // for using login
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }

    setkey(Math.random());

  }, [router.query])

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setkey(Math.random());
    router.push("/");
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }

    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    if (Object.keys(cart).length = 0) {
      setkey(Math.random());
    }

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);

    toast.success('Your card is successfully added!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({});

    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };

    setCart(newCart);
    saveCart(newCart);
    console.log(newCart);
    router.push("/checkout");
  }

  return <>
    <LoadingBar
      color='#07bc0c'
      progress={progress}
      waitingTime={500}
      onLoaderFinished={() => setProgress(0)}
    />
    {key && <Navbar user={user} logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component cart={cart} key={key} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp

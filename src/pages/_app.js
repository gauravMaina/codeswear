import Footer from '../../Components/Footer'
import Nabvar from '../../Components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import '../styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const [progress, setProgress] = useState(0)
    const [user, setUser] = useState({ value: null })
    const [key, setKey] = useState()
    const router = useRouter()
    useEffect(() => {
        try {
            if (localStorage.getItem(cart) !== null) {
                setCart(JSON.parse(localStorage.getItem(cart)))
                saveCart(JSON.parse(localStorage.getItem(cart)))
            }
        }
        catch (error) {
            console.error(error)
            localStorage.clear()
        }
        const token = localStorage.getItem('token')
        if (token) {
            setUser({ value: token })
            setKey(Math.random())
        }
        router.events.on('routeChangeStart', () => {
            setProgress(40)
        })
        router.events.on('routeChangeComplete', () => {
            setProgress(100)
        })
        console.log(router.query)
    }, [router.query])

    const saveCart = (cart) => {
        localStorage.setItem(cart, JSON.stringify(cart))

        // calculate subtotal
        let total = 0
        let keys = Object.keys(cart)

        for (let i = 0; i < keys.length; i++) {
            total += cart[keys[i]].qty * cart[keys[i]].price
        }
        setSubTotal(total)
    }

    const addToCart = (itemCode, qty, price, name, size, variant) => {
        let newCart = cart
        if (itemCode in cart) {
            newCart[itemCode].qty += qty
        }

        else {
            newCart[itemCode] = { qty: 1, price, name, size, variant }
        }

        setCart(newCart)
        saveCart(newCart)
    }

    const buyNow = (itemCode, qty, price, name, size, variant) => {
        let newCart = { itemCode: { qty: 1, price, name, size, variant } }
        setCart(newCart)
        saveCart(newCart)
        router.push('/checkout')
    }

    const clearCart = () => {
        // clear cart
        setCart({})
        // pass empty cart to saveCart, because setCart is async and we need to clear cart before saving
        saveCart({})
    }

    const removeFromCart = (itemCode) => {
        let newCart = cart
        if (itemCode in cart) {
            // if qty is 1, remove item from cart
            if (newCart[itemCode].qty === 1) {
                delete newCart[itemCode]
            }
            else {
                newCart[itemCode].qty -= 1
            }
        }
        setCart(newCart)
        saveCart(newCart)
    }
    const logout = () => {
        setUser({ value: null })
        localStorage.removeItem('token')
        setKey(Math.random())
        router.push('/')
    }
    return <>
        <LoadingBar
            color='#F97316'
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => setProgress(0)}
        />
        {key && <Nabvar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart
        } clearCart={clearCart} subTotal={subTotal} />}

        <Component cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart
        } clearCart={clearCart} subTotal={subTotal} {...pageProps} />
        <Footer />
    </>

}
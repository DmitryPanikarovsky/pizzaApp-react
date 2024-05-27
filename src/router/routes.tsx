import { createBrowserRouter, defer } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { Cart } from '../pages/Cart/Cart'
import { Error as ErrorPage } from '../pages/Error/Error'
import { Product } from '../pages/Product/Product'
import axios from 'axios'
import { PREFIX } from '../helpers/API'
import { Suspense, lazy } from 'react'
import { AuthLayout } from '../layout/Auth/AuthLayout'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { RequireAuth } from '../helpers/RequireAuth'
import { Success } from '../pages/Success/Success'

const Menu = lazy(() => import('../pages/Menu/Menu'))

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <RequireAuth><Layout/></RequireAuth>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={'Загрузка...'}><Menu /></Suspense>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/success',
                element: <Success />
            },
            {
                path: '/product/:id',
                element: <Product/>,
                errorElement: 'Error!',
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e))
                            }, 0)
                        })
                    })
                }
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])
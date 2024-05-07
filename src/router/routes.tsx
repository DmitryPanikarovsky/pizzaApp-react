import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../layout/Menu'
import { Menu } from '../pages/Menu/Menu'
import { Cart } from '../pages/Cart/Cart'
import { Error } from '../pages/Error/Error'

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Menu/>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
])
import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
export const routes =[
    {
        path : '/',
        page : HomePage 
    },
    {
        path : '/productpage',
        page : ProductsPage 
    },
    {
        path : '/order',
        page : OrderPage
    }
]

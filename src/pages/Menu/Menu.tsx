import { ChangeEvent, useEffect, useState } from 'react'
import { Heading } from '../../components/Heading/Heading'
import { Search } from '../../components/Search/Search'
import { PREFIX } from '../../helpers/API'
import { Product } from '../../intefaces/product.inteface'
import styles from './Menu.module.scss'
import axios, { AxiosError } from 'axios'
import Loader from '../../components/Loader/Loader'
import { MenuList } from './MenuList/MenuList'


function Menu() {
    const [products, setProduct] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>()
    const [filter, setFilter] = useState<string>()
    const [_, setDebouncedFilter] = useState<string>()


    useEffect(() => {
        const delayInputTimeout = setTimeout(() => {
            setDebouncedFilter(filter)
            getMenu(filter)
        }, 500)
        return () => clearTimeout(delayInputTimeout)
    }, [filter])


    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            })
            setProduct(data)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
            if (e instanceof AxiosError) {
                setError(e.message)
            }
            setIsLoading(false)
            return
        }
    }

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    return (
        <div className={styles['menu']}>
            <div className={styles['menu__head']}>
                <Heading>Меню</Heading>
                <Search placeholder='Введите блюдо или состав...' onChange={updateFilter}/>
            </div>
            <div className={styles['menu__content']}>
                {error && <h1>{error}</h1>}
                {!isLoading && products.length > 0 && <MenuList products={products}/>}
                {!isLoading && products.length === 0 && <div style={{marginTop: '45px'}}>Ничего не найдено...</div>}
                {isLoading && 
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        width: '100%', 
                        height: '75vh' }}>
                        <Loader />
                    </div>
                }
            </div>
        </div>
    )
}

export default Menu
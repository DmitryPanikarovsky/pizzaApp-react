import { useDispatch, useSelector } from 'react-redux'
import { Heading } from '../../components/Heading/Heading'
import styles from './Cart.module.scss'
import { AppDispatch, RootState } from '../../store/store'
import { CartItem } from '../../components/CartItem/CartItem'
import { useEffect, useState } from 'react'
import { Product } from '../../intefaces/product.inteface'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { cartActions } from '../../store/cart.slice'

const DELIVERY_FEE = 169

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const items = useSelector((state: RootState) => state.cart.items)
    const jwt = useSelector((state: RootState) => state.user.jwt)
    const navigate = useNavigate()

    const total = items
        .map(i => {
            const product = cartProducts.find(p => p.id === i.id)
            if (!product) {
                return 0
            }
            return i.count * product.price
        })
        .reduce((acc, i) => acc + i, 0)

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(item => getItem(item.id)))
        setCartProducts(res)
    }

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch(cartActions.clean())
        navigate('/success')
    }

    useEffect(() => {
        loadAllItems()
    }, [items])

    return <div className={styles.cart}>
        <div className={styles['cart__heading']}>
            <Heading>Корзина</Heading>
            <div className={styles.checkout}>
                <Button appearance='big' onClick={checkout}>Оформить</Button>
            </div>
        </div>
        <div className={styles['cart__content']}>
            <div className={styles['cart__product']}>
                {items.map(item => {
                    const product = cartProducts.find(prod => prod.id === item.id)
                    if (!product) {
                        return
                    }
                    return <CartItem key={product.id} count={item.count} {...product}/>
                })}
            </div>
            <div className={styles.total}>
                <div className={styles['total__row']}>
                    <div>Итог</div>
                    <div className={styles['total__right']}>
                        <div className={styles['total__price']}>{total}</div>
                        <span className={styles.currency}>&nbsp;₽</span>
                    </div>
                </div>
                <div className={styles['total__row']}>
                    <div>Доставка</div>
                    <div className={styles['total__right']}>
                        <div className={styles['total__price']}>{DELIVERY_FEE}</div>
                        <span className={styles.currency}>&nbsp;₽</span>
                    </div>
                </div>
                <div className={styles['total__row']}>
                    <div className={styles['total__end']}>Итог
                        <div className={styles['total__count']}>
                            ({items.reduce((acc, item) => acc += item.count, 0)})
                        </div>
                    </div>
                    <div className={styles['total__right']}>
                        <div className={styles['total__price']}>{total + DELIVERY_FEE}</div>
                        <span className={styles.currency}>&nbsp;₽</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
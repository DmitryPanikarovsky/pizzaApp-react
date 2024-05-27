import styles from './CartItem.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { cartActions } from '../../store/cart.slice'
import { CartItemProps } from './CartItem.types'

export function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>()

    const increase = () => {
        dispatch(cartActions.remove(props.id))
    }

    const decrease = () => {
        dispatch(cartActions.add(props.id))
    }

    const remove = () => {
        dispatch(cartActions.delete(props.id))
    }

    return (
        <div className={styles.item}>
            <div className={styles.image} style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className={styles.description}>
                <div className={styles.name}>{props.name}</div>
                <span className={styles.currency}>{props.price}&nbsp;₽</span>
            </div>
            <div className={styles.actions}>
                <button className={styles.minus} onClick={increase}>
                    <img src="/public/minus-icon.svg" alt="Удалить из корзины" />
                </button>
                <div className={styles.count}>{props.count}</div>
                <button className={styles.plus} onClick={decrease}>
                    <img src="/public/plus-icon.svg" alt="Добавить в корзину" />
                </button>
                <button className={styles.remove} onClick={remove}>
                    <img src="/public/delete-icon.svg" alt="Удалить всё" />
                </button>
            </div>
        </div>
    )
}

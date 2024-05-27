import { ProductCardProps } from './ProductCard.types'
import styles from './ProductCard.module.scss'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { cartActions } from '../../store/cart.slice'

export function ProductCard( props: ProductCardProps ) {

    const dispatch = useDispatch<AppDispatch>()

    const addToCart = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(cartActions.add(props.id))
    }

    return (
        <Link to={`/product/${props.id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles['card__head']} style={{ backgroundImage: `url(${props.image})` }}>
                    <div className={styles['card__price']}>
                        {props.price}&nbsp;
                        <span className={styles['card__currency']}>₽</span>
                    </div>
                    <button className={styles['card__add-to-cart']} onClick={addToCart}>
                        <img src="/public/add-to-cart.svg" alt="Добавить в корзину" />
                    </button>
                    <div className={styles['card__rating']}>
                        {props.rating}
                        <img src="/public/star-icon.svg" alt="Иконка рейтинга" />
                    </div>
                </div>
                <div className={styles['card__footer']}>
                    <div className={styles['card__title']}>{props.name}</div>
                    <div className={styles['card__description']}>{props.description}</div>
                </div>
            </div>
        </Link>
    )
}

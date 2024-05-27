import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import styles from './Success.module.scss'

export const Success = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.success}>
            <div className={styles.img}>
                <img src="/public/pizza.svg" alt="Заказ готов Изображение пиццы" />
            </div>
            <p className={styles.text}>Ваш заказ успешно оформлен!</p>
            <div className={styles.btn}>
                <Button appearance='big' onClick={() => navigate('/')}>Создать новый</Button>
            </div>
        </div>
    )
}
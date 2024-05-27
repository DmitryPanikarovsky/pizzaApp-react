import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'
import { Button } from '../components/Button/Button'
import clNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { getProfile, userActions } from '../store/user.slice'
import { useEffect } from 'react'

export function Layout() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector((state: RootState) => state.user.profile)
    const items = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    const logOut = () => {
        dispatch(userActions.logOut())
        navigate('/auth/login')
    }
    
    return <div className={styles.layout}>
        <div className={styles.sidebar}>
            <div className={styles.user}>
                <img className={styles['user__avatar']} src="/public/avatar.png" alt="Аватар"/>
                <div className={styles['user__name']}>{profile?.name}</div>
                <div className={styles['user__email']}>{profile?.email}</div>
            </div>
            <div className={styles.menu}>
                <NavLink to='/' className={({ isActive }) => clNames(styles['menu__link'], {
                    [styles.active] : isActive
                })}>
                    <img src="/public/menu-icon.svg" alt="Иконка меню"/>
                    <div className={styles['link-name']}>
                        Меню
                    </div>
                </NavLink>
                <NavLink to='/cart' className={({ isActive }) => clNames(styles['menu__link'], {
                    [styles.active] : isActive
                })}>
                    <img src="/public/cart-icon.svg" alt="Иконка корзины"/>
                    <div className={styles['link-name']}>
                        Корзина
                    </div>
                    <div className={styles['cart-count']}>
                        {items.reduce((acc, item) => acc += item.count, 0)}
                    </div>
                </NavLink>
            </div>
            <div className={styles.btn}>
                <Button className={styles['btn__exit']} onClick={logOut}>
                    <img src="/public/exit-icon.svg" alt="Иконка выхода на кнопке" />
                    Выйти
                </Button>
            </div>
        </div>
        <div className={styles.content}>
            <Outlet/>
        </div>
    </div>
}
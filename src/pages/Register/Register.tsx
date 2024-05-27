import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Heading } from '../../components/Heading/Heading'
import { Input } from '../../components/Input/Input'
import styles from '../Login/Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { FormEvent, useEffect } from 'react'
import { register, userActions } from '../../store/user.slice'


type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
}

export function Register() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { jwt, registerErrorMessage } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearRegisterError())
        const target = e.target as typeof e.target & RegisterForm
        const { email, password, name } = target
        dispatch(register({ email: email.value, password: password.value, name: name.value }))
    }

    return <div className={styles.login}>
        <Heading className={styles.head}>Регистрация</Heading>
        {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
        <form className={styles.form} onSubmit={submit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='email'>Ваш E-mail</label>
                <Input id='email' name='email' placeholder='Введите E-mail' />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='password'>Ваш пароль</label>
                <Input id='password' name='password' type='password' placeholder='Введите пароль' />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='firstName'>Ваше имя</label>
                <Input id='firstName' name='name' placeholder='Введите имя' />
            </div>
            <div className={styles.btn}>
                <Button appearance='big'>Зарегистрироваться</Button>
            </div>
        </form>
        <div className={styles.links}>
            <div>Есть аккаунт?</div>
            <Link to='/auth/login' className={styles['link-reg']}>Войти</Link>
        </div>
    </div>
}
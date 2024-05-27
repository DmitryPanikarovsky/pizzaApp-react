import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Heading } from '../../components/Heading/Heading'
import { Input } from '../../components/Input/Input'
import styles from './Login.module.scss'
import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { login, userActions } from '../../store/user.slice'

type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { jwt, loginErrorMessage} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearLoginError())
        const target = e.target as typeof e.target & LoginForm
        const { email, password } = target
        dispatch(login({ email: email.value, password: password.value }))
    }

    return <div className={styles.login}>
        <Heading className={styles.head}>Вход</Heading>
        {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
        <form className={styles.form} onSubmit={submit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='email'>Ваш E-mail</label>
                <Input id='email' type='email' name='email' placeholder='Введите E-mail'/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='password'>Ваш пароль</label>
                <Input id='password' type='password' name='password' placeholder='Введите пароль'/>
            </div>
            <div className={styles.btn}>
                <Button appearance='big'>Войдите</Button>
            </div>
        </form>
        <div className={styles.links}>
            <div>Нет аккаунта?</div>
            <Link to='/auth/register' className={styles['link-reg']}>Зарегистрироваться</Link>
        </div>
    </div>
}
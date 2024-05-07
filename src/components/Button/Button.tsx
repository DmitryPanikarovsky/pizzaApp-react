import { ButtonProps } from './Button.props'
import clNames from 'classnames'
import styles from './Button.module.scss'


export const Button = function Button({ children, className, appearance = 'small', ...props }: ButtonProps) {
    return (
        <button className={clNames(styles.button, styles.accent, className, {
            [styles.big] : appearance === 'big',
            [styles.small] : appearance === 'small',
        })} {...props}>{children}</button>
    )
}
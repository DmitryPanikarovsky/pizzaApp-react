import clNames from 'classnames'
import styles from './Input.module.scss'
import { forwardRef } from 'react'
import { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, ...props }, ref) {
    return (
        <input ref={ref} className={clNames(styles.input, className, {
            [styles.invalid] : isValid
        })} {...props}/>
    );
})



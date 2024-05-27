import clNames from 'classnames'
import styles from './Search.module.scss'
import { forwardRef } from 'react'
import { SearchProps } from './Search.types'

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, isValid = true, ...props }, ref) {
    return (
        <div className={styles['search-wrapper']}>
            <img className={styles.icon} src="/public/search.svg" alt="Иконка поиска" />
            <input ref={ref} className={clNames(styles.input, className, {
                [styles.invalid]: isValid
            })} {...props} />
        </div>
    )
})



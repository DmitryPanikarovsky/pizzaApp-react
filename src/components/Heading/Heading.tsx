import styles from './Heading.module.scss'
import { HeadingProps } from './Heading.types'
import clNames from 'classnames'

export function Heading({ children, className, ...props }: HeadingProps) {
    return (
        <h1 className={clNames(className, styles.heading)} {...props}>{children}</h1>
    )
}
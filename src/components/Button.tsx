import { ButtonHTMLAttributes } from 'react'
import classname from 'classnames'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button
      className={classname('button', { outlined: isOutlined })}
      {...props}
    />
  )
}

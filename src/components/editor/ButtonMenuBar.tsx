import { ReactNode } from 'react'
import { Button, ButtonProps } from '../ui/button'

interface ButtonMenuBarProps extends ButtonProps {
  children: ReactNode
}

const ButtonMenuBar = (props: ButtonMenuBarProps) => {
  return (
    <Button
      size='sm'
      type='button'
      variant='ghost'
      title={props.title}
      className='data-[active=true]:text-ring'
      {...props}
    />
  )
}

export default ButtonMenuBar

import { FC } from "react"
import classes from './Header.module.scss';

const Header: FC<{ title: string }> = (props) => {
  return (
    <div className={classes.header}>{props.title}</div>
  )
}

export default Header

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

const HeaderLink = ({extraClass, to, icon, text}: {extraClass:string, to:string, icon:JSX.Element, text:string}) => {
  const classes = `${styles.link} ${extraClass} text text_type_main-default mr-2 pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`;
  return (
    <NavLink to={to} className={classes} end >
      <span className="icon mr-2">{icon}</span>
      {text}
    </NavLink>
  )
}

HeaderLink.defaultProps = {
  extraClass: "primary"
}

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.left}>
          <HeaderLink to="/" icon={<BurgerIcon type={'secondary'} />} text="Конструктор" />
          <HeaderLink to="/feed" extraClass="secondary" icon={<ListIcon type="secondary" />} text="Лента заказов" />
        </nav>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <div className={styles.right}>
          <HeaderLink to="/profile" icon={<ProfileIcon type="secondary" />} text="Личный кабинет" />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
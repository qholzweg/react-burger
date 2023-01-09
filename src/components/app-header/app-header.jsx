import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const HeaderLink = (props) => {
  return(
    <a href={props.href} className={`${styles.link} ${props.extraClass} text text-${props.extraClass} text_type_main-default mr-2 pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
      <span className="icon mr-2">{props.icon}</span>
      {props.text}
    </a>
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
          <HeaderLink href="#" icon={<BurgerIcon type="primary" />} text="Конструктор" />
          <HeaderLink href="#" extraClass="secondary" icon={<ListIcon type="secondary" />} text="Лента заказов" />
        </nav>
        <a href=" /" className={styles.logo}>
          <Logo />
        </a>
        <div className={styles.right}>
          <HeaderLink href="#" extraClass="secondary" icon={<ProfileIcon type="secondary" />} text="Личный кабинет" />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
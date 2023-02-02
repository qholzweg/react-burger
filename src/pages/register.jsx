import styles from './register.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const onSubmit = () => { }
  return (
    <div className={styles.RegisterPage}>
      <AppHeader />
      <main className='content-center text-center'>
        <form className={styles.loginForm}>
          <h3 className='text text_type_main-medium mb-6'>Регистрация</h3>
          <Input type='text' placeholder='Имя' extraClass='mb-6' />
          <Input type='email' placeholder='Email' extraClass='mb-6' />
          <PasswordInput type='password' placeholder='Пароль' extraClass='mb-6' />
          <Button htmlType="button" type='primary' onClick={onSubmit} extraClass='mb-20'>
            Зарегистрироваться
          </Button>

          <p className='mb-4 text-secondary'>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}
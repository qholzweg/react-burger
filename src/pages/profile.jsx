import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { auth } from '../services/api';

export const ProfilePage = () => {
  const [failState, setFailState] = useState({ error: false, message: '' });

  const [form, setValue] = useState({ email: '', name: '', password: '', isChanged: false });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value, isChanged: true });
  };

  const getUserInfo = useCallback(
    () => {
      auth.getUser()
        .then(data => setValue(data.user))
        .catch(e => setFailState({ error: true, message: e }));
    }, []
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (form.password === '') delete form.password;
    auth.editUser(form)
      .then(setValue({ ...form, isChanged: false }));
  }, [form]);

  const onCancel = () => {
    getUserInfo();
  }

  return (
    <div className={styles.ProfilePage}>
      <AppHeader />
      <main className={styles.main}>
        <aside>
          <ProfileMenu />
          <p className={styles.description}>В этом разделе вы можете
            изменить свои персональные данные</p>
        </aside>
        <article>
          {failState.error && failState.message && <p className='text-error'>{failState.message}</p>}
          <form className={styles.loginForm} onSubmit={onSubmit} >
            <Input type='text' placeholder='Имя' extraClass='mb-6' icon='EditIcon' name="name" value={form.name} onChange={onChange} />
            <Input type='email' placeholder='Логин' extraClass='mb-6' icon='EditIcon' name="email" value={form.email} onChange={onChange} />
            <PasswordInput type='password' placeholder='Пароль' icon='EditIcon' extraClass='mb-6' name="password" value='' onChange={onChange} />
            {form.isChanged &&
              <>
                <Button htmlType="submit" type='primary' extraClass='mb-20'>
                  Сохранить
                </Button>
                <Button htmlType="button" type='secondary' onClick={onCancel} extraClass='mb-20'>
                  Отменить
                </Button>
              </>
            }
          </form>
        </article>
      </main>
    </div>
  )
}
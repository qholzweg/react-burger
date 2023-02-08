import AppHeader from '../components/app-header/app-header';
import styles from './feed.module.css';

export default function FeedPage () {

  return (
    <div className={styles.FeedPage}>
      <AppHeader />
      <main className='content-center'>
        Feed
      </main>
    </div>
  )
}
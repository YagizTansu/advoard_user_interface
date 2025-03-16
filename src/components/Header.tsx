import Link from 'next/link'
import styles from '@/styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          Advoard
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link href="/about">Hakkımızda</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

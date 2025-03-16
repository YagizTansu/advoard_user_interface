import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Advoard. Tüm hakları saklıdır.</p>
    </footer>
  )
}

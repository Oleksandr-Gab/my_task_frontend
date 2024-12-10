import { HiLightningBolt } from 'react-icons/hi';
import css from './Logo.module.css'

export default function Logo() {
  return (
    <div className={css.logo}>
          <div className={css.logoItem}>
          <HiLightningBolt className={css.logoItemLigh} />
        </div>
        <h1 className={css.titleLogo}>Task Pro</h1>
      </div>
  )
}

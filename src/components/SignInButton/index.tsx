import { FaGithub } from "react-icons/fa"
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
    const isUserLoggeIn = false;

    return isUserLoggeIn ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#04b301" />
            Nicollas Ryan
            <FiX color="#737380" className={styles.closeIncon} />
        </button>
    ) : (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#eba417" />
            Sign in with GitHub
        </button>
    )
}
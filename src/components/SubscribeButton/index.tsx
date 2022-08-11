import styles from './styles.module.scss'

interface SubscribeButtonPrpos {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonPrpos) {
    return (
        <button type="button" className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}
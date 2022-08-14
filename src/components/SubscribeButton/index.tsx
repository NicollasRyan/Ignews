import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss'

interface SubscribeButtonPrpos {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonPrpos) {
    const {data: session} = useSession()
    
    function handleSubscribe() {
        if(!session) {
            signIn('github')
            return
        }

        
    }
    
    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe} >
            Subscribe now
        </button>
    )
}
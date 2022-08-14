import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getSripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonPrpos {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonPrpos) {
    const {data: session} = useSession()
    
    async function handleSubscribe() {
        if(!session) {
            signIn('github')
            return
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe =  await getSripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch(err) {
            alert(err.message);
        }
    }
    
    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe} >
            Subscribe now
        </button>
    )
}
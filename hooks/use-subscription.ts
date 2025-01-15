import { useState } from "react";
import axios from "axios";

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [priceId, setPriceId] = useState<string | null>(null);

  const onSubscribe = async ({ priceId }: { priceId: string }) => {
    setIsProcessing(true);
    setPriceId(priceId);

    try {
      const response = await axios.post('/api/payments/create-checkout-session', {
        priceId,
      });

      if (response.status === 200) {
        window.location.href = response.data.session_url;
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setIsProcessing(false);
    }
  };

  return { onSubscribe, isProcessing , priceId };
};

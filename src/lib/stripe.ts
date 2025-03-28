
// Nota: Use SEMPRE as chaves de teste para o ambiente de desenvolvimento
// Esta é a chave pública do Stripe, que pode ser compartilhada com segurança no frontend
export const STRIPE_PUBLIC_KEY = "pk_test_51R6sPUJPopASOR28Yg0d9wmepLAPJrPVA66mo0cHo7FUlQUaGHFCs7HB5Y6OeyMPZfbxhrDLntjMdFljqxIyDKmd00JN4YSxT7";

// Funções de utilidade para Stripe
export const formatPriceForStripe = (price: number): number => {
  // Stripe trabalha com valores em centavos
  return Math.round(price * 100);
};

export const loadStripeScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).Stripe) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const initializeStripe = async () => {
  await loadStripeScript();
  return (window as any).Stripe(STRIPE_PUBLIC_KEY);
};

// Redireciona para o checkout do Stripe
export const redirectToStripeCheckout = async (cartItems: any[], customerEmail: string = ""): Promise<void> => {
  try {
    const stripe = await initializeStripe();
    
    // Gera um ID único para esta sessão
    const sessionId = `session_${Date.now()}`;
    
    // Armazena os itens do carrinho no sessionStorage para simular uma sessão
    // Em produção, essa sessão seria criada no backend
    const items = cartItems.map(item => ({
      price: item.product.priceId || `price_${item.product.id.replace(/\s+/g, '_')}`,
      quantity: item.quantity,
    }));
    
    console.log("Redirecionando para o Stripe Checkout com os seguintes itens:", items);
    
    // Como estamos em ambiente de demonstração, vamos simular um checkout usando o modo de sessão
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
      successUrl: window.location.origin + '/order-status/success-' + Date.now(),
      cancelUrl: window.location.origin + '/cart',
    });
    
    if (error) {
      console.error('Erro ao redirecionar para o Stripe:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Erro ao inicializar o Stripe:', error);
    throw error;
  }
};

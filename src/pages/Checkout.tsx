import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Por favor, forneça seu endereço de entrega");
      return;
    }

    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    setIsProcessing(true);
    try {
      await placeOrder(items, address);
      clearCart();
      toast.success("Pedido realizado com sucesso!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Ocorreu um erro ao processar seu pedido"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Informações de Entrega</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Endereço Completo</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, Número, Bairro, Cidade"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Resumo do Pedido</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.quantity}x {item.product.name}</span>
                <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          onClick={handleCheckout}
          disabled={isProcessing || items.length === 0}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Confirmar Pedido"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
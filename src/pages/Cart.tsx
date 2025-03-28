
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Seu Carrinho está Vazio</h1>
          <p className="text-gray-600 mb-8">
            Parece que você ainda não adicionou nenhum item ao seu carrinho.
          </p>
          <Button asChild>
            <Link to="/">Explorar Cardápio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Continuar Comprando
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>
          
          <div className="fancy-card overflow-hidden">
            <div className="p-6 flex justify-between border-b">
              <div>
                <span className="font-medium">
                  {items.length} {items.length === 1 ? "Item" : "Itens"}
                </span>
              </div>
              <button 
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
            
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <ImageWithFallback
                        src={item.product.detailedImage || item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="text-lg font-medium">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <div className="mt-2 sm:mt-0 text-lg font-bold">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1 mb-4 line-clamp-1">
                      {item.product.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          type="button"
                          className="px-2 py-1 text-gray-600 hover:text-primary transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-center w-8 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1 text-gray-600 hover:text-primary transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
          
          <div className="fancy-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Entrega</span>
                <span className="font-medium">R$ 3,99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impostos</span>
                <span className="font-medium">R$ {(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="border-t my-4"></div>
              
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  R$ {(totalPrice + 3.99 + totalPrice * 0.1).toFixed(2)}
                </span>
              </div>
              
              <Button
                className="w-full mt-6"
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                Ao finalizar a compra, você concorda com nossos{" "}
                <a href="#" className="text-primary hover:underline">
                  Termos
                </a>{" "}
                e{" "}
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Plus, ShoppingCart } from "lucide-react";

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  
  // Selecionar um subconjunto de produtos para destacar
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Catálogo Popular</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossos itens mais pedidos e favoritos dos clientes. Essas escolhas populares são garantidas para satisfazer seus desejos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="fancy-card overflow-hidden hover-scale"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.detailedImage || product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white rounded-full p-1.5 shadow-sm">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </Link>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Adicionar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, getCategoryById } from "@/data/mockData";
import { Product, Category } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Plus, ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (categoryId) {
      const fetchedCategory = getCategoryById(categoryId);
      const fetchedProducts = getProductsByCategory(categoryId);
      
      if (fetchedCategory) {
        setCategory(fetchedCategory);
      }
      
      setProducts(fetchedProducts);
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-16 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Aguardando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-16 animate-fade-in">
      <Link to="/" className="inline-flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para catálogo
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-gray-600 mt-2">{category.description}</p>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum produto nessa categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="fancy-card overflow-hidden hover-scale"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
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
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
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
      )}
    </div>
  );
};

export default CategoryPage;

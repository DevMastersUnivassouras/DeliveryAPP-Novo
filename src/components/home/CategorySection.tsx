
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export const CategorySection = () => {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Navegue por Categoria</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa ampla variedade de opções deliciosas em várias categorias. De lanches rápidos a refeições completas, temos tudo para você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group hover-scale fancy-card overflow-hidden"
            >
              <div className="h-48 w-full relative overflow-hidden">
                <ImageWithFallback
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-primary">
                    Ver Itens
                  </span>
                  <svg
                    className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

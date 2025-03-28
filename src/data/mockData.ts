
import { Category, Product } from "@/types/product";

export const categories: Category[] = [
  {
    id: "1",
    name: "Bebidas",
    description: "Bebidas refrescantes para qualquer ocasião",
    imageUrl: "https://images.unsplash.com/photo-1583064313642-a7c149480c7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGltb25hZGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "2",
    name: "Hambúrgueres",
    description: "Hambúrgueres deliciosos para amassar",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "3",
    name: "Pizzas",
    description: "Pizzas autênticas com ingredientes frescos",
    imageUrl: "https://images-unsplash-com.translate.goog/photo-1571997478779-2adcbbe9ab2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&_x_tr_sl=en&_x_tr_tl=pt-BR&_x_tr_hl=pt-BR&_x_tr_pto=sc",
  },
  {
    id: "4",
    name: "Sobremesas",
    description: "Doces para completar sua refeição",
    imageUrl: "https://plus.unsplash.com/premium_photo-1678198828975-02016abf2c5e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const products: Product[] = [
  // Bebidas
  {
    id: "101",
    name: "Refrigerante Cola",
    description: "Refrigerante refrescante com um toque de baunilha",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
    detailedImage: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
    categoryId: "1",
  },
  {
    id: "102",
    name: "Limonada Caseira",
    description: "Limonada caseira com limões reais e um toque de hortelã",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859",
    detailedImage: "https://images.unsplash.com/photo-1621263764928-df1444c5e859",
    categoryId: "1",
  },
  {
    id: "103",
    name: "Chá Gelado",
    description: "Chá recém-preparado servido com gelo e limão",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87",
    detailedImage: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87",
    categoryId: "1",
  },

  // Hambúrgueres
  {
    id: "201",
    name: "Hambúrguer Clássico",
    description: "Hambúrguer suculento com alface, tomate e nosso molho especial",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    detailedImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    categoryId: "2",
  },
  {
    id: "202",
    name: "Hambúrguer do Amante de Queijo",
    description: "Queijo duplo com nosso hambúrguer exclusivo e cebolas caramelizadas",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b",
    detailedImage: "https://images.unsplash.com/photo-1553979459-d2229ba7433b",
    categoryId: "2",
  },
  {
    id: "203",
    name: "Hambúrguer Vegetariano",
    description: "Hambúrguer à base de plantas com vegetais frescos e maionese vegana",
    price: 13.50,
    imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
    detailedImage: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
    categoryId: "2",
  },

  // Pizzas
  {
    id: "301",
    name: "Pizza Margherita",
    description: "Pizza clássica com molho de tomate, mussarela e manjericão fresco",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    detailedImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    categoryId: "3",
  },
  {
    id: "302",
    name: "Pizza de Pepperoni",
    description: "Pepperoni picante com queijo derretido e molho de tomate",
    price: 18.99,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    detailedImage: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    categoryId: "3",
  },
  {
    id: "303",
    name: "Pizza Vegetariana",
    description: "Vegetais frescos sortidos em uma massa fina com molho de tomate",
    price: 17.50,
    imageUrl: "https://plus.unsplash.com/premium_photo-1690056321981-dfe9e75e0247?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailedImage: "https://plus.unsplash.com/premium_photo-1690056321981-dfe9e75e0247?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: "3",
  },

  // Sobremesas
  {
    id: "401",
    name: "Brownie de Chocolate",
    description: "Brownie de chocolate rico com uma bola de sorvete de baunilha",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e",
    detailedImage: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e",
    categoryId: "4",
  },
  {
    id: "402",
    name: "Cheesecake de Nova York",
    description: "Cheesecake cremoso estilo Nova York com compota de frutas vermelhas",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailedImage: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: "4",
  },
  {
    id: "403",
    name: "Torta de Maçã",
    description: "Torta de maçã caseira servida com creme batido",
    price: 7.50,
    imageUrl: "https://plus.unsplash.com/premium_photo-1729731478134-575973b752da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailedImage: "https://plus.unsplash.com/premium_photo-1729731478134-575973b752da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: "4",
  },
];

// Função auxiliar para obter produtos por categoria
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

// Função auxiliar para obter um único produto por ID
export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

// Função auxiliar para obter uma categoria por ID
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};

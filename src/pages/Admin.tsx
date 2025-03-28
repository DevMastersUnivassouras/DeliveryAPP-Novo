
import { useState, useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import { Order, OrderStatus } from "@/types/order";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Search,
  Clock,
  ChefHat,
  ShoppingBag,
  CheckCircle,
  XCircle,
} from "lucide-react";

const statusOptions = [
  { value: "all", label: "Todos os Pedidos" },
  { value: "processing", label: "Processando" },
  { value: "preparing", label: "Em Preparo" },
  { value: "out_for_delivery", label: "Em Entrega" },
  { value: "delivered", label: "Entregue" },
  { value: "cancelled", label: "Cancelado" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <Clock className="h-5 w-5 text-blue-500" />;
    case "preparing":
      return <ChefHat className="h-5 w-5 text-orange-500" />;
    case "out_for_delivery":
      return <ShoppingBag className="h-5 w-5 text-purple-500" />;
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const Admin = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = [...orders];
    
    // Ordenar por data (mais recentes primeiro)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Filtrar por status se não for "all"
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Filtrar por termo de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        order => 
          order.orderId.toLowerCase().includes(query) ||
          order.items.some(item => item.product.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredOrders(result);
  }, [orders, statusFilter, searchQuery]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Painel de Administração</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="fancy-card p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Total de Pedidos</h3>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
        
        <div className="fancy-card p-4 flex items-center">
          <div className="mr-4 bg-orange-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Processando</h3>
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === "processing").length}
            </p>
          </div>
        </div>
        
        <div className="fancy-card p-4 flex items-center">
          <div className="mr-4 bg-purple-100 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Em Entrega</h3>
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === "out_for_delivery").length}
            </p>
          </div>
        </div>
        
        <div className="fancy-card p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Entregues</h3>
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === "delivered").length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="fancy-card overflow-hidden">
        <div className="p-4 sm:p-6 bg-gray-50 border-b">
          <h2 className="font-bold">Gerenciamento de Pedidos</h2>
        </div>
        
        <div className="overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">Nenhum Pedido Encontrado</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Nenhum pedido corresponde aos critérios de busca."
                  : statusFilter !== "all"
                  ? `Não há pedidos com status '${statusFilter}'.`
                  : "Não há pedidos no sistema ainda."}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nº Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => {
                  const orderDate = new Date(order.createdAt);
                  const formattedDate = orderDate.toLocaleDateString();
                  const formattedTime = orderDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2 font-medium">{order.orderId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formattedDate}
                        <br />
                        {formattedTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="font-medium">Cliente</span>
                        <br />
                        <span className="text-gray-600 text-xs">{order.address}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {order.items.map((item, index) => (
                            <div key={index} className="mb-1 last:mb-0">
                              {item.quantity}x {item.product.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            order.status === "processing" 
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "preparing" 
                              ? "bg-orange-100 text-orange-800"
                              : order.status === "out_for_delivery" 
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "delivered" 
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status === "processing" ? "Processando" : 
                           order.status === "preparing" ? "Em Preparo" : 
                           order.status === "out_for_delivery" ? "Em Entrega" : 
                           order.status === "delivered" ? "Entregue" : "Cancelado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                          disabled={order.status === "delivered" || order.status === "cancelled"}
                        >
                          <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue placeholder="Atualizar status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processing">Processando</SelectItem>
                            <SelectItem value="preparing">Em Preparo</SelectItem>
                            <SelectItem value="out_for_delivery">Em Entrega</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

import { Link } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, CheckCircle, XCircle } from "lucide-react";

const MyOrders = () => {
  const { orders, cancelOrder } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Package className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Link>
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">Nenhum pedido encontrado</h2>
          <Button asChild>
            <Link to="/">Fazer um pedido</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Pedido #{order.orderId}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Itens:</h4>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.product.id} className="flex justify-between">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                  <p className="text-sm">Endereço: {order.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Total: R$ {order.total.toFixed(2)}</p>
                  {order.status === 'processing' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancelar Pedido
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
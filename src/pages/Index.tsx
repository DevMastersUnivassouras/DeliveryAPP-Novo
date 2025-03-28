
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {

    navigate("/", { replace: true });
  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem vindo ao DeliveryAPP</h1>
        <p className="text-xl text-gray-600">Tee redirecionando para o catálogo</p>
        <div className="mt-4 animate-pulse">Espere um momento...</div>
      </div>
    </div>
  );
};

export default Index;

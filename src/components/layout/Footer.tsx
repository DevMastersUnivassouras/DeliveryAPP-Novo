
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              DeliveryAPP
            </h3>
            <p className="text-sm text-gray-600">
              O restaurante mais prático do Brasil.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-gray-600 hover:text-primary transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Baixe o nosso APP</h4>
            <p className="text-sm text-gray-600">
              Tenha a melhor experiência em versão de mobile
            </p>
            <div className="flex space-x-2">
              <a 
                href="#" 
                className="bg-black text-white text-xs rounded-md px-3 py-2 flex items-center"
              >
                <span>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.3-.88 3.49-.74 1.53.18 2.67.73 3.4 1.86-3.4 1.84-2.04 6.09 1.43 7.35-.52 1.47-1.24 2.9-2.4 4.05M12.03 6.92c-.16-2.56 2.04-4.74 4.48-4.92.27 2.37-2.02 4.9-4.48 4.92z"/>
                  </svg>
                </span>
                App Store
              </a>
              <a 
                href="#" 
                className="bg-black text-white text-xs rounded-md px-3 py-2 flex items-center"
              >
                <span>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 20.82c.24.52.7.88 1.22.88.18 0 .35-.04.53-.12l.05-.02c.18-.08.35-.27.35-.48V2.92c0-.21-.17-.4-.35-.48l-.05-.02c-.53-.24-1.17-.06-1.46.48l8.87 9.1-8.87 9.1c-.19.19-.29.44-.29.74"/>
                    <path d="M21.34 12.82L17.45 10.5l-3.1-2.4-8.9 9.12 8.9 9.12 3.1-2.4 3.89-2.32c.46-.28.74-.78.74-1.34v-6.12c0-.56-.28-1.06-.74-1.34"/>
                  </svg>
                </span>
                Play Store
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} DeliveryAPP
          </p>

        </div>
      </div>
    </footer>
  );
};

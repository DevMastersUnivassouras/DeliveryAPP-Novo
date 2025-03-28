
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();


  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (success) {

        navigate("/");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Entrar em uma conta existente</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link to="/register" className="font-medium text-primary hover:text-primary/90">
              criar uma nova conta
            </Link>
          </p>
        </div>
        
        <div className="mt-8 glass rounded-xl p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Endereço de email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Senha
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center transition-all"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Conta para eventuais testes:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-xs p-2 border rounded-md bg-white">
                  <p className="font-medium">Usuário Teste</p>
                  <p>user@example.com</p>
                  <p>user123</p>
                </div>
                <div className="text-xs p-2 border rounded-md bg-white">
                  <p className="font-medium">Admin</p>
                  <p>admin@example.com</p>
                  <p>admin123</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { register, user } = useAuth();
  const navigate = useNavigate();

  
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
   
    setPasswordError("");
    

    if (password !== confirmPassword) {
      setPasswordError("Senha não confere");
      return;
    }
    
    setIsRegistering(true);
    
    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Criar uma conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/90">
              Entre
            </Link>
          </p>
        </div>
        
        <div className="mt-8 glass rounded-xl p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <Label htmlFor="name" className="block text-sm font-medium">
                Nome completo
              </Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
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
                  autoComplete="new-password"
                  required
                  className="block w-full transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmar senha
              </Label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full transition-all ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="mt-1 text-xs text-red-500">{passwordError}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center transition-all"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isRegistering ? "Criando conta..." : "Criando conta"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

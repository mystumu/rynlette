
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-rynlette-purple/10 to-rynlette-lightPurple/20 p-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg animate-bounce-in">
          <h1 className="text-6xl font-bold mb-4 text-rynlette-purple">404</h1>
          <p className="text-xl text-rynlette-darkPurple mb-6">¡Ups! Página no encontrada</p>
          <p className="text-muted-foreground mb-8">La página que buscas no existe o ha sido movida.</p>
          
          <Button asChild className="bg-rynlette-purple hover:bg-rynlette-darkPurple">
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

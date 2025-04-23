
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Hero section */}
        <section className="py-16 px-4 bg-gradient-to-br from-rynlette-purple/20 to-rynlette-lightPurple/30">
          <div className="max-w-screen-lg mx-auto flex flex-col items-center text-center">
            <img 
              src="https://i.ibb.co/Tqm7gD7b/rynlette.png" 
              alt="Rynlette Logo" 
              className="h-24 w-24 mb-6 animate-bounce-in"
              onError={(e) => {
                // Fallback in case the image doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
            
            <h1 className="ryn-hero-title text-4xl md:text-5xl font-bold mb-4 text-rynlette-darkPurple transition-colors">
              Bienvenido a Rynlette
            </h1>
            
            <p className="ryn-hero-desc text-xl md:text-2xl mb-8 text-rynlette-purple max-w-lg transition-colors">
              Crea ruletas personalizadas y deja que el azar tome tus decisiones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-rynlette-purple hover:bg-rynlette-darkPurple text-white px-8 py-6 rounded-full text-lg shadow-lg transition-all transform hover:scale-105"
              >
                <Link to="/crear">Crear Nueva Ruleta</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10 px-8 py-6 rounded-full text-lg"
              >
                <Link to="/historial">Ver Historial</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 px-4">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-rynlette-darkPurple transition-colors dark:text-white">
              Características Principales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="ryn-feature-card bg-white p-6 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg dark:text-white">
                <div className="w-12 h-12 rounded-full bg-rynlette-purple/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rynlette-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-rynlette-darkPurple dark:text-white">Ruletas Personalizadas</h3>
                <p className="text-muted-foreground">Crea tus propias ruletas con opciones personalizadas. Ajusta colores, tamaños y probabilidades.</p>
              </div>
              
              <div className="ryn-feature-card bg-white p-6 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg dark:text-white">
                <div className="w-12 h-12 rounded-full bg-rynlette-orange/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rynlette-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-rynlette-darkPurple dark:text-white">Guarda tus Ruletas</h3>
                <p className="text-muted-foreground">Guarda y carga tus ruletas favoritas. Nunca pierdas una ruleta que hayas creado.</p>
              </div>
              
              <div className="ryn-feature-card bg-white p-6 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg dark:text-white">
                <div className="w-12 h-12 rounded-full bg-rynlette-teal/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rynlette-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-rynlette-darkPurple dark:text-white">Exporta Resultados</h3>
                <p className="text-muted-foreground">Guarda un historial de tus decisiones y expórtalas para revisarlas más tarde.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-4 bg-gradient-to-br from-rynlette-purple to-rynlette-darkPurple text-white">
          <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
            <p className="text-xl mb-8 opacity-90">Crea tu primera ruleta personalizada y deja que el azar decida por ti.</p>
            
            <Button 
              asChild
              variant="secondary"
              className="bg-white text-rynlette-purple hover:bg-white/90 px-8 py-6 rounded-full text-lg shadow-lg"
            >
              <Link to="/crear">¡Crear Ahora!</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

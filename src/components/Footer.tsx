
import React, { useState } from 'react';
import { Copyright } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  
  const privacyContent = `
    Rynlette respeta tu privacidad y no recopila ningún dato personal. 
    Toda la información de tus ruletas se almacena localmente en tu dispositivo y no se comparte con terceros.
    La aplicación no utiliza cookies ni tecnologías de seguimiento.
  `;
  
  const termsContent = `
    Al utilizar Rynlette, aceptas estos términos y condiciones. La aplicación se proporciona "tal cual", 
    sin garantías de ningún tipo. No nos hacemos responsables de decisiones tomadas basadas en resultados aleatorios
    generados por la aplicación. El usuario es el único responsable del contenido que crea en sus ruletas personalizadas.
  `;
  
  return (
    <footer className="footer-rynlette w-full py-4 px-4 border-t bg-white/80 backdrop-blur-sm mt-auto transition-colors">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground mb-3 sm:mb-0">
          <Copyright size={14} className="mr-1" />
          <span className="footer-rynlette-copy">2025 Rynlette - Rynverse</span>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setPrivacyOpen(true)}
            className="text-sm text-muted-foreground hover:text-rynlette-purple dark:hover:text-rynlette-lightPurple transition-colors"
          >
            Política de Privacidad
          </button>
          <button 
            onClick={() => setTermsOpen(true)}
            className="text-sm text-muted-foreground hover:text-rynlette-purple dark:hover:text-rynlette-lightPurple transition-colors"
          >
            Términos y Condiciones
          </button>
        </div>
        
        <PrivacyModal 
          open={privacyOpen} 
          onOpenChange={setPrivacyOpen}
          title="Política de Privacidad"
          content={privacyContent}
        />
        
        <PrivacyModal 
          open={termsOpen} 
          onOpenChange={setTermsOpen}
          title="Términos y Condiciones"
          content={termsContent}
        />
      </div>
    </footer>
  );
};

export default Footer;

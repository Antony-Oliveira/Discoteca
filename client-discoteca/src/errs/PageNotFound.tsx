import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Código 404</h1>
        <p className="text-lg text-gray-600 mb-8">Hummm... Essa rota ou link acessado não existe....</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

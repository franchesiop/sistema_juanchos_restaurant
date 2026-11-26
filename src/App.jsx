import { useState } from 'react';
import { Sidebar } from './componnents/Sidebar';
import { ClientesPage } from './features/clientes/ClientesPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('clientes');

  const renderModulo = () => {
    switch (activeTab) {
      case 'clientes':
        return <ClientesPage />;
      default:
        return (
          <h1 className="text-2xl font-bold capitalize text-[#211713]">
            Módulo: {activeTab}
          </h1>
        );
    }
  };

  return (
    <div className="flex h-screen gap-3.5 bg-stone-100 p-3">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto rounded-[22px] bg-white p-6">
        {renderModulo()}
      </main>
    </div>
  );
}
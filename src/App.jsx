import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import { demoCustomer, serviceOptions } from './data/catalog.js';
import { AdminView } from './pages/AdminView.jsx';
import { ClientView } from './pages/ClientView.jsx';
import { HomeView } from './pages/HomeView.jsx';
import { SelfServiceView } from './pages/SelfServiceView.jsx';
import { ShopView } from './pages/ShopView.jsx';
import { TotemView } from './pages/TotemView.jsx';
import { WashView } from './pages/WashView.jsx';
import { loadState, saveState } from './services/storage.js';

function App() {
  const [state, setState] = useState(loadState);
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [identified, setIdentified] = useState(null);
  const [washProgress, setWashProgress] = useState(0);
  const [isWashing, setIsWashing] = useState(false);
  const [selfMinutes, setSelfMinutes] = useState(10);
  const [selfRemaining, setSelfRemaining] = useState(600);
  const [selfActive, setSelfActive] = useState(false);
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (!selfActive) return undefined;
    const id = window.setInterval(() => {
      setSelfRemaining((value) => {
        if (value <= 1) {
          setSelfActive(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [selfActive]);

  const metrics = useMemo(() => {
    const vehicles = state.customers.reduce((total, item) => total + item.vehicles.length, 0);
    const washRevenue = state.washes.reduce((total, item) => total + item.price, 0);
    const shopRevenue = state.sales.reduce((total, item) => total + item.price, 0);
    return {
      customers: state.customers.length,
      vehicles,
      washes: state.washes.length,
      revenue: washRevenue + shopRevenue,
      products: state.sales.length,
    };
  }, [state]);

  function addCustomer(customer) {
    setState((current) => ({
      ...current,
      customers: [{ ...customer, id: crypto.randomUUID() }, ...current.customers],
    }));
  }

  function findByPlate(plate) {
    const cleanPlate = plate.trim().toUpperCase();
    const customers = state.customers.length ? state.customers : [demoCustomer()];
    const customer = customers.find((item) =>
      item.vehicles.some((vehicle) => vehicle.plate.toUpperCase() === cleanPlate)
    );
    if (!customer) {
      setIdentified(null);
      return;
    }
    const vehicle = customer.vehicles.find((item) => item.plate.toUpperCase() === cleanPlate);
    setIdentified({ customer, vehicle, method: 'Placa' });
  }

  function simulateIdentification(method) {
    const customer = state.customers[0] || demoCustomer();
    const vehicle = customer.vehicles[0];
    setIdentified({ customer, vehicle, method });
  }

  function startWash() {
    if (isWashing) return;
    const entry = new Date();
    setIsWashing(true);
    setWashProgress(0);
    setCheckout(null);
    const id = window.setInterval(() => {
      setWashProgress((value) => {
        const next = Math.min(value + 20, 100);
        if (next === 100) {
          window.clearInterval(id);
          const exit = new Date();
          const wash = {
            id: crypto.randomUUID(),
            service: selectedService.name,
            price: selectedService.price,
            entry: entry.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            exit: exit.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          };
          setCheckout(wash);
          setIsWashing(false);
          setState((current) => ({ ...current, washes: [wash, ...current.washes] }));
        }
        return next;
      });
    }, 650);
  }

  function buyProduct(product) {
    const sale = { ...product, id: crypto.randomUUID(), time: new Date().toLocaleTimeString('pt-BR') };
    setState((current) => ({ ...current, sales: [sale, ...current.sales] }));
  }

  return (
    <HashRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="workspace">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/cliente" element={<ClientView state={state} addCustomer={addCustomer} />} />
            <Route
              path="/totem"
              element={
                <TotemView
                  identified={identified}
                  findByPlate={findByPlate}
                  simulateIdentification={simulateIdentification}
                />
              }
            />
            <Route
              path="/lavagem"
              element={
                <WashView
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  washProgress={washProgress}
                  isWashing={isWashing}
                  startWash={startWash}
                  checkout={checkout}
                />
              }
            />
            <Route
              path="/self-service"
              element={
                <SelfServiceView
                  selfMinutes={selfMinutes}
                  setSelfMinutes={setSelfMinutes}
                  selfRemaining={selfRemaining}
                  setSelfRemaining={setSelfRemaining}
                  selfActive={selfActive}
                  setSelfActive={setSelfActive}
                />
              }
            />
            <Route path="/shop" element={<ShopView buyProduct={buyProduct} latestSale={state.sales[0]} />} />
            <Route path="/dashboard" element={<AdminView metrics={metrics} state={state} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;

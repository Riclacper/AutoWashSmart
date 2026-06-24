import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import { demoCustomer, demoState, serviceOptions } from './data/catalog.js';
import { AdminView } from './pages/AdminView.jsx';
import { AccessView } from './pages/AccessView.jsx';
import { ClientProfileView } from './pages/ClientProfileView.jsx';
import { ClientPortalView } from './pages/ClientPortalView.jsx';
import { ClientView } from './pages/ClientView.jsx';
import { HomeView } from './pages/HomeView.jsx';
import { LandingView } from './pages/LandingView.jsx';
import { SelfServiceView } from './pages/SelfServiceView.jsx';
import { ShopView } from './pages/ShopView.jsx';
import { TotemView } from './pages/TotemView.jsx';
import { WashView } from './pages/WashView.jsx';
import { loadState, saveState } from './services/storage.js';

const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function getDayLabel(date = new Date()) {
  return dayLabels[date.getDay()];
}

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
            day: getDayLabel(entry),
            createdAt: exit.getTime(),
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
    const now = new Date();
    const sale = {
      ...product,
      id: crypto.randomUUID(),
      time: now.toLocaleTimeString('pt-BR'),
      day: getDayLabel(now),
      createdAt: now.getTime(),
    };
    setState((current) => ({ ...current, sales: [sale, ...current.sales] }));
  }

  function resetDemoData() {
    setIdentified(null);
    setCheckout(null);
    setWashProgress(0);
    setIsWashing(false);
    setState(JSON.parse(JSON.stringify(demoState)));
  }

  const clientRoutes = (
    <div className="app-shell">
      <Sidebar mode="client" />
      <main className="workspace">
        <Routes>
          <Route index element={<Navigate to="portal" replace />} />
          <Route path="portal" element={<ClientPortalView state={state} />} />
          <Route path="dados" element={<ClientProfileView state={state} />} />
          <Route path="shop" element={<ShopView buyProduct={buyProduct} latestSale={state.sales[0]} />} />
          <Route path="*" element={<Navigate to="/app/cliente/portal" replace />} />
        </Routes>
      </main>
    </div>
  );

  const adminRoutes = (
    <div className="app-shell">
      <Sidebar mode="admin" />
      <main className="workspace">
        <Routes>
          <Route index element={<HomeView />} />
          <Route path="clientes" element={<ClientView state={state} addCustomer={addCustomer} />} />
          <Route
            path="totem"
            element={
              <TotemView
                identified={identified}
                findByPlate={findByPlate}
                simulateIdentification={simulateIdentification}
              />
            }
          />
          <Route
            path="lavagem"
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
            path="self-service"
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
          <Route path="shop" element={<ShopView buyProduct={buyProduct} latestSale={state.sales[0]} />} />
          <Route path="dashboard" element={<AdminView metrics={metrics} state={state} resetDemoData={resetDemoData} />} />
          <Route path="*" element={<Navigate to="/app/admin" replace />} />
        </Routes>
      </main>
    </div>
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/app" element={<AccessView />} />
        <Route path="/app/cliente/*" element={clientRoutes} />
        <Route path="/app/admin/*" element={adminRoutes} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

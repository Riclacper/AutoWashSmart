import { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import { demoState, selfServiceOptions, serviceOptions } from './data/catalog.js';
import { AccessView } from './pages/AccessView.jsx';
import { AdminView } from './pages/AdminView.jsx';
import { ClientPortalView } from './pages/ClientPortalView.jsx';
import { ClientProfileView } from './pages/ClientProfileView.jsx';
import { ClientView } from './pages/ClientView.jsx';
import { HomeView } from './pages/HomeView.jsx';
import { LandingView } from './pages/LandingView.jsx';
import { SelfServiceView } from './pages/SelfServiceView.jsx';
import { ShopView } from './pages/ShopView.jsx';
import { TotemView } from './pages/TotemView.jsx';
import { WashView } from './pages/WashView.jsx';
import { loadState, migrateState, saveState } from './services/storage.js';
import {
  buildPaymentRecord,
  buildSelfServiceSession,
  buildWashRecord,
  findDuplicateCustomerReason,
  findVehicleOwnerByPlate,
} from './utils/operations.js';
import { normalizeEmail, normalizePlate } from './utils/validators.js';

function App() {
  const [state, setState] = useState(loadState);
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [identified, setIdentified] = useState(null);
  const [washProgress, setWashProgress] = useState(0);
  const [isWashing, setIsWashing] = useState(false);
  const [selfMinutes, setSelfMinutes] = useState(selfServiceOptions[0].minutes);
  const [selfRemaining, setSelfRemaining] = useState(selfServiceOptions[0].minutes * 60);
  const [selfActive, setSelfActive] = useState(false);
  const [activeSelfServiceId, setActiveSelfServiceId] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const washIntervalRef = useRef(null);

  function clearWashTimer() {
    if (!washIntervalRef.current) return;
    window.clearInterval(washIntervalRef.current);
    washIntervalRef.current = null;
  }

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => clearWashTimer, []);

  useEffect(() => {
    if (!selfActive) return undefined;

    const intervalId = window.setInterval(() => {
      setSelfRemaining((value) => {
        if (value <= 1) {
          setSelfActive(false);
          setState((current) => ({
            ...current,
            selfServiceSessions: current.selfServiceSessions.map((session) =>
              session.id === activeSelfServiceId
                ? {
                    ...session,
                    status: 'Concluído',
                    completedAt: new Date().toISOString(),
                  }
                : session,
            ),
          }));
          setActiveSelfServiceId(null);
          setIdentified(null);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [activeSelfServiceId, selfActive]);

  const metrics = useMemo(() => {
    const vehicles = state.customers.reduce(
      (total, customer) => total + customer.vehicles.length,
      0,
    );
    const payments = state.payments || [];
    const revenue = payments.reduce((total, item) => total + item.price, 0);

    return {
      customers: state.customers.length,
      vehicles,
      washes: state.washes.length,
      selfService: state.selfServiceSessions.length,
      revenue,
      products: state.sales.length,
    };
  }, [state]);

  function addCustomer(customer) {
    const duplicateReason = findDuplicateCustomerReason(state.customers, customer);
    if (duplicateReason) return { ok: false, message: duplicateReason };

    const normalizedCustomer = {
      ...customer,
      id: crypto.randomUUID(),
      name: customer.name.trim(),
      cpf: customer.cpf.trim(),
      email: normalizeEmail(customer.email),
      phone: customer.phone.trim(),
      qrToken: `QR-${normalizePlate(customer.vehicles[0].plate)}`,
      faceLabel: customer.name.trim(),
      vehicles: customer.vehicles.map((vehicle) => ({
        ...vehicle,
        id: crypto.randomUUID(),
        plate: normalizePlate(vehicle.plate),
        brand: vehicle.brand.trim(),
        model: vehicle.model.trim(),
        color: vehicle.color.trim(),
      })),
    };

    setState((current) => ({
      ...current,
      customers: [normalizedCustomer, ...current.customers],
    }));

    return { ok: true, message: 'Cliente e veículos cadastrados com sucesso.' };
  }

  function findByPlate(plate) {
    const result = findVehicleOwnerByPlate(state.customers, plate);
    if (!result) {
      setIdentified(null);
      return { ok: false, message: 'Placa não encontrada. Verifique o cadastro.' };
    }

    setIdentified({ ...result, method: 'Placa' });
    return {
      ok: true,
      message: `${result.customer.name} identificado pelo veículo ${result.vehicle.plate}.`,
    };
  }

  function simulateIdentification(method, customerId, plate) {
    const customer = state.customers.find((item) => item.id === customerId);
    const vehicle = customer?.vehicles.find(
      (item) => normalizePlate(item.plate) === normalizePlate(plate),
    );

    if (!customer || !vehicle) {
      setIdentified(null);
      return { ok: false, message: 'Perfil demonstrativo não encontrado.' };
    }

    setIdentified({ customer, vehicle, method });
    return {
      ok: true,
      message: `${method} validado para ${customer.name} e ${vehicle.plate}.`,
    };
  }

  function startWash() {
    if (!identified) {
      return { ok: false, message: 'Identifique um cliente e um veículo no totem primeiro.' };
    }
    if (isWashing) return { ok: false, message: 'Já existe uma lavagem em andamento.' };

    clearWashTimer();
    const washIdentification = identified;
    const entry = new Date();
    setIsWashing(true);
    setWashProgress(0);
    setCheckout(null);

    const intervalId = window.setInterval(() => {
      setWashProgress((value) => {
        const next = Math.min(value + 20, 100);
        if (next === 100) {
          clearWashTimer();
          const exit = new Date();
          const wash = buildWashRecord({
            identified: washIdentification,
            selectedService,
            entry,
            exit,
            id: crypto.randomUUID(),
          });
          const payment = buildPaymentRecord({
            id: crypto.randomUUID(),
            sourceId: wash.id,
            sourceType: 'wash',
            service: wash.service,
            price: wash.price,
            customerId: wash.customerId,
            customerName: wash.customerName,
            vehiclePlate: wash.vehiclePlate,
            createdAt: exit,
          });
          setCheckout(payment);
          setIsWashing(false);
          setIdentified(null);
          setState((current) => ({
            ...current,
            washes: [wash, ...current.washes],
            payments: [payment, ...(current.payments || [])],
          }));
        }
        return next;
      });
    }, 650);
    washIntervalRef.current = intervalId;

    return {
      ok: true,
      message: `Lavagem ${selectedService.name} iniciada para ${washIdentification.vehicle.plate}.`,
    };
  }

  function startSelfService(minutes) {
    if (!identified) {
      return { ok: false, message: 'Identifique um cliente e um veículo no totem primeiro.' };
    }
    if (selfActive) return { ok: false, message: 'O box já está em uso.' };

    const option = selfServiceOptions.find((item) => item.minutes === minutes);
    if (!option) return { ok: false, message: 'Tempo de self-service inválido.' };

    const session = buildSelfServiceSession({
      identified,
      minutes: option.minutes,
      price: option.price,
      startedAt: new Date(),
      id: crypto.randomUUID(),
    });
    const payment = buildPaymentRecord({
      id: crypto.randomUUID(),
      sourceId: session.id,
      sourceType: 'self-service',
      service: `Self-service ${option.minutes} min`,
      price: option.price,
      customerId: session.customerId,
      customerName: session.customerName,
      vehiclePlate: session.vehiclePlate,
      createdAt: new Date(session.createdAt),
    });

    setSelfMinutes(option.minutes);
    setSelfRemaining(option.minutes * 60);
    setSelfActive(true);
    setActiveSelfServiceId(session.id);
    setState((current) => ({
      ...current,
      selfServiceSessions: [session, ...current.selfServiceSessions],
      payments: [payment, ...(current.payments || [])],
    }));

    return {
      ok: true,
      message: `Box liberado por ${option.minutes} minutos para ${identified.vehicle.plate}.`,
    };
  }

  function buyProduct(product, customerOverride = null) {
    const now = new Date();
    const customer = customerOverride || identified?.customer;
    if (!customer) {
      return { ok: false, message: 'Identifique um cliente no totem antes de liberar a compra.' };
    }

    const sale = {
      ...product,
      id: crypto.randomUUID(),
      type: 'sale',
      customerId: customer.id,
      customerName: customer.name,
      time: now.toLocaleTimeString('pt-BR'),
      day: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][now.getDay()],
      createdAt: now.getTime(),
    };
    const payment = buildPaymentRecord({
      id: crypto.randomUUID(),
      sourceId: sale.id,
      sourceType: 'sale',
      service: sale.name,
      price: sale.price,
      customerId: sale.customerId,
      customerName: sale.customerName,
      createdAt: now,
    });
    setState((current) => ({
      ...current,
      sales: [sale, ...current.sales],
      payments: [payment, ...(current.payments || [])],
    }));
    return { ok: true, message: `Produto liberado para ${customer.name}.` };
  }

  function resetDemoData() {
    clearWashTimer();
    setIdentified(null);
    setCheckout(null);
    setWashProgress(0);
    setIsWashing(false);
    setSelfMinutes(selfServiceOptions[0].minutes);
    setSelfRemaining(selfServiceOptions[0].minutes * 60);
    setSelfActive(false);
    setActiveSelfServiceId(null);
    setState(migrateState(JSON.parse(JSON.stringify(demoState))));
  }

  const clientRoutes = (
    <div className="app-shell">
      <Sidebar mode="client" />
      <main className="workspace">
        <Routes>
          <Route index element={<Navigate to="portal" replace />} />
          <Route path="portal" element={<ClientPortalView state={state} />} />
          <Route path="dados" element={<ClientProfileView state={state} />} />
          <Route
            path="shop"
            element={
              <ShopView
                buyProduct={buyProduct}
                customer={state.customers[0]}
                latestPayment={state.payments?.find(
                  (payment) => payment.customerId === state.customers[0]?.id,
                )}
              />
            }
          />
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
                customers={state.customers}
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
                identified={identified}
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
                identified={identified}
                selfMinutes={selfMinutes}
                setSelfMinutes={setSelfMinutes}
                selfRemaining={selfRemaining}
                setSelfRemaining={setSelfRemaining}
                selfActive={selfActive}
                startSelfService={startSelfService}
                latestPayment={state.payments?.find(
                  (payment) => payment.sourceType === 'self-service',
                )}
              />
            }
          />
          <Route
            path="shop"
            element={
              <ShopView
                buyProduct={buyProduct}
                identified={identified}
                latestPayment={state.payments?.[0]}
              />
            }
          />
          <Route
            path="dashboard"
            element={<AdminView metrics={metrics} state={state} resetDemoData={resetDemoData} />}
          />
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

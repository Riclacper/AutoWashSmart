import { demoState } from '../data/catalog.js';
import { normalizeEmail, normalizePlate } from '../utils/validators.js';

const storageKey = 'autowash-smart-state';
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export const initialState = {
  customers: [],
  washes: [],
  selfServiceSessions: [],
  sales: [],
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function fallbackId(prefix, value, index) {
  const suffix = String(value || index || 'demo')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `${prefix}-${suffix || index || 'demo'}`;
}

function firstVehicle(customer) {
  return asArray(customer?.vehicles)[0] || null;
}

function findCustomerByPlate(customers, plate) {
  const normalizedPlate = normalizePlate(plate);
  if (!normalizedPlate) return null;

  return customers.find((customer) =>
    asArray(customer.vehicles).some((vehicle) => normalizePlate(vehicle.plate) === normalizedPlate),
  );
}

function findVehicleByPlate(customer, plate) {
  const normalizedPlate = normalizePlate(plate);
  return asArray(customer?.vehicles).find(
    (vehicle) => normalizePlate(vehicle.plate) === normalizedPlate,
  );
}

function migrateCustomers(customers) {
  return asArray(customers).map((customer, customerIndex) => {
    const id = customer.id || fallbackId('customer', customer.email || customer.cpf, customerIndex);
    const vehicles = asArray(customer.vehicles).map((vehicle, vehicleIndex) => {
      const plate = normalizePlate(vehicle.plate);
      return {
        id: vehicle.id || fallbackId('vehicle', plate, vehicleIndex),
        plate,
        brand: String(vehicle.brand || '').trim(),
        model: String(vehicle.model || '').trim(),
        color: String(vehicle.color || '').trim(),
        category: vehicle.category || 'Hatch',
      };
    });
    const primaryPlate = vehicles[0]?.plate || normalizePlate(customer.plate);

    return {
      ...customer,
      id,
      name: String(customer.name || 'Cliente demo').trim(),
      cpf: customer.cpf || customer.document || '',
      email: normalizeEmail(customer.email),
      phone: customer.phone || '',
      plan: customer.plan || 'Smart Plus',
      qrToken: customer.qrToken || (primaryPlate ? `QR-${primaryPlate}` : `QR-${id.toUpperCase()}`),
      faceLabel: customer.faceLabel || customer.name || 'Cliente demo',
      authorized: asArray(customer.authorized),
      vehicles,
    };
  });
}

function migrateOperationLink(item, customers) {
  const explicitCustomer = customers.find((customer) => customer.id === item.customerId);
  const plateCustomer = findCustomerByPlate(customers, item.vehiclePlate || item.plate);
  const customer = explicitCustomer || plateCustomer || customers[0] || null;
  const vehicle =
    findVehicleByPlate(customer, item.vehiclePlate || item.plate) || firstVehicle(customer);

  return {
    customerId: customer?.id || null,
    customerName: item.customerName || customer?.name || 'Cliente não identificado',
    vehiclePlate: normalizePlate(item.vehiclePlate || item.plate || vehicle?.plate) || null,
    vehicleModel: item.vehicleModel || [vehicle?.brand, vehicle?.model].filter(Boolean).join(' '),
  };
}

function migrateWashes(washes, customers) {
  return asArray(washes).map((wash, index) => {
    const link = migrateOperationLink(wash, customers);
    const createdAt = Number(wash.createdAt) || Date.now() + index;

    return {
      ...wash,
      id: wash.id || fallbackId('wash', createdAt, index),
      type: 'wash',
      ...link,
      identificationMethod: wash.identificationMethod || wash.method || 'Migração',
      service: wash.service || 'Express',
      price: Number(wash.price) || 0,
      paymentStatus: wash.paymentStatus || 'Aprovado',
      status: wash.status || 'Concluída',
      entry: wash.entry || wash.time || '',
      exit: wash.exit || '',
      day: wash.day || weekDays[new Date(createdAt).getDay()],
      createdAt,
    };
  });
}

function migrateSelfServiceSessions(sessions, customers) {
  return asArray(sessions).map((session, index) => {
    const link = migrateOperationLink(session, customers);
    const createdAt = Number(session.createdAt) || Date.now() + index;

    return {
      ...session,
      id: session.id || fallbackId('self', createdAt, index),
      type: 'self-service',
      ...link,
      identificationMethod: session.identificationMethod || session.method || 'Migração',
      minutes: Number(session.minutes) || 10,
      price: Number(session.price) || 0,
      status: session.status || 'Concluído',
      startedAt: session.startedAt || new Date(createdAt).toISOString(),
      completedAt: session.completedAt || null,
      day: session.day || weekDays[new Date(createdAt).getDay()],
      createdAt,
    };
  });
}

function migrateSales(sales, customers) {
  return asArray(sales).map((sale, index) => {
    const customer = customers.find((item) => item.id === sale.customerId) || customers[0] || null;
    const createdAt = Number(sale.createdAt) || Date.now() + index;

    return {
      ...sale,
      id: sale.id || fallbackId('sale', `${sale.name || 'produto'}-${createdAt}`, index),
      type: 'sale',
      customerId: customer?.id || null,
      customerName: sale.customerName || customer?.name || 'Cliente não identificado',
      name: sale.name || 'Produto',
      price: Number(sale.price) || 0,
      time: sale.time || '',
      day: sale.day || weekDays[new Date(createdAt).getDay()],
      createdAt,
    };
  });
}

export function migrateState(value) {
  const customers = migrateCustomers(value?.customers);

  return {
    customers,
    washes: migrateWashes(value?.washes, customers),
    selfServiceSessions: migrateSelfServiceSessions(value?.selfServiceSessions, customers),
    sales: migrateSales(value?.sales, customers),
  };
}

export function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return demoState;

    const parsed = JSON.parse(saved);
    const migrated = migrateState(parsed);
    const hasOperationalData =
      migrated.customers.length ||
      migrated.washes.length ||
      migrated.selfServiceSessions.length ||
      migrated.sales.length;

    return hasOperationalData ? migrated : demoState;
  } catch {
    return demoState;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Não foi possível salvar os dados locais.', error);
    return false;
  }
}

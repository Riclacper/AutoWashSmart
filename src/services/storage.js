import { demoState } from '../data/catalog.js';
import { normalizeEmail, normalizePlate } from '../utils/validators.js';

const storageKey = 'autowash-smart-state';
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export const initialState = {
  customers: [],
  washes: [],
  selfServiceSessions: [],
  sales: [],
  payments: [],
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

function operationPaymentService(item) {
  if (item.type === 'self-service') return `Self-service ${item.minutes} min`;
  return item.service || item.name || 'Serviço';
}

function operationPaymentTime(item) {
  return item.time || item.exit || item.entry || '';
}

function migratePayments(payments, operations) {
  const hasExplicitPayments = asArray(payments).length > 0;
  const source = hasExplicitPayments ? asArray(payments) : operations;

  return source.map((payment, index) => {
    const createdAt = Number(payment.createdAt) || Date.now() + index;
    const isRealTimestamp = createdAt > 1000000000000;
    const sourceId = payment.sourceId || payment.id || null;

    return {
      ...payment,
      id: hasExplicitPayments
        ? payment.id || fallbackId('payment', sourceId || createdAt, index)
        : fallbackId('payment', sourceId || createdAt, index),
      type: 'payment',
      sourceId,
      sourceType: payment.sourceType || payment.type || 'operation',
      service: operationPaymentService(payment),
      price: Number(payment.price) || 0,
      customerId: payment.customerId || null,
      customerName: payment.customerName || 'Cliente não identificado',
      vehiclePlate: normalizePlate(payment.vehiclePlate || payment.plate) || null,
      date:
        payment.date ||
        payment.paymentDate ||
        (isRealTimestamp ? new Date(createdAt).toLocaleDateString('pt-BR') : 'Dados demo'),
      time: payment.time || payment.paymentTime || operationPaymentTime(payment),
      day: payment.day || weekDays[new Date(createdAt).getDay()],
      status: hasExplicitPayments
        ? payment.status || payment.paymentStatus || 'Aprovado'
        : 'Aprovado',
      createdAt,
    };
  });
}

export function migrateState(value) {
  const customers = migrateCustomers(value?.customers);
  const washes = migrateWashes(value?.washes, customers);
  const selfServiceSessions = migrateSelfServiceSessions(value?.selfServiceSessions, customers);
  const sales = migrateSales(value?.sales, customers);
  const operations = [...washes, ...selfServiceSessions, ...sales];

  return {
    customers,
    washes,
    selfServiceSessions,
    sales,
    payments: migratePayments(value?.payments, operations),
  };
}

export function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return migrateState(demoState);

    const parsed = JSON.parse(saved);
    const migrated = migrateState(parsed);
    const hasOperationalData =
      migrated.customers.length ||
      migrated.washes.length ||
      migrated.selfServiceSessions.length ||
      migrated.sales.length ||
      migrated.payments.length;

    return hasOperationalData ? migrated : migrateState(demoState);
  } catch {
    return migrateState(demoState);
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

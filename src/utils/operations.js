import { normalizeEmail, normalizePlate, onlyDigits } from './validators.js';

export function findVehicleOwnerByPlate(customers, plate) {
  const normalizedPlate = normalizePlate(plate);
  if (!normalizedPlate) return null;

  for (const customer of customers) {
    const vehicle = customer.vehicles.find(
      (item) => normalizePlate(item.plate) === normalizedPlate,
    );
    if (vehicle) return { customer, vehicle };
  }

  return null;
}

export function findDuplicateCustomerReason(customers, candidate) {
  const document = onlyDigits(candidate.cpf);
  const email = normalizeEmail(candidate.email);
  const normalizedPlates = (candidate.vehicles || []).map((vehicle) =>
    normalizePlate(vehicle.plate),
  );
  const plates = new Set(normalizedPlates);

  if (plates.size !== normalizedPlates.length) return 'Não repita a mesma placa no cadastro.';

  for (const customer of customers) {
    if (onlyDigits(customer.cpf) === document) return 'CPF/CNPJ já cadastrado.';
    if (normalizeEmail(customer.email) === email) return 'E-mail já cadastrado.';
    if (customer.vehicles.some((vehicle) => plates.has(normalizePlate(vehicle.plate)))) {
      return 'Uma das placas informadas já está vinculada a outro cliente.';
    }
  }

  return null;
}

export function buildWashRecord({ identified, selectedService, entry, exit, id }) {
  return {
    id,
    type: 'wash',
    customerId: identified.customer.id,
    customerName: identified.customer.name,
    vehiclePlate: identified.vehicle.plate,
    vehicleModel: `${identified.vehicle.brand} ${identified.vehicle.model}`.trim(),
    identificationMethod: identified.method,
    service: selectedService.name,
    price: selectedService.price,
    paymentStatus: 'Aprovado',
    status: 'Concluída',
    entry: entry.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    exit: exit.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    day: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][entry.getDay()],
    createdAt: exit.getTime(),
  };
}

export function buildSelfServiceSession({ identified, minutes, price, startedAt, id }) {
  return {
    id,
    type: 'self-service',
    customerId: identified.customer.id,
    customerName: identified.customer.name,
    vehiclePlate: identified.vehicle.plate,
    identificationMethod: identified.method,
    minutes,
    price,
    status: 'Em andamento',
    startedAt: startedAt.toISOString(),
    day: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][startedAt.getDay()],
    createdAt: startedAt.getTime(),
  };
}

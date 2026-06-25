import { describe, expect, it } from 'vitest';
import {
  buildSelfServiceSession,
  buildWashRecord,
  findDuplicateCustomerReason,
  findVehicleOwnerByPlate,
} from '../src/utils/operations.js';

const customers = [
  {
    id: 'customer-1',
    name: 'Cliente Teste',
    cpf: '529.982.247-25',
    email: 'cliente@teste.com',
    vehicles: [{ plate: 'ABC1D23', brand: 'Honda', model: 'Civic' }],
  },
];

describe('operations', () => {
  it('localiza cliente e veículo pela placa', () => {
    const result = findVehicleOwnerByPlate(customers, 'abc-1d23');
    expect(result?.customer.id).toBe('customer-1');
    expect(result?.vehicle.plate).toBe('ABC1D23');
  });

  it('detecta duplicidade por documento, e-mail e placa', () => {
    expect(
      findDuplicateCustomerReason(customers, {
        cpf: '52998224725',
        email: 'novo@teste.com',
        vehicles: [{ plate: 'DEF2E34' }],
      }),
    ).toContain('CPF');

    expect(
      findDuplicateCustomerReason(customers, {
        cpf: '11144477735',
        email: 'CLIENTE@TESTE.COM',
        vehicles: [{ plate: 'DEF2E34' }],
      }),
    ).toContain('E-mail');

    expect(
      findDuplicateCustomerReason(customers, {
        cpf: '11144477735',
        email: 'novo@teste.com',
        vehicles: [{ plate: 'abc-1d23' }],
      }),
    ).toContain('placas');

    expect(
      findDuplicateCustomerReason([], {
        cpf: '11144477735',
        email: 'novo@teste.com',
        vehicles: [{ plate: 'DEF2E34' }, { plate: 'def-2e34' }],
      }),
    ).toContain('Não repita');
  });

  it('cria lavagem vinculada ao cliente e veículo', () => {
    const entry = new Date('2026-06-25T10:00:00-03:00');
    const exit = new Date('2026-06-25T10:20:00-03:00');
    const record = buildWashRecord({
      identified: {
        customer: customers[0],
        vehicle: customers[0].vehicles[0],
        method: 'Placa',
      },
      selectedService: { name: 'Premium', price: 69.9 },
      entry,
      exit,
      id: 'wash-test',
    });

    expect(record.customerId).toBe('customer-1');
    expect(record.vehiclePlate).toBe('ABC1D23');
    expect(record.paymentStatus).toBe('Aprovado');
  });

  it('cria sessão self-service vinculada ao cliente e veículo', () => {
    const startedAt = new Date('2026-06-25T11:00:00-03:00');
    const session = buildSelfServiceSession({
      identified: {
        customer: customers[0],
        vehicle: customers[0].vehicles[0],
        method: 'QR Code',
      },
      minutes: 20,
      price: 25,
      startedAt,
      id: 'self-test',
    });

    expect(session.customerId).toBe('customer-1');
    expect(session.vehiclePlate).toBe('ABC1D23');
    expect(session.identificationMethod).toBe('QR Code');
    expect(session.status).toBe('Em andamento');
  });
});

import { describe, expect, it } from 'vitest';
import { migrateState } from '../src/services/storage.js';

describe('storage migration', () => {
  it('normaliza clientes e cria campos de acesso em dados antigos', () => {
    const migrated = migrateState({
      customers: [
        {
          id: 'legacy-customer',
          name: 'Cliente Antigo',
          cpf: '529.982.247-25',
          email: 'CLIENTE@EXEMPLO.COM',
          vehicles: [{ plate: 'abc-1234', brand: 'VW', model: 'Gol', color: 'Branco' }],
        },
      ],
    });

    expect(migrated.customers[0].email).toBe('cliente@exemplo.com');
    expect(migrated.customers[0].qrToken).toBe('QR-ABC1234');
    expect(migrated.customers[0].vehicles[0].id).toBeTruthy();
    expect(migrated.customers[0].vehicles[0].plate).toBe('ABC1234');
  });

  it('vincula operações antigas ao cliente e veículo quando possível', () => {
    const migrated = migrateState({
      customers: [
        {
          id: 'customer-1',
          name: 'Cliente Teste',
          cpf: '529.982.247-25',
          email: 'cliente@teste.com',
          vehicles: [{ plate: 'ABC1D23', brand: 'Honda', model: 'Civic' }],
        },
      ],
      washes: [{ id: 'wash-1', service: 'Express', price: 39.9, vehiclePlate: 'abc-1d23' }],
      selfServiceSessions: [{ id: 'self-1', minutes: 10, price: 15, vehiclePlate: 'ABC1D23' }],
      sales: [{ id: 'sale-1', name: 'Cera', price: 24.9 }],
    });

    expect(migrated.washes[0].customerId).toBe('customer-1');
    expect(migrated.washes[0].vehiclePlate).toBe('ABC1D23');
    expect(migrated.selfServiceSessions[0].customerId).toBe('customer-1');
    expect(migrated.sales[0].customerId).toBe('customer-1');
  });
});

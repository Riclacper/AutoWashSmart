import { describe, expect, it } from 'vitest';
import {
  isValidCNPJ,
  isValidCPF,
  isValidDocument,
  isValidEmail,
  isValidPhone,
  isValidPlate,
  normalizePlate,
} from '../src/utils/validators.js';

describe('validators', () => {
  it('normaliza e valida placas antigas e Mercosul', () => {
    expect(normalizePlate('abc-1d23')).toBe('ABC1D23');
    expect(isValidPlate('ABC-1234')).toBe(true);
    expect(isValidPlate('ABC1D23')).toBe(true);
    expect(isValidPlate('abc1234')).toBe(true);
    expect(isValidPlate('abc-1d23')).toBe(true);
    expect(isValidPlate('AB12345')).toBe(false);
    expect(isValidPlate('ABC123')).toBe(false);
  });

  it('valida e-mail e telefone', () => {
    expect(isValidEmail('cliente@autowash.com.br')).toBe(true);
    expect(isValidEmail(' CLIENTE@AUTOWASH.COM.BR ')).toBe(true);
    expect(isValidEmail('cliente@')).toBe(false);
    expect(isValidEmail('cliente.com.br')).toBe(false);
    expect(isValidPhone('(81) 99999-0000')).toBe(true);
    expect(isValidPhone('(81) 3333-2026')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
    expect(isValidPhone('(81) 9999')).toBe(false);
  });

  it('valida CPF pelo dígito verificador', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true);
    expect(isValidCPF('111.111.111-11')).toBe(false);
    expect(isValidCPF('529.982.247-24')).toBe(false);
    expect(isValidDocument('529.982.247-25')).toBe(true);
  });

  it('valida CNPJ pelo dígito verificador', () => {
    expect(isValidCNPJ('12.345.678/0001-95')).toBe(true);
    expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
    expect(isValidCNPJ('12.345.678/0001-96')).toBe(false);
    expect(isValidDocument('12.345.678/0001-95')).toBe(true);
  });
});

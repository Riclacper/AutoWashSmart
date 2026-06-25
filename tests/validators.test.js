import { describe, expect, it } from 'vitest';
import {
  isValidCPF,
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
    expect(isValidPlate('AB12345')).toBe(false);
  });

  it('valida e-mail e telefone', () => {
    expect(isValidEmail('cliente@autowash.com.br')).toBe(true);
    expect(isValidEmail('cliente@')).toBe(false);
    expect(isValidPhone('(81) 99999-0000')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
  });

  it('valida CPF pelo dígito verificador', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true);
    expect(isValidCPF('111.111.111-11')).toBe(false);
  });
});

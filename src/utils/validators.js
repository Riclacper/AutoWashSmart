export function onlyDigits(value = '') {
  return String(value).replace(/\D/g, '');
}

export function normalizeEmail(value = '') {
  return String(value).trim().toLowerCase();
}

export function normalizePlate(value = '') {
  return String(value).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export function isValidEmail(value) {
  const email = normalizeEmail(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isValidPhone(value) {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
}

export function isValidPlate(value) {
  const plate = normalizePlate(value);
  return /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(plate);
}

function allDigitsEqual(value) {
  return /^(\d)\1+$/.test(value);
}

export function isValidCPF(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || allDigitsEqual(cpf)) return false;

  const calculateDigit = (length) => {
    const sum = cpf
      .slice(0, length)
      .split('')
      .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  return calculateDigit(9) === Number(cpf[9]) && calculateDigit(10) === Number(cpf[10]);
}

export function isValidCNPJ(value) {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14 || allDigitsEqual(cnpj)) return false;

  const calculateDigit = (base, weights) => {
    const sum = base
      .split('')
      .reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const first = calculateDigit(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = calculateDigit(`${cnpj.slice(0, 12)}${first}`, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return first === Number(cnpj[12]) && second === Number(cnpj[13]);
}

export function isValidDocument(value) {
  const digits = onlyDigits(value);
  return digits.length === 11 ? isValidCPF(digits) : isValidCNPJ(digits);
}

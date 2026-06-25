import { demoState } from '../data/catalog.js';

const storageKey = 'autowash-smart-state';

export const initialState = {
  customers: [],
  washes: [],
  selfServiceSessions: [],
  sales: [],
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return demoState;

    const parsed = JSON.parse(saved);
    const migrated = {
      customers: asArray(parsed.customers),
      washes: asArray(parsed.washes),
      selfServiceSessions: asArray(parsed.selfServiceSessions),
      sales: asArray(parsed.sales),
    };
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

import { demoState } from '../data/catalog.js';

const storageKey = 'autowash-smart-state';

export const initialState = {
  customers: [],
  washes: [],
  sales: [],
};

export function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return demoState;
    const parsed = { ...initialState, ...JSON.parse(saved) };
    const hasOperationalData = parsed.customers.length || parsed.washes.length || parsed.sales.length;
    return hasOperationalData ? parsed : demoState;
  } catch {
    return demoState;
  }
}

export function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

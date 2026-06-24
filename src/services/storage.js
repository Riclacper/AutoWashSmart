const storageKey = 'autowash-smart-state';

export const initialState = {
  customers: [],
  washes: [],
  sales: [],
};

export function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

export function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

import { AlertState, alertSlice } from "../alertSlice";

const { setAlert, removeAlert, removeAllAlerts } = alertSlice.actions;

describe('alertSlice', () => {
  let initialState: { alerts: AlertState[] };

  beforeEach(() => {
    initialState = {
      alerts: []
    };
  });

  it('should set alert correctly', () => {
    const action = setAlert({ msg: 'Test message', alertType: 'success' });
    const newState = alertSlice.reducer(initialState, action);
    expect(newState.alerts).toHaveLength(1);
    expect(newState.alerts[0].msg).toBe('Test message');
    expect(newState.alerts[0].alertType).toBe('success');
  });

  it('should remove alert correctly', () => {
    initialState.alerts = [{ id: '1', msg: 'Test message', alertType: 'success' }];
    const action = removeAlert();
    const newState = alertSlice.reducer(initialState, action);
    expect(newState.alerts).toHaveLength(0);
  });

  it('should remove all alerts correctly', () => {
    initialState.alerts = [{ id: '1', msg: 'Test message', alertType: 'success' }];
    const action = removeAllAlerts();
    const newState = alertSlice.reducer(initialState, action);
    expect(newState.alerts).toHaveLength(0);
  });
});

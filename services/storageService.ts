import { Team } from '../types';

const STORAGE_KEY = 'econ_summit_registrations';
const STATUS_KEY = 'econ_summit_registration_status';

export const getTeams = (): Team[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const registerTeam = (team: Team): void => {
  const currentTeams = getTeams();
  const updatedTeams = [...currentTeams, team];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeams));
};

export const clearTeams = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getRegistrationStatus = (): boolean => {
  const status = localStorage.getItem(STATUS_KEY);
  return status !== 'closed';
};

export const setRegistrationStatus = (isOpen: boolean): void => {
  localStorage.setItem(STATUS_KEY, isOpen ? 'open' : 'closed');
};
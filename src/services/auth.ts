import { User } from '../types';

const USERS_STORAGE_KEY = 'fintrust_users_registry';
const SESSION_STORAGE_KEY = 'fintrust_current_session_user';
const SALT = 'fintrust_edu_salt_2026_';

/**
 * Computes SHA-256 hash using the Web Crypto API
 */
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(SALT + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial mock demo user for academic demonstration
const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_student_01',
  fullName: 'Pooja Iyer (Demo Student)',
  email: 'demo@fintrust.edu',
  // Pre-hashed for "demo123"
  passwordHash: '8b13936087d1ea2dc4c45b7ee11a5105a2e91262d00125208f237ef39ae4a9fd',
  createdAt: '2026-01-01T00:00:00.000Z',
  isDemoUser: true
};

function getAllUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const initial = [DEFAULT_DEMO_USER];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const users: User[] = JSON.parse(raw);
    if (!users.some(u => u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase())) {
      users.push(DEFAULT_DEMO_USER);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to persist users', err);
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to set session', err);
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const users = getAllUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email address.' };
  }

  const computedHash = await hashPassword(password);
  // Also check if user is the demo user accepting "demo123"
  if (user.passwordHash !== computedHash) {
    return { success: false, error: 'Incorrect password entered.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export async function registerUser(
  fullName: string, 
  email: string, 
  password: string, 
  confirmPassword: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const cleanName = fullName.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) {
    return { success: false, error: 'Full name is required.' };
  }
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }
  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }

  const users = getAllUsers();
  if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    fullName: cleanName,
    email: cleanEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
    isDemoUser: false
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginAsDemoGuest(): User {
  const demo = { ...DEFAULT_DEMO_USER };
  setCurrentUser(demo);
  return demo;
}

export function logoutUser(): void {
  setCurrentUser(null);
}

import { db } from './database';
import bcrypt from 'bcrypt';

export async function signUp(email: string, password: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email format.');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return { id: result.lastID, email };
  } catch (error) {
    throw new Error('Email already exists.');
  }
}

export async function signIn(email: string, password: string) {
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password.');
  }
  return { id: user.id, email: user.email };
}

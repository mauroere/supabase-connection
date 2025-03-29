import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Abre la conexión a la base de datos SQLite
export async function getDbConnection() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

// Inicializa la base de datos con la tabla de productos
export async function initializeDatabase() {
  const db = await getDbConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT
    )
  `);

  // Inserta productos ficticios si la tabla está vacía
  const products = await db.all('SELECT * FROM products');
  if (products.length === 0) {
    await db.exec(`
      INSERT INTO products (title, description, image) VALUES
      ('Product 1', 'Description for product 1', 'https://via.placeholder.com/150'),
      ('Product 2', 'Description for product 2', 'https://via.placeholder.com/150'),
      ('Product 3', 'Description for product 3', 'https://via.placeholder.com/150'),
      ('Product 4', 'Description for product 4', 'https://via.placeholder.com/150'),
      ('Product 5', 'Description for product 5', 'https://via.placeholder.com/150')
    `);
    console.log('Inserted sample products into the database.');
  }
}

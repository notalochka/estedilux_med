import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_username ON users(username)
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT NOT NULL,
      date TEXT NOT NULL,
      title_ru TEXT NOT NULL,
      title_en TEXT NOT NULL,
      content_ru TEXT NOT NULL,
      content_en TEXT NOT NULL,
      published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    db.exec(`ALTER TABLE blogs ADD COLUMN published INTEGER DEFAULT 1`);
  } catch (error: any) {
    if (!error.message.includes('duplicate column name')) {
      console.error('Error adding published column:', error);
    }
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_blog_date ON blogs(date)
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS event_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ru TEXT NOT NULL,
      title_en TEXT NOT NULL,
      description_ru TEXT NOT NULL,
      description_en TEXT NOT NULL,
      subcategories TEXT NOT NULL,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      title_ru TEXT NOT NULL,
      title_en TEXT NOT NULL,
      description_ru TEXT,
      description_en TEXT,
      date TEXT,
      location_ru TEXT,
      location_en TEXT,
      price REAL,
      duration TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES event_categories(id)
    )
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_event_category ON events(category_id)
  `);

  try {
    db.exec('ALTER TABLE events ADD COLUMN published INTEGER DEFAULT 1');
  } catch (e) {
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_event_date ON events(date)
  `);

  const adminCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  
  if (adminCount.count === 0) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    
    try {
      db.prepare(`
        INSERT INTO users (username, password, email)
        VALUES (?, ?, ?)
      `).run('admin', hashedPassword, 'admin@estedilux-med.com');
      
      console.log('Default admin user created: username=admin, password=admin123');
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  }
}

initDatabase();

export const getUserByUsername = db.prepare(`
  SELECT * FROM users WHERE username = ?
`);

export const getUserById = db.prepare(`
  SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?
`);

export const createUser = db.prepare(`
  INSERT INTO users (username, password, email)
  VALUES (?, ?, ?)
`);

export const getAllBlogs = db.prepare(`
  SELECT * FROM blogs ORDER BY date DESC, created_at DESC
`);

export const getPublishedBlogs = db.prepare(`
  SELECT * FROM blogs WHERE published = 1 ORDER BY date DESC, created_at DESC
`);

export const getBlogById = db.prepare(`
  SELECT * FROM blogs WHERE id = ?
`);

export const createBlog = db.prepare(`
  INSERT INTO blogs (image, date, title_ru, title_en, content_ru, content_en, published)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

export const updateBlog = db.prepare(`
  UPDATE blogs 
  SET image = ?, date = ?, title_ru = ?, title_en = ?, content_ru = ?, content_en = ?, published = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const deleteBlog = db.prepare(`
  DELETE FROM blogs WHERE id = ?
`);

export const getAllEventCategories = db.prepare(`
  SELECT * FROM event_categories ORDER BY id ASC
`);

export const getEventCategoryById = db.prepare(`
  SELECT * FROM event_categories WHERE id = ?
`);

export const createEventCategory = db.prepare(`
  INSERT INTO event_categories (id, title_ru, title_en, description_ru, description_en, subcategories, icon)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

export const updateEventCategory = db.prepare(`
  UPDATE event_categories 
  SET title_ru = ?, title_en = ?, description_ru = ?, description_en = ?, subcategories = ?, icon = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const deleteEventCategory = db.prepare(`
  DELETE FROM event_categories WHERE id = ?
`);

export const getAllEvents = db.prepare(`
  SELECT * FROM events ORDER BY date ASC, created_at ASC
`);

export const getPublishedEvents = db.prepare(`
  SELECT * FROM events WHERE published = 1 ORDER BY date ASC, created_at ASC
`);

export const getEventsByCategoryId = db.prepare(`
  SELECT * FROM events WHERE category_id = ? ORDER BY date ASC, created_at ASC
`);

export const getPublishedEventsByCategoryId = db.prepare(`
  SELECT * FROM events WHERE category_id = ? AND published = 1 ORDER BY date ASC, created_at ASC
`);

export const getEventById = db.prepare(`
  SELECT * FROM events WHERE id = ?
`);

export const createEvent = db.prepare(`
  INSERT INTO events (category_id, title_ru, title_en, description_ru, description_en, date, location_ru, location_en, price, duration, image, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

export const updateEvent = db.prepare(`
  UPDATE events 
  SET category_id = ?, title_ru = ?, title_en = ?, description_ru = ?, description_en = ?, date = ?, location_ru = ?, location_en = ?, price = ?, duration = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const deleteEvent = db.prepare(`
  DELETE FROM events WHERE id = ?
`);

export default db;


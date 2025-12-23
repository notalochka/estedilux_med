const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

// Отримуємо orderReference з аргументів командного рядка
const orderRef = process.argv[2] || 'EVENT_4_1766504917155';

console.log(`\n🔍 Пошук реєстрації за order_reference: ${orderRef}\n`);

try {
  const registration = db.prepare(`
    SELECT * FROM event_registrations 
    WHERE order_reference = ?
  `).get(orderRef);

  if (registration) {
    console.log('✅ Запис знайдено:\n');
    console.log('ID:', registration.id);
    console.log('Event ID:', registration.event_id);
    console.log('Ім\'я:', registration.user_name);
    console.log('Email:', registration.user_email);
    console.log('Телефон:', registration.user_phone);
    console.log('Спеціальність:', registration.specialty || '(не вказано)');
    console.log('Тип оплати:', registration.payment_type);
    console.log('Сума:', registration.amount, 'USD');
    console.log('Order Reference:', registration.order_reference);
    console.log('Transaction ID:', registration.transaction_id || '(не вказано)');
    console.log('Статус:', registration.status);
    console.log('Створено:', registration.created_at);
    console.log('Оплачено:', registration.paid_at || '(ще не оплачено)');
  } else {
    console.log('❌ Запис не знайдено в базі даних');
    
    // Показуємо останні 5 реєстрацій для довідки
    console.log('\n📋 Останні 5 реєстрацій:');
    const recent = db.prepare(`
      SELECT order_reference, status, created_at, user_name 
      FROM event_registrations 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    recent.forEach((reg, index) => {
      console.log(`${index + 1}. ${reg.order_reference} - ${reg.status} - ${reg.user_name} (${reg.created_at})`);
    });
  }
} catch (error) {
  console.error('❌ Помилка при пошуку:', error.message);
} finally {
  db.close();
}


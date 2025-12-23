const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

// Отримуємо параметри з аргументів командного рядка
const orderRef = process.argv[2];
const newStatus = process.argv[3] || 'paid';
const transactionId = process.argv[4] || null;

if (!orderRef) {
  console.error('❌ Використання: node scripts/update-registration-status.js <order_reference> [status] [transaction_id]');
  console.error('   Приклад: node scripts/update-registration-status.js EVENT_4_1766504917155 paid 190018');
  process.exit(1);
}

console.log(`\n🔄 Оновлення статусу реєстрації: ${orderRef}\n`);

try {
  // Перевіряємо, чи існує запис
  const registration = db.prepare(`
    SELECT * FROM event_registrations 
    WHERE order_reference = ?
  `).get(orderRef);

  if (!registration) {
    console.error('❌ Запис не знайдено в базі даних');
    process.exit(1);
  }

  console.log('📋 Поточний стан:');
  console.log('   Статус:', registration.status);
  console.log('   Transaction ID:', registration.transaction_id || '(не вказано)');
  console.log('   Paid at:', registration.paid_at || '(ще не оплачено)');

  // Оновлюємо статус
  if (newStatus === 'paid') {
    db.prepare(`
      UPDATE event_registrations 
      SET status = ?, transaction_id = ?, paid_at = CURRENT_TIMESTAMP
      WHERE order_reference = ?
    `).run(newStatus, transactionId, orderRef);
  } else {
    db.prepare(`
      UPDATE event_registrations 
      SET status = ?, transaction_id = ?
      WHERE order_reference = ?
    `).run(newStatus, transactionId, orderRef);
  }

  console.log(`\n✅ Статус оновлено на: ${newStatus}`);
  if (transactionId) {
    console.log(`   Transaction ID: ${transactionId}`);
  }

  // Показуємо оновлений запис
  const updated = db.prepare(`
    SELECT * FROM event_registrations 
    WHERE order_reference = ?
  `).get(orderRef);

  console.log('\n📋 Оновлений запис:');
  console.log('   Статус:', updated.status);
  console.log('   Transaction ID:', updated.transaction_id || '(не вказано)');
  console.log('   Paid at:', updated.paid_at || '(ще не оплачено)');

} catch (error) {
  console.error('❌ Помилка при оновленні:', error.message);
  process.exit(1);
} finally {
  db.close();
}


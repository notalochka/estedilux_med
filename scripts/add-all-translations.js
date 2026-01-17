// Скрипт для автоматичного додавання перекладів через API
// Використовує API перекладу для заповнення tr та uk полів

const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE || 'http://localhost:3000';

async function translateAllCategories() {
  console.log('🚀 Starting translation of all categories...\n');
  
  try {
    const response = await fetch(`${API_BASE}/api/translate/categories-batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Categories translated successfully!');
      console.log(result);
    } else {
      console.error('❌ Failed to translate categories:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function translateAllEvents() {
  console.log('\n🚀 Starting translation of all events...\n');
  
  try {
    const response = await fetch(`${API_BASE}/api/translate/events-batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Events translated successfully!');
      console.log(result);
    } else {
      console.error('❌ Failed to translate events:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function main() {
  await translateAllCategories();
  await translateAllEvents();
  console.log('\n✨ All translations completed!');
}

main();

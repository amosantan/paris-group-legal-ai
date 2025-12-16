import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'gateway02.us-east-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3qjjvhuo9AvMUPD.4c14534c73ee',
  password: '29Xne4l50xIW6vQfTaWJ',
  database: 'KcWfniXrXNRRDvZYmnr2u6',
  ssl: { rejectUnauthorized: true }
};

console.log('=== Database Schema Verification ===\n');

try {
  const connection = await mysql.createConnection(dbConfig);
  
  // Get all tables
  const [tables] = await connection.execute(
    'SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE() ORDER BY table_name'
  );
  
  console.log('📊 Database Tables:');
  for (const table of tables) {
    const [count] = await connection.execute(`SELECT COUNT(*) as count FROM ${table.table_name}`);
    console.log(`  ${table.table_name}: ${count[0].count} rows`);
  }
  
  await connection.end();
  console.log('\n✅ Schema verification complete!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

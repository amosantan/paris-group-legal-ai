import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'gateway02.us-east-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3qjjvhuo9AvMUPD.4c14534c73ee',
  password: '29Xne4l50xIW6vQfTaWJ',
  database: 'KcWfniXrXNRRDvZYmnr2u6',
  ssl: { rejectUnauthorized: true }
};

console.log('=== Testing Database Connection ===\n');

try {
  const connection = await mysql.createConnection(dbConfig);
  console.log('✅ Database connection successful!');
  
  // Test query
  const [rows] = await connection.execute('SELECT DATABASE() as db_name');
  console.log('\n📊 Connection Details:');
  console.log('  Database:', rows[0].db_name);
  
  // Count tables
  const [tables] = await connection.execute(
    'SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = DATABASE()'
  );
  console.log('  Tables:', tables[0].count);
  
  // Get legal knowledge count
  const [articles] = await connection.execute('SELECT COUNT(*) as count FROM legalKnowledge');
  console.log('  Legal Articles:', articles[0].count);
  
  // Get users count
  const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
  console.log('  Users:', users[0].count);
  
  // Get consultations count
  const [consultations] = await connection.execute('SELECT COUNT(*) as count FROM consultations');
  console.log('  Consultations:', consultations[0].count);
  
  // Sample article
  const [sample] = await connection.execute('SELECT id, titleEn FROM legalKnowledge LIMIT 1');
  console.log('\n📄 Sample Article:');
  console.log('  ID:', sample[0].id);
  console.log('  Title:', sample[0].titleEn);
  
  await connection.end();
  console.log('\n✅ All tests passed! Database is fully functional.');
  
} catch (error) {
  console.error('❌ Database connection failed:');
  console.error('  Error:', error.message);
  process.exit(1);
}

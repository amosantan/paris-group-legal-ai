import * as dbModule from '../server/db.js';
import { legalKnowledge, consultations, messages, users } from '../drizzle/schema.js';
import { count } from 'drizzle-orm';

async function main() {
  const db = dbModule.db || dbModule.default;
  const stats = await Promise.all([
    db.select({ count: count() }).from(legalKnowledge),
    db.select({ count: count() }).from(consultations),
    db.select({ count: count() }).from(messages),
    db.select({ count: count() }).from(users),
    db.select({ 
      category: legalKnowledge.category, 
      count: count() 
    }).from(legalKnowledge).groupBy(legalKnowledge.category),
    db.select({ 
      source: legalKnowledge.source, 
      count: count() 
    }).from(legalKnowledge).groupBy(legalKnowledge.source).limit(15)
  ]);

  console.log('=== DATABASE STATISTICS ===');
  console.log('Legal Knowledge:', stats[0][0].count);
  console.log('Consultations:', stats[1][0].count);
  console.log('Messages:', stats[2][0].count);
  console.log('Users:', stats[3][0].count);
  console.log('\n=== BY CATEGORY ===');
  stats[4].forEach(r => console.log(r.category + ':', r.count));
  console.log('\n=== BY SOURCE (Top 15) ===');
  stats[5].forEach(r => console.log((r.source || 'null') + ':', r.count));
  
  process.exit(0);
}

main();

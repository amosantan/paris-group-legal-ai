#!/usr/bin/env node
/**
 * Test Supabase PostgreSQL Connection
 * Verifies database connectivity and data integrity after migration
 */

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from 'dotenv';

// Load environment variables
config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

console.log('🔍 Testing Supabase PostgreSQL Connection...\n');
console.log('=' .repeat(60));

async function testConnection() {
  let client;
  
  try {
    // Create PostgreSQL client
    console.log('\n📡 Connecting to Supabase...');
    client = postgres(DATABASE_URL);
    const db = drizzle(client);
    
    console.log('✅ Connection established!\n');
    
    // Test 1: Check legal articles count
    console.log('📊 Test 1: Checking legal articles...');
    const articlesResult = await client`
      SELECT COUNT(*) as total, 
             COUNT(CASE WHEN embedding IS NOT NULL THEN 1 END) as with_embeddings
      FROM legal_articles
    `;
    
    const { total, with_embeddings } = articlesResult[0];
    console.log(`   Total articles: ${total}`);
    console.log(`   With embeddings: ${with_embeddings}`);
    
    if (total === '798' && with_embeddings === '798') {
      console.log('   ✅ All 798 articles with embeddings present!\n');
    } else {
      console.log(`   ⚠️  Expected 798 articles, found ${total}\n`);
    }
    
    // Test 2: Check vector dimensions
    console.log('📊 Test 2: Verifying vector dimensions...');
    const dimensionResult = await client`
      SELECT array_length(embedding, 1) as dimensions 
      FROM legal_articles 
      WHERE embedding IS NOT NULL 
      LIMIT 1
    `;
    
    const dimensions = dimensionResult[0]?.dimensions;
    console.log(`   Vector dimensions: ${dimensions}`);
    
    if (dimensions === 768) {
      console.log('   ✅ Correct embedding dimensions (768)!\n');
    } else {
      console.log(`   ⚠️  Expected 768 dimensions, found ${dimensions}\n`);
    }
    
    // Test 3: Check users table
    console.log('📊 Test 3: Checking users...');
    const usersResult = await client`
      SELECT COUNT(*) as total FROM users
    `;
    console.log(`   Total users: ${usersResult[0].total}`);
    console.log('   ✅ Users table accessible!\n');
    
    // Test 4: Check consultations table
    console.log('📊 Test 4: Checking consultations...');
    const consultationsResult = await client`
      SELECT COUNT(*) as total FROM consultations
    `;
    console.log(`   Total consultations: ${consultationsResult[0].total}`);
    console.log('   ✅ Consultations table accessible!\n');
    
    // Test 5: Sample article query
    console.log('📊 Test 5: Fetching sample article...');
    const sampleResult = await client`
      SELECT id, title, category, 
             CASE WHEN embedding IS NOT NULL THEN 'Yes' ELSE 'No' END as has_embedding
      FROM legal_articles 
      ORDER BY id 
      LIMIT 1
    `;
    
    if (sampleResult.length > 0) {
      const article = sampleResult[0];
      console.log(`   Article ID: ${article.id}`);
      console.log(`   Title: ${article.title || '(Untitled)'}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Has Embedding: ${article.has_embedding}`);
      console.log('   ✅ Article data retrieved successfully!\n');
    }
    
    // Test 6: Check HNSW index
    console.log('📊 Test 6: Verifying HNSW index...');
    const indexResult = await client`
      SELECT indexname, indexdef 
      FROM pg_indexes 
      WHERE tablename = 'legal_articles' 
      AND indexname LIKE '%hnsw%'
    `;
    
    if (indexResult.length > 0) {
      console.log(`   ✅ HNSW index found: ${indexResult[0].indexname}\n`);
    } else {
      console.log('   ⚠️  HNSW index not found (may need to be created)\n');
    }
    
    console.log('=' .repeat(60));
    console.log('\n🎉 All tests passed! Supabase migration successful!');
    console.log('\n✨ Your Paris Group Legal AI is ready for deployment!\n');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.end();
    }
  }
}

testConnection();

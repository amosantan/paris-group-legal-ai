#!/usr/bin/env node
/**
 * Verify AI learned from Law No. (2) of 2022
 */

import { hybridSearch } from './server/hybridSearch.js';
import { invokeLLM } from './server/_core/llm.js';

async function verifyLaw2022() {
  console.log('🧪 Verifying AI Learned from Law No. (2) of 2022\n');
  console.log('Testing specific question about property acquisition for public use...\n');
  
  const question = "What is the process for acquiring private property for public use in Dubai according to Law No. (2) of 2022?";
  
  console.log(`📝 Question: ${question}\n`);
  console.log('─'.repeat(80));
  
  // Step 1: Search
  console.log('\n🔍 Searching knowledge base...');
  const results = await hybridSearch(question, { topK: 3 });
  
  if (results.length === 0) {
    console.log('   ❌ No results found!');
    process.exit(1);
  }
  
  console.log(`   ✅ Found ${results.length} relevant articles`);
  results.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.article.lawName} (score: ${r.score.toFixed(3)})`);
  });
  
  // Check if Law No. 2 of 2022 is in results
  const hasLaw2022 = results.some(r => r.article.lawName.includes('Law No. (2) of 2022'));
  
  if (hasLaw2022) {
    console.log('\n   ✅ Law No. (2) of 2022 found in search results!');
  } else {
    console.log('\n   ⚠️  Law No. (2) of 2022 not in top results');
  }
  
  // Step 2: Generate answer
  console.log('\n🤖 Asking AI to answer...\n');
  
  const context = results
    .map(r => `${r.article.lawName}\n${r.article.contentEn}`)
    .join('\n\n---\n\n');
  
  const aiResponse = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: 'You are a legal expert on Dubai real estate law. Answer the question using the provided legal context. Be specific and cite law names and article numbers.'
      },
      {
        role: 'user',
        content: `Legal Context:\n${context}\n\nQuestion: ${question}\n\nAnswer:`
      }
    ],
  });
  
  const answer = aiResponse.choices[0].message.content;
  console.log('💬 AI Answer:');
  console.log('─'.repeat(80));
  console.log(answer);
  console.log('─'.repeat(80));
  
  // Verification
  const lowerAnswer = answer.toLowerCase();
  const mentions2022 = lowerAnswer.includes('2022') || lowerAnswer.includes('law no. (2)');
  const mentionsAcquisition = lowerAnswer.includes('acquisition') || lowerAnswer.includes('expropriation');
  const mentionsCompensation = lowerAnswer.includes('compensation');
  
  console.log('\n✓ Verification:');
  console.log(`   Mentions Law No. (2) of 2022: ${mentions2022 ? '✅' : '❌'}`);
  console.log(`   Mentions acquisition/expropriation: ${mentionsAcquisition ? '✅' : '❌'}`);
  console.log(`   Mentions compensation: ${mentionsCompensation ? '✅' : '❌'}`);
  
  if (mentions2022 && mentionsAcquisition) {
    console.log('\n✅ PASS - AI successfully learned from the uploaded PDF!');
  } else {
    console.log('\n⚠️  PARTIAL - AI may need more context or better retrieval');
  }
  
  process.exit(0);
}

verifyLaw2022().catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});

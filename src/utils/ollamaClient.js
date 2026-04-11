import { Ollama } from 'ollama/browser';

// We initialize the Ollama browser client pointing to our Vite proxy.
// We MUST use an absolute URL (window.location.origin) because the SDK's internal URL parser will crash on relative paths.
const OLLAMA_PROXY_URL = typeof window !== 'undefined' ? `${window.location.origin}/api/ollama` : 'http://127.0.0.1:11434';
const ollama = new Ollama({ host: OLLAMA_PROXY_URL });

/**
 * Generate FAQs using RAG (Retrieval-Augmented Generation) context.
 * 
 * @param {Array<Object>} chunks - Array of chunk objects extracted from the docs.
 * @param {string} model - The name of the ollama model to use (e.g., 'llama3').
 * @returns {Promise<string>} The generated FAQ JSON string.
 */
export async function generateFaqsFromContext(chunks, model = 'llama3') {
  // 1. Build the knowledge context from the selected chunks
  const contextText = chunks
    .filter(c => c.selected)
    .map(c => `[Intent: ${c.intent}] - Content: ${c.text}`)
    .join('\n\n');

  // 2. Define the exact system prompt instructing the model HOW to behave
  const systemPrompt = `You are an expert technical writer and AI assistant that generates highly accurate, user-friendly Frequently Asked Questions (FAQs).

Your goal is to read the provided source material and generate insightful FAQs.
You MUST ONLY use the provided source material. Do not guess or hallucinate information that is not present in the text.

CRITICAL REQUIREMENT:
You must return the result STRICTLY as a raw, valid JSON array of objects. Do not include markdown codeblocks (like \`\`\`json). Just the raw JSON.

Output Format Example:
[
  {
    "question": "Exact question text?",
    "answer": "Exact detailed answer text.",
    "intent": "Category or intent type"
  }
]`;

  const userPrompt = `Generate 3 to 5 distinct FAQs based firmly on the following extracted knowledge chunks:\n\n${contextText}`;

  try {
    // 3. Make the API call to Ollama (via our proxy)
    const response = await ollama.chat({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      // Forcing the model to output JSON format (supported by modern models like llama3)
      format: 'json',
      stream: false,
    });

    return response.message.content;
  } catch (error) {
    console.error('Ollama Generation failed:', error);
    throw new Error('Failed to reach local Ollama instance. Is Ollama running on your machine?');
  }
}

/**
 * Utility to verify if the Ollama endpoint is active.
 */
export async function checkOllamaConnection() {
  try {
    const res = await fetch('/api/ollama');
    return res.ok || res.status === 200;
  } catch (e) {
    console.warn("Ollama connection check failed:", e);
    return false;
  }
}

export const MOCK_FAQS = {
  nora: [
    {
      id: "n1",
      question: "What is this new 'Shadow Integration' feature?",
      answer: "Shadow Integration is a magic tool that makes your newly generated FAQs automatically match the colors, fonts, and style of your existing website—without needing any extra design work!"
    },
    {
      id: "n2",
      question: "How do I start a new project?",
      answer: "Simply click the bold 'New Project' button on the left menu, enter your website link, describe your feature, and our AI covers the rest."
    },
    {
       id: "n3",
       question: "Do I need to know how to code to use this?",
       answer: "Not at all! Think of FAQGenie like a smart assistant. You just tell it what your feature does, and it handles all the technical background work for you."
    },
    {
       id: "n4",
       question: "What languages can I translate my FAQs into?",
       answer: "Right now we support translating into English, Hindi (हिंदी), and Marathi (मराठी) with a single click."
    },
    {
       id: "n5",
       question: "Why should I upload screenshots?",
       answer: "Screenshots help the AI see your actual app so it can understand exactly what buttons and menus do, making the FAQs much more accurate for your users."
    }
  ],
  sam: [
    {
      id: "s1",
      question: "How does the platform handle data privacy during processing?",
      answer: "We employ a Privacy Mode toggle. When enabled, your sensitive data is processed locally via Ollama instead of being sent to external APIs like Groq."
    },
    {
      id: "s2",
      question: "What happens if Groq API goes down? Will my service stop?",
      answer: "No. The system features a built-in Hybrid Failover Logic. If Groq is fully congested or goes offline, local Ollama models seamlessly take over generation."
    },
    {
      id: "s3",
      question: "Are the generated FAQs actually useful, or just generic AI text?",
      answer: "We use a rigorous RAG (Retrieval-Augmented Generation) pipeline, meaning every answer is grounded directly in your specific product documentation and extracted screen context, minimizing hallucinations."
    },
    {
      id: "s4",
      question: "How reliable is the styling match in Shadow Integration?",
      answer: "The scraper pulls the computed CSS variables, spacing utilities, and base hex palettes from the DOM of the target URL, converting them into a tailwind-compatible config that ensures precise visual alignment."
    },
    {
      id: "s5",
      question: "Who owns the generated content?",
      answer: "You do. All generated copy, code snippets, and structured data schemas are yours to own and deploy indefinitely."
    }
  ],
  paul: [
    {
      id: "p1",
      question: "What architectures are utilized for the underlying AI framework?",
      answer: "We utilize a Node.js backend to orchestrate inference calls between Groq (hosting LLaMA-3) for primary latency optimization, and local Ollama instances (Mistral/LLaVA) for vision extraction and failovers."
    },
    {
      id: "p2",
      question: "Can I extract the generated FAQs as programmatic objects?",
      answer: "Yes, you can export the assets directly as a React JSX component, a customized Tailwind configuration file, or an SEO-optimized JSON-LD Schema schema block."
    },
    {
      id: "p3",
      question: "How does the visual extraction (LLaVA) handle dense UIs?",
      answer: "LLaVA processes the image to identify standard UI states and contextual anchors, formatting the visual metadata back into the main pipeline to enrich the knowledge base vector embeddings."
    },
    {
      id: "p4",
      question: "Is there support for automated knowledge drift resolution?",
      answer: "The Knowledge Drift Monitor computes semantic distancing between active FAQs and new user search trends, triggering automated webhooks for targeted FAQ regeneration loops."
    },
    {
      id: "p5",
      question: "What embedding strategy is used in the RAG layer?",
      answer: "We use FAISS for rapid in-memory vector proximity search, ensuring sub-second context retrieval during the Groq inference phase."
    }
  ]
};

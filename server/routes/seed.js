const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Faq = require('../models/Faq');
const Source = require('../models/Source');
const DriftEvent = require('../models/DriftEvent');
const SeoReport = require('../models/SeoReport');
const Setting = require('../models/Setting');

// @route   POST /api/seed
// @desc    Seed database with demo data (creates a demo user + all mock data)
// @access  Public (one-time setup)
router.post('/', async (req, res, next) => {
  try {
    // Check if data already exists
    const existingUser = await User.findOne({ email: 'demo@faqgenie.com' });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Database already seeded. Demo user: demo@faqgenie.com / demo123456'
      });
    }

    // 1. Create demo user
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@faqgenie.com',
      password: 'demo123456'
    });

    // 2. Create settings
    await Setting.create({
      user: user._id,
      groqApiKey: 'gsk_demo_key_1234567890',
      privacyMode: false,
      textEngine: 'mistral:latest',
      visionEngine: 'llava:7b'
    });

    // 3. Create projects
    const projects = await Project.insertMany([
      {
        user: user._id,
        name: 'Payment Gateway 2.0',
        status: 'Active',
        thumbnail: 'bg-cyan-500',
        faqsCount: 5,
        seoScore: 94,
        sourceUrl: 'https://docs.paymentgateway.com',
        featureDescription: 'New payment processing system with support for UPI, cards, and wallets'
      },
      {
        user: user._id,
        name: 'Onboarding Flow',
        status: 'Active',
        thumbnail: 'bg-violet-500',
        faqsCount: 5,
        seoScore: 88,
        sourceUrl: 'https://onboarding.app/docs',
        featureDescription: 'User onboarding wizard with multi-step form and KYC verification'
      },
      {
        user: user._id,
        name: 'User Authentication',
        status: 'Draft',
        thumbnail: 'bg-slate-700',
        faqsCount: 5,
        seoScore: 65,
        sourceUrl: '',
        featureDescription: 'OAuth2 and JWT-based authentication module'
      },
      {
        user: user._id,
        name: 'Dashboard Analytics',
        status: 'Active',
        thumbnail: 'bg-green-500',
        faqsCount: 5,
        seoScore: 91,
        sourceUrl: 'https://analytics.dashboard.io',
        featureDescription: 'Real-time analytics dashboard with charts and data export'
      }
    ]);

    // 4. Create FAQs for first project (nora persona)
    const noraFaqs = [
      {
        project: projects[0]._id,
        question: "What is this new 'Shadow Integration' feature?",
        answer: "Shadow Integration is a magic tool that makes your newly generated FAQs automatically match the colors, fonts, and style of your existing website—without needing any extra design work!",
        persona: 'nora', language: 'en', intent: 'Feature Explanation', confidence: 97,
        entities: ['Shadow Integration', 'FAQ', 'website', 'design'], order: 0
      },
      {
        project: projects[0]._id,
        question: "How do I start a new project?",
        answer: "Simply click the bold 'New Project' button on the left menu, enter your website link, describe your feature, and our AI covers the rest.",
        persona: 'nora', language: 'en', intent: 'How-To / Setup', confidence: 95,
        entities: ['New Project', 'website', 'AI'], order: 1
      },
      {
        project: projects[0]._id,
        question: "Do I need to know how to code to use this?",
        answer: "Not at all! Think of FAQGenie like a smart assistant. You just tell it what your feature does, and it handles all the technical background work for you.",
        persona: 'nora', language: 'en', intent: 'Product Capability', confidence: 93,
        entities: ['FAQGenie', 'assistant', 'feature'], order: 2
      },
      {
        project: projects[0]._id,
        question: "What languages can I translate my FAQs into?",
        answer: "Right now we support translating into English, Hindi (हिंदी), and Marathi (मराठी) with a single click.",
        persona: 'nora', language: 'en', intent: 'Product Capability', confidence: 91,
        entities: ['English', 'Hindi', 'Marathi', 'translation'], order: 3
      },
      {
        project: projects[0]._id,
        question: "Why should I upload screenshots?",
        answer: "Screenshots help the AI see your actual app so it can understand exactly what buttons and menus do, making the FAQs much more accurate for your users.",
        persona: 'nora', language: 'en', intent: 'Feature Explanation', confidence: 89,
        entities: ['screenshots', 'AI', 'buttons', 'menus'], order: 4
      }
    ];

    // Sam persona FAQs
    const samFaqs = [
      {
        project: projects[0]._id,
        question: "How does the platform handle data privacy during processing?",
        answer: "We employ a Privacy Mode toggle. When enabled, your sensitive data is processed locally via Ollama instead of being sent to external APIs like Groq.",
        persona: 'sam', language: 'en', intent: 'Feature Explanation', confidence: 96,
        entities: ['Privacy Mode', 'Ollama', 'Groq', 'data privacy'], order: 0
      },
      {
        project: projects[0]._id,
        question: "What happens if Groq API goes down? Will my service stop?",
        answer: "No. The system features a built-in Hybrid Failover Logic. If Groq is fully congested or goes offline, local Ollama models seamlessly take over generation.",
        persona: 'sam', language: 'en', intent: 'Product Capability', confidence: 94,
        entities: ['Groq', 'Hybrid Failover', 'Ollama'], order: 1
      },
      {
        project: projects[0]._id,
        question: "Are the generated FAQs actually useful, or just generic AI text?",
        answer: "We use a rigorous RAG (Retrieval-Augmented Generation) pipeline, meaning every answer is grounded directly in your specific product documentation and extracted screen context, minimizing hallucinations.",
        persona: 'sam', language: 'en', intent: 'Product Capability', confidence: 93,
        entities: ['RAG', 'pipeline', 'documentation', 'hallucinations'], order: 2
      },
      {
        project: projects[0]._id,
        question: "How reliable is the styling match in Shadow Integration?",
        answer: "The scraper pulls the computed CSS variables, spacing utilities, and base hex palettes from the DOM of the target URL, converting them into a tailwind-compatible config that ensures precise visual alignment.",
        persona: 'sam', language: 'en', intent: 'Feature Explanation', confidence: 91,
        entities: ['CSS variables', 'tailwind', 'Shadow Integration'], order: 3
      },
      {
        project: projects[0]._id,
        question: "Who owns the generated content?",
        answer: "You do. All generated copy, code snippets, and structured data schemas are yours to own and deploy indefinitely.",
        persona: 'sam', language: 'en', intent: 'Pricing / Commercial', confidence: 88,
        entities: ['ownership', 'content', 'deploy'], order: 4
      }
    ];

    // Paul persona FAQs
    const paulFaqs = [
      {
        project: projects[0]._id,
        question: "What architectures are utilized for the underlying AI framework?",
        answer: "We utilize a Node.js backend to orchestrate inference calls between Groq (hosting LLaMA-3) for primary latency optimization, and local Ollama instances (Mistral/LLaVA) for vision extraction and failovers.",
        persona: 'paul', language: 'en', intent: 'Feature Explanation', confidence: 97,
        entities: ['Node.js', 'Groq', 'LLaMA-3', 'Ollama', 'Mistral', 'LLaVA'], order: 0
      },
      {
        project: projects[0]._id,
        question: "Can I extract the generated FAQs as programmatic objects?",
        answer: "Yes, you can export the assets directly as a React JSX component, a customized Tailwind configuration file, or an SEO-optimized JSON-LD Schema schema block.",
        persona: 'paul', language: 'en', intent: 'Product Capability', confidence: 95,
        entities: ['React JSX', 'Tailwind', 'JSON-LD Schema'], order: 1
      },
      {
        project: projects[0]._id,
        question: "How does the visual extraction (LLaVA) handle dense UIs?",
        answer: "LLaVA processes the image to identify standard UI states and contextual anchors, formatting the visual metadata back into the main pipeline to enrich the knowledge base vector embeddings.",
        persona: 'paul', language: 'en', intent: 'Feature Explanation', confidence: 92,
        entities: ['LLaVA', 'UI states', 'vector embeddings'], order: 2
      },
      {
        project: projects[0]._id,
        question: "Is there support for automated knowledge drift resolution?",
        answer: "The Knowledge Drift Monitor computes semantic distancing between active FAQs and new user search trends, triggering automated webhooks for targeted FAQ regeneration loops.",
        persona: 'paul', language: 'en', intent: 'Feature Explanation', confidence: 90,
        entities: ['Knowledge Drift', 'semantic distancing', 'webhooks'], order: 3
      },
      {
        project: projects[0]._id,
        question: "What embedding strategy is used in the RAG layer?",
        answer: "We use FAISS for rapid in-memory vector proximity search, ensuring sub-second context retrieval during the Groq inference phase.",
        persona: 'paul', language: 'en', intent: 'Feature Explanation', confidence: 88,
        entities: ['FAISS', 'vector', 'Groq', 'RAG'], order: 4
      }
    ];

    await Faq.insertMany([...noraFaqs, ...samFaqs, ...paulFaqs]);

    // 5. Create sources for first project
    await Source.insertMany([
      {
        project: projects[0]._id,
        type: 'file',
        name: 'product-docs-v3.pdf',
        fileSize: '2.4 MB',
        status: 'ready'
      },
      {
        project: projects[0]._id,
        type: 'file',
        name: 'help-center-export.docx',
        fileSize: '1.1 MB',
        status: 'ready'
      }
    ]);

    // 6. Create drift events
    await DriftEvent.insertMany([
      {
        project: projects[0]._id,
        title: 'New Search Term Detected',
        description: "Increase in users searching for 'offline mode API failover'.",
        actionNeeded: true,
        driftScore: 12,
        status: 'Healthy',
        trendData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Semantic Drift Index',
            data: [18, 16, 22, 14, 19, 11, 12],
            borderColor: '#A855F7',
            backgroundColor: 'rgba(168, 85, 247, 0.2)'
          }]
        }
      },
      {
        project: projects[0]._id,
        title: 'UI Update Deployed',
        description: "Visual drift detected in 'Settings' menu matching new primary blue hex.",
        actionNeeded: false,
        driftScore: 8,
        status: 'Healthy'
      },
      {
        project: projects[0]._id,
        title: 'Documentation Synced',
        description: 'RAG vectors updated with 4 new product release notes.',
        actionNeeded: false,
        driftScore: 5,
        status: 'Healthy'
      }
    ]);

    // 7. Create SEO report
    await SeoReport.create({
      project: projects[0]._id,
      score: 92,
      metrics: {
        keywordDensity: 88,
        readability: 94,
        schemaCompleteness: 100,
        userIntent: 86
      },
      suggestions: [
        { type: 'success', text: 'Optimal JSON-LD Schema generated for Google Lens.' },
        { type: 'success', text: 'Strong balance of simple and complex terminology.' },
        { type: 'warning', text: "Consider adding more semantic keywords related to 'analytics'." },
        { type: 'warning', text: "FAQ #4 ('How reliable...') could use better subheading segmentation." }
      ]
    });

    // Generate token for the demo user
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully!',
      credentials: {
        email: 'demo@faqgenie.com',
        password: 'demo123456'
      },
      token,
      summary: {
        users: 1,
        projects: projects.length,
        faqs: noraFaqs.length + samFaqs.length + paulFaqs.length,
        sources: 2,
        driftEvents: 3,
        seoReports: 1
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

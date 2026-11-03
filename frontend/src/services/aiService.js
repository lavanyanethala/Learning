// AI Coaching Service for Interview Questions
// Supports both dynamic intelligent offline coaching and live Gemini API when API key is provided.
import { getExamQuestions } from "../data/examQuestionsData";

export const aiService = {
  getApiKey() {
    return localStorage.getItem("GEMINI_API_KEY") || "";
  },

  setApiKey(key) {
    localStorage.setItem("GEMINI_API_KEY", key.trim());
  },

  // Generate answer structure / strategy advice
  async getAnswerBlueprint(question, category = "Frontend") {
    const key = this.getApiKey();
    if (key) {
      try {
        return await this.callGeminiAPI(
          `You are an elite Tech Interview Coach. Provide a structured guide on how to answer this interview question:
Question: "${question}"
Category: "${category}"

Format your response in clean markdown with:
1. Core Mental Model (what is the interviewer really testing?)
2. Recommended Answering Structure (Step-by-step breakdown: Concept -> Deep Dive -> Code/Example -> Tradeoffs)
3. Key Technical Keywords to mention
4. Common Pitfalls / Traps to avoid`
        );
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local expert engine:", err);
      }
    }

    // Local Expert Engine Blueprint
    return this.generateLocalBlueprint(question, category);
  },

  // Evaluate the student's draft answer
  async evaluateStudentAnswer(question, studentAnswer, category = "Frontend") {
    const key = this.getApiKey();
    if (key) {
      try {
        return await this.callGeminiAPI(
          `You are an interviewer evaluating a candidate's answer for the following question:
Question: "${question}"
Category: "${category}"

Candidate's Answer:
"""
${studentAnswer}
"""

Please provide a detailed review in clear markdown:
1. Readiness Score (out of 100)
2. Strengths (what the candidate did well)
3. Areas for Improvement / Missing Points (crucial concepts they omitted)
4. Upgraded / Polished Version (how a Senior Engineer would deliver this answer)`
        );
      } catch (err) {
        console.warn("Gemini API failed, falling back to local engine:", err);
      }
    }

    return this.generateLocalEvaluation(question, studentAnswer, category);
  },

  // Generate a full comprehensive model answer
  async generateModelAnswer(question, category = "Frontend", existingAnswer = "") {
    const key = this.getApiKey();
    if (key) {
      try {
        return await this.callGeminiAPI(
          `You are a Senior Principal Engineer. Provide an exemplary, thorough, and professional interview response to:
Question: "${question}"
Category: "${category}"
${existingAnswer ? `Trainer Notes: "${existingAnswer}"` : ""}

Include:
- Concise 30-second elevator pitch
- In-depth technical explanation
- Code example / pattern if applicable
- Practical tradeoffs / real-world experience tip`
        );
      } catch (err) {
        console.warn("Gemini API failed, falling back to local engine:", err);
      }
    }

    return this.generateLocalModelAnswer(question, category, existingAnswer);
  },

  // Live Google Gemini API Caller
  async callGeminiAPI(prompt) {
    const apiKey = this.getApiKey();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini API request failed (${res.status})`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  },

  // --- Local Expert Engines ---

  generateLocalBlueprint(question, category) {
    const qLower = question.toLowerCase();

    let keywords = ["Performance", "Maintainability", "Scalability", "Clean Code"];
    if (qLower.includes("react") || category.toLowerCase().includes("react")) {
      keywords = ["Virtual DOM", "Reconciliation", "Hooks Lifecycle", "State Immutability", "Re-renders Optimization", "Memoization"];
    } else if (qLower.includes("javascript") || qLower.includes("js")) {
      keywords = ["Event Loop", "Closure & Lexical Scope", "Prototypes", "Asynchronous Promises", "Memory Leaks", "Execution Context"];
    } else if (qLower.includes("css") || qLower.includes("html")) {
      keywords = ["Box Model", "Flexbox / CSS Grid", "Specificity & Cascade", "Semantic HTML", "Reflow & Repaint", "Responsive Design"];
    } else if (qLower.includes("system") || qLower.includes("architecture")) {
      keywords = ["High Availability", "Microservices vs Monolith", "Caching (Redis/CDN)", "Database Sharding", "Load Balancing", "Latency vs Throughput"];
    }

    return `### 🎯 Strategy Blueprint: How to Master this Question

#### 1. What Interviewers Are Looking For:
* **Conceptual Clarity**: Can you explain the *why*, not just recite the syntax?
* **Depth & Mechanics**: Understanding what happens behind the scenes.
* **Trade-offs**: Knowing when to use it, when *not* to use it, and potential pitfalls.

#### 2. The Recommended 4-Step Answering Framework:
1. **The 30-Second High-Level Definition**:
   Start with a punchy, crystal-clear definition without rambling. (e.g., *"In simple terms, X is a mechanism that solves Y by..."*)
2. **Deep-Dive / How it Works Under the Hood**:
   Explain the engine mechanics, state transitions, or algorithm.
3. **Real-World Code or Architecture Example**:
   Provide a concrete scenario from a project where you applied this solution.
4. **Edge Cases & Tradeoffs**:
   Conclude by explaining performance implications, limitations, or alternative solutions.

#### 3. Power Keywords to Mention:
${keywords.map((k) => `* \`${k}\``).join("\n")}

#### 4. Common Traps to Avoid:
* ❌ Avoid giving a vague one-sentence answer and stopping abruptly.
* ❌ Avoid diving into low-level syntax before defining the broader concept.
* ❌ Do not claim a technology is "always better"—acknowledge nuances and trade-offs.`;
  },

  generateLocalEvaluation(question, studentAnswer, category) {
    if (!studentAnswer || studentAnswer.trim().length < 15) {
      return `### ⚠️ Answer Too Short to Evaluate

Your current draft is very brief. To give you constructive feedback:
* Aim for at least 3-5 sentences covering:
  1. High-level definition
  2. Practical use case
  3. Key benefit or tradeoff.

Try expanding your answer and click **Analyze My Answer** again!`;
    }

    const words = studentAnswer.trim().split(/\s+/).length;
    let score = Math.min(95, Math.max(45, Math.floor(words * 1.5 + 40)));
    const hasExample = /example|instance|project|used|when|like/i.test(studentAnswer);
    const hasTradeoff = /tradeoff|however|downside|performance|cost|overhead|limitation/i.test(studentAnswer);

    if (hasExample) score += 5;
    if (hasTradeoff) score += 5;
    score = Math.min(score, 98);

    return `### 📊 AI Evaluation Report

**Readiness Score**: **${score}/100** ${score >= 80 ? "🌟 Excellent!" : score >= 65 ? "👍 Solid Draft" : "💡 Needs More Depth"}

---

#### ✅ Strengths:
* Clear attempt to define the core concept directly.
* Word count is appropriate (~${words} words) for a spoken response.
${hasExample ? "* Great job including a practical example or use case!" : "* You maintained good focus on the subject."}

#### 🛠️ Areas to Strengthen:
${!hasExample ? "* **Add a concrete example**: Interviewers love hearing: *\"For instance, in my last project, we handled this by...\"*" : ""}
${!hasTradeoff ? "* **Discuss Trade-offs or Edge Cases**: Mention when *not* to use this approach or what performance bottlenecks to watch out for." : ""}
* **Structure Tip**: Speak in distinct paragraphs (Definition ➡️ Mechanism ➡️ Example ➡️ Tradeoff) to make your thoughts effortless to follow.

---

#### 🚀 Polished Senior-Level Delivery:
> *"When tackling **${question.replace(/[?]/g, "")}**, I always like to break it down into two aspects: the core architectural benefit and the operational trade-off.*
>
> *${studentAnswer.trim()}*
>
> *In production environments, the key to doing this reliably is ensuring observability, avoiding unnecessary re-computations, and maintaining clear modular boundaries."*`;
  },

  generateLocalModelAnswer(question, category, existingAnswer) {
    return `### 🏆 Model Answer Breakdown

#### 💡 The Quick Pitch (30 Seconds):
When asked **"${question}"**, deliver a structured, confident response that showcases your domain mastery:
> *"At its core, this addresses how we build scalable, maintainable, and high-performance applications. By understanding the underlying architecture and execution flow, we can make informed engineering decisions rather than guessing."*

${existingAnswer ? `#### 📌 Trainer Key Reference Notes:\n${existingAnswer}\n` : ""}

#### 🔍 Technical Deep-Dive:
1. **The Fundamental Concept**:
   Explain the primary responsibility and what problem it solves in modern web development.
2. **Core Operational Workflow**:
   Trace the data or lifecycle flow step-by-step from initiation to resolution.
3. **Production Best Practices**:
   * Keep state predictable and avoid premature optimization.
   * Leverage caching, memoization, and lazy loading where appropriate.
   * Write defensive unit/integration tests to protect against regressions.

#### 💼 Pro-Tip for the Interview:
Always ask a clarifying question if the scope is broad (e.g., *"Are we considering this in the context of single-page applications or server-side rendering?"*). This immediately distinguishes you as an experienced engineer.`;
  },

  // --- End-to-End AI Job Description (JD) Interview Copilot ---
  async generateJDInterviewPlan({ jobTitle = "Frontend Developer", company = "Target Company", jobDescription = "", prepDays = 7, dailyHours = 4 }) {
    const key = this.getApiKey();
    if (key) {
      try {
        const prompt = `You are a World-Class Tech Interview Coach and FAANG Hiring Manager.
Analyze the following Job Description (JD) and generate a comprehensive, highly realistic interview preparation blueprint.

Target Role: "${jobTitle}"
Target Company: "${company}"
Preparation Timeline: ${prepDays} Days (${dailyHours} hours/day)
Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Please respond ONLY with valid, parseable JSON (no markdown fences, no text outside the JSON) matching this exact schema:
{
  "summary": {
    "role": "string",
    "company": "string",
    "prepDays": number,
    "dailyHours": number,
    "extractedTechStack": ["string"],
    "keyCompetencies": ["string"]
  },
  "schedule": [
    {
      "dayNumber": number,
      "title": "string",
      "focus": "string",
      "timeBlocks": [
        { "time": "Morning", "task": "string", "details": "string" },
        { "time": "Afternoon", "task": "string", "details": "string" },
        { "time": "Evening", "task": "string", "details": "string" }
      ],
      "keyConcepts": ["string"]
    }
  ],
  "questions": [
    {
      "id": "string",
      "category": "Technical Core | System Design | Behavioral & Scenario",
      "difficulty": "Beginner | Medium | Hard",
      "question": "string",
      "interviewerIntent": "string",
      "elevatorPitch": "string",
      "inDepthAnswer": "string",
      "codeSnippet": "string",
      "pitfalls": "string"
    }
  ],
  "project": {
    "projectName": "string",
    "tagline": "string",
    "problemStatement": "string",
    "techStack": {
      "frontend": "string",
      "backend": "string",
      "database": "string",
      "stateManagement": "string",
      "styling": "string",
      "deployment": "string"
    },
    "coreFeatures": ["string"],
    "architectureFlow": ["string"],
    "codeSnippet": {
      "fileName": "string",
      "language": "javascript | typescript",
      "code": "string",
      "explanation": "string"
    }
  },
  "projectPitch": {
    "elevatorPitch60s": "string",
    "starFramework": {
      "situation": "string",
      "task": "string",
      "action": "string",
      "result": "string"
    },
    "architecturePitch": "string",
    "anticipatedQuestions": [
      {
        "question": "string",
        "whyAsked": "string",
        "modelAnswer": "string"
      }
    ]
  }
}`;

        const raw = await this.callGeminiAPI(prompt);
        // Clean possible markdown backticks
        const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.schedule && parsed.questions && parsed.project && parsed.projectPitch) {
          return parsed;
        }
      } catch (err) {
        console.warn("Gemini API plan generation failed, switching to local intelligence engine:", err);
      }
    }

    // Fallback to Local Intelligence Engine
    return this.generateLocalJDPlan({ jobTitle, company, jobDescription, prepDays, dailyHours });
  },

  // --- Local Expert Engine for Job Description Analysis ---
  generateLocalJDPlan({ jobTitle = "Frontend Developer", company = "Target Company", jobDescription = "", prepDays = 7, dailyHours = 4 }) {
    const jdLower = (jobDescription + " " + jobTitle).toLowerCase();

    // 1. Detect Technologies
    const techStack = [];
    if (jdLower.includes("react")) techStack.push("React 19 / 18");
    if (jdLower.includes("typescript") || jdLower.includes("ts")) techStack.push("TypeScript");
    if (jdLower.includes("next") || jdLower.includes("ssr")) techStack.push("Next.js (App Router)");
    if (jdLower.includes("redux") || jdLower.includes("zustand") || jdLower.includes("state")) techStack.push("State Management (Redux/Zustand)");
    if (jdLower.includes("node") || jdLower.includes("express")) techStack.push("Node.js & Express");
    if (jdLower.includes("mongo") || jdLower.includes("nosql")) techStack.push("MongoDB");
    if (jdLower.includes("sql") || jdLower.includes("postgres") || jdLower.includes("mysql")) techStack.push("PostgreSQL / SQL");
    if (jdLower.includes("docker") || jdLower.includes("kubernetes")) techStack.push("Docker & Containers");
    if (jdLower.includes("graphql")) techStack.push("GraphQL");
    if (jdLower.includes("tailwind") || jdLower.includes("css") || jdLower.includes("mui")) techStack.push("Modern Styling (Tailwind / MUI)");
    if (jdLower.includes("jest") || jdLower.includes("test") || jdLower.includes("cypress")) techStack.push("Testing (Jest & RTL)");
    if (jdLower.includes("aws") || jdLower.includes("cloud")) techStack.push("Cloud & CI/CD (AWS)");

    if (techStack.length === 0) {
      techStack.push("JavaScript ES6+", "React", "REST APIs", "Modern CSS", "Web Performance");
    }

    const isFullStack = jdLower.includes("full") || jdLower.includes("mern") || (jdLower.includes("node") && jdLower.includes("react"));
    const isBackend = !jdLower.includes("react") && (jdLower.includes("node") || jdLower.includes("backend") || jdLower.includes("api"));

    // 2. Generate Days Schedule (adaptive to prepDays: e.g. 3, 7, 14, 30 days)
    const schedule = [];
    const days = Math.max(1, Math.min(30, parseInt(prepDays, 10) || 7));

    const coreThemes = [
      {
        title: "Modern Core Fundamentals & Deep Mechanics",
        focus: "JavaScript Execution Context, Event Loop, Closures, Async/Await & Microtasks",
        morning: "Deep dive into JS Under the Hood: Prototype chain, Lexical Scope, Event Loop",
        afternoon: "Hands-on Sandbox exercises: Polyfills (Promise.all, debounce, throttle, custom bind)",
        evening: "Solve 2 LeetCode Mediums on Arrays/Strings & Rehearse Core Definitions",
        concepts: ["Event Loop", "Closures", "Promise Mechanics", "Scope Chain"]
      },
      {
        title: "Component Architecture & State Mastery",
        focus: "React Lifecycle, Custom Hooks, Reconciliation & Virtual DOM Optimization",
        morning: "Study Virtual DOM diffing algorithm, Fiber architecture, and re-render mitigation",
        afternoon: "Build production custom hooks (useDebounce, useFetch with abort controller, useLocalStorage)",
        evening: "Review React 19 Compiler, Server Components vs Client Components, State Colocation",
        concepts: ["Reconciliation", "Custom Hooks", "State Immutability", "Memoization"]
      },
      {
        title: "API Design, Data Fetching & Caching Layer",
        focus: "RESTful principles, GraphQL, Optimistic Updates, Caching & Error Boundaries",
        morning: "Study HTTP status codes, headers, CORS, JWT authentication, and idempotency",
        afternoon: "Implement robust API client with retry mechanism, request cancellation, and error handlers",
        evening: "Solve 2 LeetCode Two-Pointer / Sliding Window problems & Review Cache invalidation",
        concepts: ["REST APIs", "Error Boundaries", "JWT Auth", "SWR / TanStack Query Caching"]
      },
      {
        title: "System Design & Component Architecture for Web",
        focus: "High-level Component Design, Infinite Scroll, Virtualization & Autocomplete",
        morning: "Study Front-End System Design: Client-side Caching, CDN, Lazy loading, Code splitting",
        afternoon: "Design and implement a Virtualized Feed / Autocomplete with debouncing and LRU cache",
        evening: "Practice Whiteboard System Architecture diagrams & explain trade-offs out loud",
        concepts: ["Virtualization", "Code Splitting", "Web Workers", "Client-side Storage"]
      },
      {
        title: "Hands-On Portfolio Project Implementation Sprint",
        focus: "Building & refining the showcase project directly matching JD requirements",
        morning: "Setup project repo, initialize modular folder structure, and configure state store",
        afternoon: "Build core feature pipeline: Authentication, real-time sync or responsive dashboard",
        evening: "Write unit tests using Jest/RTL, optimize bundle size, and verify zero console errors",
        concepts: ["Modular Architecture", "Unit Testing", "State Integration", "Lighthouse Audit"]
      },
      {
        title: "Behavioral, STAR Stories & Project Pitch Rehearsal",
        focus: "Mastering the STAR method, technical disagreements, and leadership scenarios",
        morning: "Draft 5 STAR stories: Toughest bug, Technical disagreement, Tight deadline, High-impact feature",
        afternoon: "Rehearse 60-second Project Pitch in front of mirror / recording voice memo",
        evening: "Practice answers to: 'Why should we hire you?' and 'Tell me about a time something failed'",
        concepts: ["STAR Technique", "Elevator Pitch", "Conflict Resolution", "Communication"]
      },
      {
        title: "Final High-Stakes Simulation & Interview Readiness",
        focus: "End-to-End Mock Interview Simulation, Cheat Sheet Review & Mental Preparation",
        morning: "Full timed Mock Interview session covering 5 Technical + 2 System Design questions",
        afternoon: "Fast review of cheat sheets, project architecture diagram, and interview questions",
        evening: "Rest, ensure clean development environment setup, review company values, and relax",
        concepts: ["Mock Simulation", "Cheat Sheet Review", "Confidence Building", "Final Polish"]
      }
    ];

    for (let d = 1; d <= days; d++) {
      const themeIndex = (d - 1) % coreThemes.length;
      const base = coreThemes[themeIndex];
      const dayFraction = d / days;
      let phaseName = dayFraction <= 0.35 ? "Foundation Phase" : dayFraction <= 0.75 ? "Deep-Dive & Project Sprint" : "Final Mock & Rehearsal Phase";

      schedule.push({
        dayNumber: d,
        title: `Day ${d}: ${base.title} (${phaseName})`,
        focus: base.focus,
        timeBlocks: [
          { time: `Morning (${Math.round(dailyHours * 0.35)}h)`, task: "Conceptual Mastery", details: base.morning },
          { time: `Afternoon (${Math.round(dailyHours * 0.4)}h)`, task: "Hands-On Coding & Project Work", details: base.afternoon },
          { time: `Evening (${Math.round(dailyHours * 0.25)}h)`, task: "Mock Q&A & Interview Rehearsal", details: base.evening }
        ],
        keyConcepts: base.concepts
      });
    }

    // 3. Generate High-Probability JD-Specific Questions & Answers
    const questions = [
      {
        id: "q-jd-1",
        category: "Technical Core",
        difficulty: "Medium",
        question: `How does React's Reconciliation and Virtual DOM work, and how do you prevent unnecessary re-renders in large applications?`,
        interviewerIntent: "Testing whether the candidate understands component rendering performance or just writes basic JSX.",
        elevatorPitch: "React maintains a lightweight Virtual DOM representation in memory. When state updates, React builds a new tree, diffs it with the previous tree using the O(n) reconciliation heuristic, and applies batch changes to the real DOM.",
        inDepthAnswer: "1. Reconciliation uses key heuristics: elements of different types generate different trees, and the 'key' prop provides stable identity across re-renders.\n2. In large apps, re-renders cascade down subtrees. We optimize by colocating state close to where it's used, using React.memo for pure display components with expensive trees, and stabilizing callbacks with useMemo/useCallback.\n3. In React 19, the React Compiler automatically memoizes components, but understanding dependency arrays and referential equality remains vital for production stability.",
        codeSnippet: `// Stabilizing reference and preventing child re-render\nconst FilterBar = React.memo(({ onSearch, activeFilter }) => {\n  return (\n    <input onChange={(e) => onSearch(e.target.value)} defaultValue={activeFilter} />\n  );\n});\n\n// Usage with useCallback\nconst handleSearch = useCallback((term) => {\n  setQuery(term);\n}, []);`,
        pitfalls: "Claiming React.memo should be wrapped around every single component without profiling, or forgetting that passing inline objects/arrays breaks memoization."
      },
      {
        id: "q-jd-2",
        category: "Technical Core",
        difficulty: "Hard",
        question: `Explain the JavaScript Event Loop, Microtask vs Macrotask queues, and what happens when an async operation blocks.`,
        interviewerIntent: "Assessing fundamental computer science and browser runtime knowledge that directly impacts UI responsiveness.",
        elevatorPitch: "JavaScript is single-threaded with a non-blocking concurrency model powered by the Event Loop. Synchronous code executes in the call stack; when empty, the loop executes all pending Microtasks (Promises, queueMicrotask) before picking the next Macrotask (setTimeout, I/O).",
        inDepthAnswer: "1. The Call Stack executes stack frames. Web APIs handle asynchronous tasks (timers, fetch) off the main thread.\n2. When complete, callbacks enter task queues: Microtasks have strict priority and drain completely before the browser repaints or takes the next Macrotask.\n3. If heavy synchronous computing runs on the call stack (e.g. large array parsing or crypto), the event loop stalls, freezing user input and frame renders (jank). To solve this, we offload heavy computation to Web Workers or chunk work using requestIdleCallback.",
        codeSnippet: `console.log("1 - Sync");\nsetTimeout(() => console.log("2 - Macrotask"), 0);\nPromise.resolve().then(() => console.log("3 - Microtask"));\nconsole.log("4 - Sync");\n// Output order: 1 -> 4 -> 3 -> 2`,
        pitfalls: "Confusing setTimeout(fn, 0) as running immediately, or not realizing that an endless microtask loop will completely freeze the browser tab."
      },
      {
        id: "q-jd-3",
        category: "System Design",
        difficulty: "Hard",
        question: `Design an enterprise Autocomplete Search component that handles high-frequency typing with fast response, caching, and rate limiting.`,
        interviewerIntent: "Testing real-world front-end system design: race conditions, network efficiency, debouncing, and memory management.",
        elevatorPitch: "An enterprise autocomplete combines a debounced input layer (300ms), a request cancellation mechanism (AbortController) to eliminate race conditions, an in-memory LRU cache, and keyboard navigation accessibility.",
        inDepthAnswer: "1. **Debouncing**: Prevents firing HTTP requests on every keystroke. 300ms delay balances responsiveness and server load.\n2. **Race Condition Prevention**: If query 're' takes 500ms and 'react' takes 100ms, 're' might resolve last, displaying stale results. We use AbortController to cancel inflight requests.\n3. **Client Caching**: We maintain an LRU Map of recent queries so backspacing is instantaneous without hitting the network.\n4. **Accessibility (a11y)**: ARIA role='combobox', aria-expanded, aria-activedescendant with ArrowUp/Down and Enter keys.",
        codeSnippet: `useEffect(() => {\n  if (!query.trim()) return;\n  const controller = new AbortController();\n  \n  const timer = setTimeout(async () => {\n    try {\n      const data = await fetchSuggestions(query, { signal: controller.signal });\n      setResults(data);\n    } catch (err) {\n      if (err.name !== 'AbortError') console.error(err);\n    }\n  }, 300);\n\n  return () => {\n    clearTimeout(timer);\n    controller.abort();\n  };\n}, [query]);`,
        pitfalls: "Failing to account for race conditions where older slow responses overwrite newer quick responses, or not unmounting timer listeners."
      },
      {
        id: "q-jd-4",
        category: "Technical Core",
        difficulty: "Medium",
        question: isFullStack || isBackend 
          ? `How do you secure RESTful APIs against common vulnerabilities like SQL/NoSQL Injection, CSRF, and Broken Object Level Authorization (BOLA)?`
          : `How do you architect state management in a large-scale React application (Context API vs Redux Toolkit vs Server State)?`,
        interviewerIntent: "Evaluating real architectural decision-making and practical production engineering standards.",
        elevatorPitch: isFullStack || isBackend
          ? "API security requires defense-in-depth: Parameterized queries or ORMs prevent injection; SameSite cookies and CSRF tokens prevent forged requests; and strictly validating ownership IDs on every request prevents BOLA."
          : "We split state into 3 distinct layers: Server State (handled by TanStack Query/SWR for caching/deduping), Global Client State (Redux Toolkit or Zustand for cross-cutting session state), and Local UI State (useState/useReducer).",
        inDepthAnswer: isFullStack || isBackend
          ? "1. Never concatenate raw user input into SQL or MongoDB filters. Use parameterized queries or Mongoose schema sanitization.\n2. For Authorization, never trust client-supplied userId alone. Always extract validated identity from verified JWT signatures and verify req.user.id owns the target record.\n3. Apply Helmet.js security headers, strict rate-limiting with Redis, and input validation schemas using Zod or Joi."
          : "1. Putting all server responses into Redux is an anti-pattern that creates boilerplate. TanStack Query automatically manages background refetching, caching, and loading states.\n2. Use Redux Toolkit or Zustand only for truly global client data like user theme, cart, or active multi-step wizards.\n3. Colocate transient state (open dialogs, inputs) locally to keep re-renders isolated.",
        codeSnippet: isFullStack || isBackend
          ? `// Express Ownership Middleware (Preventing BOLA)\nconst checkDocOwnership = async (req, res, next) => {\n  const doc = await Document.findById(req.params.id);\n  if (!doc) return res.status(404).json({ error: 'Not found' });\n  if (doc.ownerId.toString() !== req.user.id) {\n    return res.status(403).json({ error: 'Unauthorized access' });\n  }\n  req.document = doc;\n  next();\n};`
          : `// TanStack Query Clean Server State Pattern\nconst { data: userProfile, isLoading } = useQuery({\n  queryKey: ['user', userId],\n  queryFn: () => fetchUserProfile(userId),\n  staleTime: 5 * 60 * 1000, // 5 minutes fresh\n});`,
        pitfalls: "Over-engineering Context API for high-frequency state updates causing whole-app re-renders, or failing to validate resource ownership on API endpoints."
      },
      {
        id: "q-jd-5",
        category: "Behavioral & Scenario",
        difficulty: "Medium",
        question: `Tell me about a time you faced a critical production bug or had a disagreement with a team member about technical architecture. How did you resolve it?`,
        interviewerIntent: "Evaluating emotional intelligence, constructive communication, and how the candidate performs under pressure.",
        elevatorPitch: "I focus on objective data, decoupling emotional attachment from code, and prioritizing user experience and project timelines over personal preferences.",
        inDepthAnswer: "Use the STAR method:\n- **Situation**: In a previous milestone, we had a debate between adopting a heavy Redux setup vs a lightweight Zustand + React Query architecture under a tight 2-week deadline.\n- **Task**: As a core developer, I needed to help the team reach a consensus without causing delays or team friction.\n- **Action**: Instead of arguing opinions, I built a fast 1-hour prototype demonstrating both approaches side-by-side, measuring bundle size, developer boilerplate, and onboarding time. I presented the metrics respectfully to the team.\n- **Result**: The team unanimously agreed on the lightweight approach, saving approximately 30% development time while keeping bundle size 45KB lighter.",
        codeSnippet: `// Communication Guideline:\n1. Acknowledge the other person's valid points.\n2. Ground arguments in measurable metrics (bundle size, maintainability, deadline).\n3. Commit fully once a team decision is reached.`,
        pitfalls: "Blaming former teammates, saying 'I was right and they were wrong', or claiming you have never experienced a technical disagreement."
      }
    ];

    // 4. Generate Relevant Tailored Portfolio Project matching JD
    const project = isFullStack ? {
      projectName: "DevPulse: Full-Stack Developer Collaboration & Metrics Platform",
      tagline: "Real-time engineering sprint dashboard with GitHub analytics, collaborative code snippets & role-based workflows.",
      problemStatement: "Engineering teams waste hours switching between siloed tools to track sprint health, share validated code snippets, and review pull request metrics.",
      techStack: {
        frontend: "React 19, TypeScript, Material UI, Tailwind CSS",
        backend: "Node.js, Express.js, WebSockets (Socket.io)",
        database: "MongoDB (Mongoose) / PostgreSQL",
        stateManagement: "Zustand / Redux Toolkit & TanStack Query",
        styling: "Tailwind CSS & Emotion",
        deployment: "Docker, Vercel & Render / AWS EC2"
      },
      coreFeatures: [
        "JWT-authenticated role-based dashboards (Admin, Developer, Lead)",
        "Real-time WebSocket notifications when pull requests are updated or commented",
        "Interactive analytics charts tracking team velocity and code review response latency",
        "In-browser Markdown & syntax-highlighted code snippet notebook with tagging",
        "Optimistic UI updates with offline-resilient local caching"
      ],
      architectureFlow: [
        "Client (React SPA) ➡️ API Gateway / Express Controller",
        "JWT Authentication & Ownership Middleware Verification",
        "Service Layer handles business logic & triggers WebSocket broadcast",
        "MongoDB / PostgreSQL persisted storage with indexing",
        "TanStack Query invalidates client cache and triggers instant UI sync"
      ],
      codeSnippet: {
        fileName: "src/hooks/useRealtimeSync.ts",
        language: "typescript",
        code: `import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../services/socket';

export function useRealtimeSync(channelId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit('subscribe', { channelId });

    socket.on('entity_updated', (payload) => {
      // Optimistically update query cache without full page reload
      queryClient.setQueryData(['metrics', channelId], (oldData: any) => {
        return oldData ? { ...oldData, ...payload } : payload;
      });
    });

    return () => {
      socket.emit('unsubscribe', { channelId });
      socket.off('entity_updated');
    };
  }, [channelId, queryClient]);
}`,
        explanation: "This custom hook encapsulates WebSocket room subscription and leverages TanStack Query cache updates to provide zero-latency optimistic data synchronization without triggering unnecessary network roundtrips."
      }
    } : {
      projectName: "CloudFlow: High-Performance Workflow & Document Studio",
      tagline: "Enterprise client-side document processing suite featuring virtualized feeds, PDF extraction & instant cloud sync.",
      problemStatement: "Modern enterprise knowledge workers struggle with slow document previewers and fragmented study repositories that lag under large file sizes.",
      techStack: {
        frontend: "React 19, TypeScript, Material UI, Vite",
        backend: "Node.js REST API with Multer File Streaming",
        database: "JSON Document Store / PostgreSQL",
        stateManagement: "Custom React Context & Local Storage Sync",
        styling: "MUI v6 & Custom CSS Glow Engine",
        deployment: "Vercel / Netlify with CI/CD GitHub Actions"
      },
      coreFeatures: [
        "High-performance virtualized document gallery supporting 1,000+ files at 60fps",
        "Client-side PDF & Image interactive multi-mode preview dialog with zoom/rotate",
        "Real-time debounced search & multi-facet filtering (by file type, topic, date)",
        "1-click background downloading with native stream handling and progress bars",
        "Offline synchronization storing notes in indexed client storage with auto-reconnect"
      ],
      architectureFlow: [
        "Vite React SPA ➡️ Modular Component Tree (State Colocation)",
        "Custom AbortController hooks manage active API requests & prevent race conditions",
        "Express REST backend streams chunked files with Content-Disposition headers",
        "Virtual DOM virtualization eliminates unrendered off-screen nodes to preserve 60fps",
        "Local Storage / IndexedDB maintains offline cache and restores state instantly"
      ],
      codeSnippet: {
        fileName: "src/hooks/useDebouncedSearch.ts",
        language: "typescript",
        code: `import { useState, useEffect } from 'react';

export function useDebouncedSearch<T>(
  query: string,
  searchFn: (term: string, signal: AbortSignal) => Promise<T[]>,
  delay = 300
) {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await searchFn(query, controller.signal);
        setResults(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, delay, searchFn]);

  return { results, loading };
}`,
        explanation: "Custom generic React hook combining debounced timer execution with AbortController cancellation to eliminate network race conditions and optimize battery and memory usage."
      }
    };

    // 5. How to Pitch & Explain to Interviewers
    const projectPitch = {
      elevatorPitch60s: `\"I built **${project.projectName}**, which is an ${project.tagline.toLowerCase()}

The core problem I solved was ${project.problemStatement.toLowerCase()}

On the frontend, I used **${project.techStack.frontend}** with a focus on performance: I implemented component virtualization and debounced request cancellation to keep rendering at a steady 60fps. On the architecture side, I designed modular state separation between server cache and UI state. 

One of my biggest engineering takeaways was optimizing the data flow to eliminate race conditions, which reduced API traffic by 38% and provided users with instant, zero-lag interaction.\"`,
      starFramework: {
        situation: `In engineering teams, users experienced frequent UI slowdowns and stale data overrides when searching and filtering large sets of documents and sprint assets.`,
        task: `My goal as the developer was to architect an end-to-end, responsive system that could process hundreds of records seamlessly while maintaining sub-100ms response times.`,
        action: `I spearheaded three major architectural decisions:
1. Implemented a debounced AbortController pattern to cancel stale inflight requests and eliminate race conditions.
2. Built a virtualized list container that renders only visible DOM nodes, reducing memory overhead by over 70%.
3. Structured clean component boundaries separating presentation from business logic using custom hooks.`,
        result: `The application achieved a 98 Lighthouse performance score, zero reported race conditions in testing, and delivered smooth 60fps scrolling across mobile and desktop devices.`
      },
      architecturePitch: `When discussing the architecture with an interviewer:
1. Start by drawing the high-level boundary: Client SPA ➡️ API Layer ➡️ Persistence Layer.
2. Highlight why you chose the specific state management: Explain that separating server cache from local UI state avoided unnecessary global Redux boilerplate.
3. Discuss security & reliability: Mention input validation, request timeout handling, and graceful error boundaries that prevent white-screen crashes.`,
      anticipatedQuestions: [
        {
          question: `Why did you choose ${project.techStack.frontend.split(',')[0]} instead of alternative frameworks?`,
          whyAsked: "The interviewer wants to see if you evaluate tools critically based on project requirements or just blindly follow hype.",
          modelAnswer: `\"I selected ${project.techStack.frontend.split(',')[0]} because of its mature ecosystem, predictable component lifecycle, and lightweight footprint. Since our core requirement involved dynamic virtualized lists and custom hook composition, this framework allowed me to build reusable hooks like useDebouncedSearch and useRealtimeSync with minimal overhead compared to heavier monolithic frameworks.\"`
        },
        {
          question: `How did you optimize performance and prevent unnecessary component re-renders?`,
          whyAsked: "Testing if you understand profiling, DOM reconciliation, and referential equality.",
          modelAnswer: `\"I used React DevTools Profiler to identify high-frequency rendering hot-spots. First, I colocated state close to leaf components rather than lifting everything globally. Second, for heavy list item components, I wrapped them in React.memo and stabilized callback handlers with useCallback to ensure referential equality across parent renders. Finally, offloading off-screen nodes via virtualization kept the active DOM node count below 50 at all times.\"`
        },
        {
          question: `What was the most challenging technical bug you encountered in this project, and how did you debug it?`,
          whyAsked: "Evaluating debugging methodology, persistence, and root-cause analysis.",
          modelAnswer: `\"The trickiest bug was an asynchronous race condition in the search filter: when users typed quickly, a slow network request for an earlier single-letter query would resolve after a faster multi-letter query, overwriting the screen with outdated results. I debugged it by inspecting the Network waterfall tab in Chrome DevTools. I solved it cleanly by integrating AbortController to automatically abort the previous HTTP request whenever a new keystroke initiated.\"`
        },
        {
          question: `If this application had to scale to 100,000 active daily users, what would you change?`,
          whyAsked: "Assessing system design foresight and scalability knowledge.",
          modelAnswer: `\"At 100k DAU, I would introduce a three-tiered scaling strategy: First, place a Cloudflare CDN in front of static assets and implement edge caching for read-heavy API responses. Second, add Redis as an in-memory caching layer between our Node backend and the database with TTL invalidation. Third, on the frontend, I would implement route-based code splitting with React.lazy and service worker caching to ensure near-instant return visits.\"`
        },
        {
          question: `If you were starting this project again from scratch, what would you do differently?`,
          whyAsked: "Testing self-reflection, continuous learning, and engineering maturity.",
          modelAnswer: `\"In retrospect, I would establish end-to-end integration tests using Playwright earlier in the development lifecycle rather than relying primarily on unit tests. E2E tests would have caught the edge cases in multi-step form validation much faster and saved approximately 15% of our debugging cycles.\"`
        }
      ]
    };

    return {
      summary: {
        role: jobTitle,
        company,
        prepDays: days,
        dailyHours,
        extractedTechStack: techStack,
        keyCompetencies: [
          "Modern JavaScript & Asynchronous Event Loop",
          "Component Architecture & Lifecycle Optimization",
          "API Design & Race-Condition-Free Data Fetching",
          "Front-End System Design & Client Caching",
          "STAR Behavioral Storytelling & Project Delivery"
        ]
      },
      schedule,
      questions,
      project,
      projectPitch
    };
  },

  // --- AI Self-Knowledge Checker & Auto MCQ Exam Generator ---
  async generateMCQKnowledgeCheck({ technology = "React", topic = "All Topics", difficulty = "Intermediate", questionCount = 5 }) {
    const key = this.getApiKey();
    if (key) {
      try {
        const prompt = `You are a Principal Software Engineer and Technical Educator creating an interactive self-knowledge check (diagnostic quiz) for a student.
Technology: "${technology}"
Topic: "${topic}"
Difficulty: "${difficulty}"
Question Count: ${questionCount}

IMPORTANT INSTRUCTIONS:
1. This is a supportive self-knowledge assessment, not an intimidating test.
2. Focus on testing real-world mental models, code understanding, edge cases, and best practices.
3. Every question must have an educational breakdown explaining:
   - "whyCorrect": Clear technical explanation why the correct answer is right.
   - "whyIncorrect": Explanation of the common trap or misconception in the wrong options.
   - "proTip": A senior engineer tip or key takeaway.
4. If appropriate for the question, include a short 3-8 line "codeSnippet".

Return ONLY raw valid JSON with NO surrounding backticks or markdown, matching this exact schema:
{
  "technology": "${technology}",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "question": "What happens when...",
      "codeSnippet": "// optional code snippet or empty string",
      "options": [
        { "key": "A", "text": "Option A explanation" },
        { "key": "B", "text": "Option B explanation" },
        { "key": "C", "text": "Option C explanation" },
        { "key": "D", "text": "Option D explanation" }
      ],
      "correctKey": "A",
      "subtopic": "Subtopic name e.g. State Immutability",
      "explanation": {
        "whyCorrect": "Explanation of the correct answer...",
        "whyIncorrect": "Why other options represent common misconceptions...",
        "proTip": "Senior developer advice..."
      }
    }
  ]
}`;

        const raw = await this.callGeminiAPI(prompt);
        let cleaned = raw.trim();
        if (cleaned.startsWith("```json")) {
          cleaned = cleaned.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        } else if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```\s*/, "").replace(/```$/, "").trim();
        }
        const parsed = JSON.parse(cleaned);
        if (parsed.questions && parsed.questions.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.warn("Gemini MCQ generation failed, falling back to local knowledge engine:", err);
      }
    }

    return this.generateLocalMCQKnowledgeCheck({ technology, topic, difficulty, questionCount });
  },

  generateLocalMCQKnowledgeCheck({ technology = "React", topic = "All Topics", difficulty = "Intermediate", questionCount = 5 }) {
    const techLower = (technology || "").toLowerCase();

    // Comprehensive question repository indexed by technology
    const QUESTION_BANKS = {
      react: [
        {
          id: "r1",
          question: "In React 18, what is the output in the console after clicking the button once?",
          codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Increment</button>;
}`,
          options: [
            { key: "A", text: "It logs 0 immediately, and the component re-renders with count = 1." },
            { key: "B", text: "It logs 2 immediately, and the component re-renders with count = 2." },
            { key: "C", text: "It logs 1 immediately, and the component re-renders with count = 2." },
            { key: "D", text: "It throws a state concurrency error in React 18." }
          ],
          correctKey: "A",
          subtopic: "State Batching & Stale Closure",
          explanation: {
            whyCorrect: "useState setters are asynchronous and batched in React 18 event handlers. In this render closure, 'count' is frozen at 0, so console.log prints 0. Both setCount calls evaluate (0 + 1), resulting in a next state of 1.",
            whyIncorrect: "Option B and C assume synchronous mutation or functional accumulation. To increment twice, you must pass an updater function: setCount(prev => prev + 1).",
            proTip: "Whenever your next state depends on your previous state, always use the functional updater form setCount(c => c + 1)!"
          }
        },
        {
          id: "r2",
          question: "Why should you avoid using an array index as the 'key' prop when rendering dynamic lists in React?",
          codeSnippet: `// Problematic pattern:
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}`,
          options: [
            { key: "A", text: "Because React keys must always be alphanumeric strings, and indexes are numbers." },
            { key: "B", text: "If the list items are reordered, inserted, or removed, React's reconciliation algorithm may misidentify items, causing corrupted component state and unnecessary DOM re-renders." },
            { key: "C", text: "Using array index disables React Virtual DOM reconciliation entirely." },
            { key: "D", text: "Array indexes cause memory leaks in JavaScript garbage collection." }
          ],
          correctKey: "B",
          subtopic: "Virtual DOM Reconciliation",
          explanation: {
            whyCorrect: "React uses keys to identify which DOM nodes match across renders. When items are prepended or sorted, their index positions change, causing React to associate old internal component state (like inputs) with the wrong data.",
            whyIncorrect: "Keys do not disable reconciliation and can be numbers. The issue is identity stability, not data type or garbage collection.",
            proTip: "Always use stable unique IDs from your database (like item.id or crypto.randomUUID()). Only use index if the list is strictly static and will never be sorted or filtered."
          }
        },
        {
          id: "r3",
          question: "When does the cleanup function in a useEffect hook execute?",
          codeSnippet: `useEffect(() => {
  const handler = () => console.log('active');
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  };
}, [dependency]);`,
          options: [
            { key: "A", text: "Only when the parent component unmounts from the DOM tree." },
            { key: "B", text: "Before the effect re-runs on dependency changes, and when the component unmounts." },
            { key: "C", text: "Immediately after the JSX renders to the screen, before the effect body runs." },
            { key: "D", text: "At every microtask tick in the browser event loop." }
          ],
          correctKey: "B",
          subtopic: "Hook Lifecycle & Subscriptions",
          explanation: {
            whyCorrect: "React calls the return cleanup function prior to running the effect again with new dependencies (to clean up the previous run's subscriptions) and also when the component unmounts completely.",
            whyIncorrect: "Option A misses that cleanup happens on every dependency change. If it only ran on unmount, you would accumulate duplicate listeners on every change.",
            proTip: "Always clean up timers (clearInterval), WebSocket connections, and event listeners in the cleanup return function to prevent memory leaks."
          }
        },
        {
          id: "r4",
          question: "What is the primary difference between useCallback and useMemo?",
          codeSnippet: `const memoizedCallback = useCallback(() => fn(a, b), [a, b]);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`,
          options: [
            { key: "A", text: "useCallback caches a function instance between renders; useMemo caches the computed return value of a function." },
            { key: "B", text: "useCallback runs asynchronously in a web worker; useMemo runs synchronously on the main thread." },
            { key: "C", text: "useMemo is deprecated in React 18, whereas useCallback is the modern replacement." },
            { key: "D", text: "useCallback triggers component re-renders when dependencies change, while useMemo suppresses re-renders." }
          ],
          correctKey: "A",
          subtopic: "Performance Optimization & Memoization",
          explanation: {
            whyCorrect: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useCallback returns the function definition itself so child components wrapped in React.memo don't re-render from reference changes.",
            whyIncorrect: "Neither uses web workers, and neither is deprecated. Both are fundamental hooks for reference identity and computational caching.",
            proTip: "Don't over-memoize everything! Measuring first is best. Use useCallback when passing functions to memoized child components or as dependencies in useEffect."
          }
        },
        {
          id: "r5",
          question: "What happens if you update state inside a component render body without an effect or event handler?",
          codeSnippet: `function UserProfile({ id }) {
  const [data, setData] = useState(null);
  // Directly calling state setter in body:
  setData({ id });

  return <div>User {id}</div>;
}`,
          options: [
            { key: "A", text: "React optimizes it into a synchronous render and displays the state immediately." },
            { key: "B", text: "It causes an infinite loop: 'Too many re-renders. React limits the number of renders to prevent an infinite loop.'" },
            { key: "C", text: "React ignores the setter call silently." },
            { key: "D", text: "The component converts into an uncontrolled class component." }
          ],
          correctKey: "B",
          subtopic: "Render Phase Rules & Anti-Patterns",
          explanation: {
            whyCorrect: "Calling a state setter during rendering schedules another render immediately. In the next render, the body executes again and calls the setter again, producing an infinite re-render loop that triggers React's protective guardrail.",
            whyIncorrect: "React will never ignore state changes silently or convert into class components. It fails fast with a Maximum Update Depth Exceeded error.",
            proTip: "Never cause side effects or call state setters directly in the body of a functional component. Keep render functions pure!"
          }
        }
      ],

      javascript: [
        {
          id: "js1",
          question: "What order of logs will this JavaScript code produce in modern runtimes?",
          codeSnippet: `console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');`,
          options: [
            { key: "A", text: "1, 2, 3, 4" },
            { key: "B", text: "1, 4, 3, 2" },
            { key: "C", text: "1, 4, 2, 3" },
            { key: "D", text: "1, 3, 4, 2" }
          ],
          correctKey: "B",
          subtopic: "Event Loop (Microtasks vs Macrotasks)",
          explanation: {
            whyCorrect: "Synchronous code runs first ('1', then '4'). Before taking the next macrotask (setTimeout '2') from the callback queue, the event loop drains the entire microtask queue (Promise.resolve '3'). Therefore the sequence is 1 -> 4 -> 3 -> 2.",
            whyIncorrect: "Even with a 0ms delay, setTimeout is placed in the Macrotask (Task) queue. Promises are Microtasks and always execute immediately after the current call stack clears before the next macrotask.",
            proTip: "Microtasks (Promises, queueMicrotask) always starve/precede Macrotasks (setTimeout, setInterval, setImmediate)."
          }
        },
        {
          id: "js2",
          question: "What does this code output due to JavaScript closures?",
          codeSnippet: `function createCounters() {
  var counters = [];
  for (var i = 0; i < 3; i++) {
    counters.push(function() {
      return i;
    });
  }
  return counters;
}

const list = createCounters();
console.log(list[0](), list[1](), list[2]());`,
          options: [
            { key: "A", text: "0 1 2" },
            { key: "B", text: "3 3 3" },
            { key: "C", text: "undefined undefined undefined" },
            { key: "D", text: "NaN NaN NaN" }
          ],
          correctKey: "B",
          subtopic: "Closures & Variable Scoping",
          explanation: {
            whyCorrect: "'var' is function-scoped (or globally scoped), NOT block-scoped. By the time the loop finishes, 'i' equals 3. All 3 closures reference the exact same memory binding of 'i', so each returns 3.",
            whyIncorrect: "To get '0 1 2', you must use 'let i = 0', which creates a new lexical binding for each loop iteration.",
            proTip: "Always use 'const' and 'let' in modern JavaScript to avoid classic function-scoped variable leakage."
          }
        },
        {
          id: "js3",
          question: "How does the 'this' keyword behave inside arrow functions compared to standard function declarations?",
          codeSnippet: `const team = {
  name: 'Alpha',
  regular: function() { return this.name; },
  arrow: () => { return this.name; }
};`,
          options: [
            { key: "A", text: "Arrow functions do not bind their own 'this'; they lexically capture 'this' from the enclosing scope where they were defined." },
            { key: "B", text: "Arrow functions automatically bind 'this' to the closest object literal." },
            { key: "C", text: "Arrow functions have dynamic 'this' that changes depending on how the function is invoked." },
            { key: "D", text: "Arrow functions throw a TypeError if you reference 'this' inside them." }
          ],
          correctKey: "A",
          subtopic: "Lexical Scope & 'this' Binding",
          explanation: {
            whyCorrect: "Arrow functions lack their own 'this', 'arguments', and 'super'. They retain the 'this' value of the enclosing lexical execution context (often window in browser or module.exports in Node).",
            whyIncorrect: "Object literals do NOT create a new lexical execution context (only functions and classes do). Therefore, an arrow method on an object does not point to the object.",
            proTip: "Never use arrow functions for object methods if you need to access object properties via 'this.property'!"
          }
        },
        {
          id: "js4",
          question: "What is the result of typeof NaN in JavaScript?",
          codeSnippet: `console.log(typeof NaN);`,
          options: [
            { key: "A", text: "'undefined'" },
            { key: "B", text: "'nan'" },
            { key: "C", text: "'number'" },
            { key: "D", text: "'object'" }
          ],
          correctKey: "C",
          subtopic: "Type Coercion & Primitives",
          explanation: {
            whyCorrect: "According to the IEEE 754 floating-point standard used by JavaScript, NaN ('Not a Number') is considered a numeric data type representing an invalid or unrepresentable calculation result.",
            whyIncorrect: "Even though its name stands for 'Not a Number', its technical type specification in the ECMAScript engine is 'number'.",
            proTip: "Use Number.isNaN(val) instead of isNaN(val) because Number.isNaN does not forcefully coerce non-numeric types to numbers first!"
          }
        },
        {
          id: "js5",
          question: "What is the difference between shallow copy and deep copy in JavaScript?",
          codeSnippet: `const original = { user: { name: 'Alex' }, role: 'Admin' };
const shallow = { ...original };
shallow.user.name = 'Sam';`,
          options: [
            { key: "A", text: "shallow.user.name is 'Sam', and original.user.name also becomes 'Sam' because nested objects are copied by reference." },
            { key: "B", text: "original.user.name remains 'Alex' because the spread operator creates a recursive deep clone." },
            { key: "C", text: "The code throws a TypeError because object spread is read-only." },
            { key: "D", text: "Shallow copies freeze the original object automatically." }
          ],
          correctKey: "A",
          subtopic: "Object Reference vs Deep Cloning",
          explanation: {
            whyCorrect: "The spread operator ({ ...original }) and Object.assign only copy top-level primitive values. Nested objects remain references to the exact same memory heap, so mutating shallow.user affects original.user.",
            whyIncorrect: "Spread does not perform deep recursive cloning. To deep copy in modern JS, use structuredClone(original) or lodash.cloneDeep.",
            proTip: "Use native structuredClone() in modern browsers and Node 17+ for clean deep cloning without JSON.parse/stringify limitations!"
          }
        }
      ],

      css: [
        {
          id: "css1",
          question: "What does 'box-sizing: border-box' do to an element with width: 200px, padding: 20px, and border: 5px?",
          codeSnippet: `.card {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}`,
          options: [
            { key: "A", text: "The total rendered width on screen will be exactly 200px, absorbing the padding and border into the width." },
            { key: "B", text: "The total rendered width will be 250px (200 + 40 padding + 10 border)." },
            { key: "C", text: "The border is ignored and only padding is counted." },
            { key: "D", text: "It causes the element to overflow its parent flex container." }
          ],
          correctKey: "A",
          subtopic: "CSS Box Model",
          explanation: {
            whyCorrect: "With 'box-sizing: border-box', the element's specified width includes the content area, padding, and border. The content area shrinks to (200 - 40 - 10 = 150px), making the total width exactly 200px.",
            whyIncorrect: "Option B describes the default 'content-box' behavior where padding and borders are added outside the width.",
            proTip: "Always put '*, *::before, *::after { box-sizing: border-box; }' at the top of your global CSS for predictable layouts!"
          }
        },
        {
          id: "css2",
          question: "Which selector has the highest specificity in CSS?",
          codeSnippet: `/* A */ #profile .bio { color: blue; }
/* B */ body div.container #profile { color: red; }
/* C */ header.main-header div p.bio { color: green; }
/* D */ #profile.active { color: purple; }`,
          options: [
            { key: "A", text: "Option A (#profile .bio): 1 ID, 1 Class (Specificity: 1, 1, 0)" },
            { key: "B", text: "Option B (body div.container #profile): 1 ID, 1 Class, 2 Elements (Specificity: 1, 1, 2) - HIGHEST" },
            { key: "C", text: "Option C (header.main-header div p.bio): 0 IDs, 2 Classes, 3 Elements" },
            { key: "D", text: "All selectors with 1 ID have equal specificity regardless of element tags." }
          ],
          correctKey: "B",
          subtopic: "CSS Specificity Calculation",
          explanation: {
            whyCorrect: "Specificity is calculated as a 3-part tuple: (IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements). Option B has 1 ID, 1 Class, and 2 Elements (1, 1, 2), which beats Option A (1, 1, 0) and Option D (1, 1, 0).",
            whyIncorrect: "Elements do break ties when the count of IDs and classes are equal! 1, 1, 2 beats 1, 1, 0.",
            proTip: "Avoid high-specificity selector wars. Use modern CSS BEM conventions or CSS Modules/Tailwind utility classes."
          }
        },
        {
          id: "css3",
          question: "In CSS Flexbox, what is the difference between 'justify-content' and 'align-items'?",
          codeSnippet: `.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}`,
          options: [
            { key: "A", text: "justify-content aligns along the main axis (horizontal in row); align-items aligns along the cross axis (vertical in row)." },
            { key: "B", text: "justify-content is for text content only; align-items is for child div containers." },
            { key: "C", text: "justify-content only works in CSS Grid, not Flexbox." },
            { key: "D", text: "There is no difference; they are interchangeable aliases." }
          ],
          correctKey: "A",
          subtopic: "Flexbox Main Axis vs Cross Axis",
          explanation: {
            whyCorrect: "Flexbox operates on two axes. The main axis is determined by flex-direction (row = horizontal, column = vertical). justify-content always controls alignment along that main axis, while align-items controls the perpendicular cross axis.",
            whyIncorrect: "Both properties operate on flex items, not just text. If flex-direction is changed to 'column', justify-content controls vertical alignment!",
            proTip: "Remember: When you switch flex-direction to column, justify-content becomes vertical and align-items becomes horizontal!"
          }
        }
      ],

      backend: [
        {
          id: "be1",
          question: "What is the proper argument signature for an Express.js custom error-handling middleware?",
          codeSnippet: `// Which middleware signature tells Express this is an Error Handler?
app.use((a, b, c, d) => {
  // handling error
});`,
          options: [
            { key: "A", text: "(req, res, next, error)" },
            { key: "B", text: "(err, req, res, next) with exactly 4 parameters" },
            { key: "C", text: "(err, req, res)" },
            { key: "D", text: "(req, res, err)" }
          ],
          correctKey: "B",
          subtopic: "Express.js Middleware Architecture",
          explanation: {
            whyCorrect: "Express inspects the function's arity (fn.length). A middleware MUST have exactly 4 formal parameters (err, req, res, next) for Express to recognize it as an error-handling middleware.",
            whyIncorrect: "If you define only 3 parameters (err, req, res), Express treats it as a standard request middleware and passes 'req' into 'err'!",
            proTip: "Always place your 4-parameter error handler at the very end of your middleware stack, after all your route definitions."
          }
        },
        {
          id: "be2",
          question: "Why does an HTTP CORS preflight request (OPTIONS) occur before certain API requests?",
          codeSnippet: `// Browser sends:
OPTIONS /api/data HTTP/1.1
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization, Content-Type`,
          options: [
            { key: "A", text: "Because the browser checks with the server first if the cross-origin request (with custom headers like Authorization or application/json) is permitted before transmitting potentially destructive actions." },
            { key: "B", text: "Because the server port is closed and requires a handshake." },
            { key: "C", text: "Because the user forgot to configure SSL HTTPS certificates." },
            { key: "D", text: "Because the database connection is running asynchronously." }
          ],
          correctKey: "A",
          subtopic: "Web Security & CORS Specification",
          explanation: {
            whyCorrect: "Browsers enforce the Same-Origin Policy. Any 'non-simple' request (methods other than GET/POST/HEAD, or with headers like Authorization or application/json) triggers an automated preflight OPTIONS check to ensure the server explicitly allows the origin.",
            whyIncorrect: "CORS is purely a client-side browser security standard; servers and Postman do not enforce CORS preflights.",
            proTip: "Ensure your backend responds with 204 or 200 to OPTIONS requests and sets 'Access-Control-Allow-Origin' appropriately."
          }
        },
        {
          id: "be3",
          question: "In MongoDB, what is the maximum document size limit for a single BSON document?",
          codeSnippet: `// Storing large nested arrays inside a single document:
{
  _id: ObjectId("..."),
  user: "alex",
  activityLogs: [ /* 100,000 log entries */ ]
}`,
          options: [
            { key: "A", text: "2 Megabytes (MB)" },
            { key: "B", text: "16 Megabytes (MB)" },
            { key: "C", text: "128 Megabytes (MB)" },
            { key: "D", text: "Unlimited, constrained only by disk storage." }
          ],
          correctKey: "B",
          subtopic: "NoSQL Database Schema Design",
          explanation: {
            whyCorrect: "MongoDB enforces a strict 16MB document size limit to prevent memory bloat and ensure fast query execution and network transmission.",
            whyIncorrect: "If you have rapidly growing unbounded arrays (like user logs or comments), embedding them in a single document will eventually crash at 16MB. You must use relational referencing instead.",
            proTip: "Use the 'Subset Pattern' or reference separate collection documents with foreign keys when arrays can grow indefinitely."
          }
        }
      ]
    };

    // Determine target pool based on technology
    let pool = [];
    if (techLower.includes("react")) {
      pool = QUESTION_BANKS.react;
    } else if (techLower.includes("js") || techLower.includes("javascript")) {
      pool = QUESTION_BANKS.javascript;
    } else if (techLower.includes("css") || techLower.includes("html") || techLower.includes("frontend")) {
      pool = QUESTION_BANKS.css;
    } else if (techLower.includes("node") || techLower.includes("backend") || techLower.includes("express") || techLower.includes("mongo") || techLower.includes("sql")) {
      pool = QUESTION_BANKS.backend;
    } else {
      // Mixed general web development pool
      pool = [
        ...QUESTION_BANKS.react.slice(0, 2),
        ...QUESTION_BANKS.javascript.slice(0, 2),
        ...QUESTION_BANKS.css.slice(0, 1),
        ...QUESTION_BANKS.backend.slice(0, 1)
      ];
    }

    // Filter by topic if specified and not "all"
    let filtered = pool;
    if (topic && topic.toLowerCase() !== "all" && topic.toLowerCase() !== "all topics") {
      const topLower = topic.toLowerCase();
      const matched = pool.filter(q =>
        q.subtopic.toLowerCase().includes(topLower) ||
        q.question.toLowerCase().includes(topLower)
      );
      if (matched.length > 0) {
        filtered = matched;
      }
    }

    // Slice to desired questionCount
    const count = Math.min(Math.max(Number(questionCount) || 5, 3), 15);
    let selected = filtered.slice(0, count);

    // If count requested is greater than filtered pool, fill from other questions
    if (selected.length < count) {
      const allOther = Object.values(QUESTION_BANKS).flat().filter(q => !selected.some(s => s.id === q.id));
      selected = [...selected, ...allOther.slice(0, count - selected.length)];
    }

    return {
      technology,
      topic,
      difficulty,
      questions: selected
    };
  }

};

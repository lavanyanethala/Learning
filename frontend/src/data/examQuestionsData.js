// ============================================================================
// Comprehensive Question Repository by Technology & Subtopic
// Meticulously curated with realistic code snippets, deep explanations, and pro-tips.
// ============================================================================

export const EXAM_QUESTION_BANKS = {
  // --------------------------------------------------------------------------
  // 1. REACT
  // --------------------------------------------------------------------------
  react: [
    {
      id: "r_batching",
      technology: "React",
      subtopic: "State Management & Batching",
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
      explanation: {
        whyCorrect: "useState setters are batched in React 18. In the current render closure, 'count' is captured at 0, so console.log prints 0. Both setCount calls evaluate (0 + 1), resulting in a next state of 1.",
        whyIncorrect: "To increment twice based on the previous update, you must pass a functional updater: setCount(prev => prev + 1).",
        proTip: "Whenever your next state depends on your previous state value, always use the functional updater form setCount(prev => prev + 1)!"
      }
    },
    {
      id: "r_key",
      technology: "React",
      subtopic: "Virtual DOM & Reconciliation",
      question: "Why should you avoid using an array index as the 'key' prop when rendering dynamic lists in React?",
      codeSnippet: `{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}`,
      options: [
        { key: "A", text: "If items are reordered, inserted, or deleted, React's reconciliation may reuse old DOM nodes and internal component state for the wrong items." },
        { key: "B", text: "Because React keys must always be alphanumeric strings, and indexes are numbers." },
        { key: "C", text: "Using an array index disables Virtual DOM reconciliation entirely." },
        { key: "D", text: "Array indexes cause JavaScript memory leaks in garbage collection." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "React uses keys to identify which items have changed, been added, or been removed. When the list is mutated, index positions shift, causing React to associate old component instance state (like input values or focus) with the wrong data item.",
        whyIncorrect: "Keys can be numbers and do not disable reconciliation. The issue is identity stability across renders.",
        proTip: "Always use stable unique IDs from your database (e.g. item.id or crypto.randomUUID()). Only use index if the list is strictly static and never filtered or reordered."
      }
    },
    {
      id: "r_cleanup",
      technology: "React",
      subtopic: "Hooks & Lifecycle",
      question: "When does the cleanup function returned from a useEffect hook execute?",
      codeSnippet: `useEffect(() => {
  const handler = () => console.log('active');
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  };
}, [dependency]);`,
      options: [
        { key: "A", text: "Before the effect re-runs on dependency changes, and when the component unmounts." },
        { key: "B", text: "Only when the parent component unmounts from the DOM tree." },
        { key: "C", text: "Immediately after the JSX renders to the screen, before the effect body executes." },
        { key: "D", text: "At every microtask tick in the browser event loop." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "React calls the return cleanup function prior to running the effect again with new dependencies (to clean up the previous run's subscriptions) and also when the component unmounts completely.",
        whyIncorrect: "If it only ran on unmount, you would accumulate duplicate event listeners on every dependency change.",
        proTip: "Always clean up timers (clearInterval), WebSocket connections, and event listeners in the cleanup return function to prevent memory leaks."
      }
    },
    {
      id: "r_memo",
      technology: "React",
      subtopic: "Memoization & Performance",
      question: "What is the primary difference between useCallback and useMemo?",
      codeSnippet: `const memoizedCallback = useCallback(() => fn(a, b), [a, b]);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`,
      options: [
        { key: "A", text: "useCallback caches a function instance between renders; useMemo caches the computed return value of a function." },
        { key: "B", text: "useCallback runs asynchronously in a web worker; useMemo runs synchronously on the main thread." },
        { key: "C", text: "useMemo is deprecated in modern React, while useCallback is the recommended replacement." },
        { key: "D", text: "useCallback triggers component re-renders when dependencies change, while useMemo suppresses re-renders." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useCallback preserves the function reference between renders so child components wrapped in React.memo don't re-render from reference changes.",
        whyIncorrect: "Neither uses web workers, and neither is deprecated. Both are fundamental hooks for reference identity and computational caching.",
        proTip: "Don't prematurely wrap everything in useMemo/useCallback. Use them when passing callbacks to memoized child components or as dependencies in useEffect."
      }
    },
    {
      id: "r_custom_hook",
      technology: "React",
      subtopic: "Custom Hooks",
      question: "If two separate components call the same custom hook, do they share the same state?",
      codeSnippet: `function ComponentA() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>{count}</button>;
}

function ComponentB() {
  const { count } = useCounter();
  return <div>{count}</div>;
}`,
      options: [
        { key: "A", text: "No, each component calling a custom hook gets its own isolated instance of the hook's internal state." },
        { key: "B", text: "Yes, custom hooks act as global singletons sharing state across all caller components." },
        { key: "C", text: "Only if the custom hook is defined in the same file as the components." },
        { key: "D", text: "Yes, but only in React 18 Concurrent Mode." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Custom hooks share stateful logic, NOT state itself. Every call to a hook creates an entirely independent state and effect instance for that specific component.",
        whyIncorrect: "To share actual state between components, you must lift state up, use React Context, or use a state management library (Zustand/Redux).",
        proTip: "Think of custom hooks like regular functions that can call other React hooks: calling the function twice produces two separate execution contexts."
      }
    },
    {
      id: "r_ref",
      technology: "React",
      subtopic: "Hooks & Lifecycle",
      question: "What happens when you mutate the .current property of a useRef object?",
      codeSnippet: `const timerId = useRef(null);

const handleStart = () => {
  timerId.current = setInterval(() => {}, 1000);
};`,
      options: [
        { key: "A", text: "It stores the value without causing a component re-render." },
        { key: "B", text: "It schedules an asynchronous re-render like useState." },
        { key: "C", text: "It resets the component to its initial mount state." },
        { key: "D", text: "It throws an error in Strict Mode because refs are immutable." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "useRef returns a plain JavaScript object with a mutable '.current' property that persists across renders. Changing '.current' does NOT trigger a re-render.",
        whyIncorrect: "If you need a value change to trigger a visual re-render on screen, use useState instead.",
        proTip: "useRef is ideal for storing DOM node references, timer IDs, previous state snapshots, and values that don't directly affect the rendered JSX."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 2. JAVASCRIPT
  // --------------------------------------------------------------------------
  javascript: [
    {
      id: "js_event_loop",
      technology: "JavaScript",
      subtopic: "Event Loop & Asynchronous",
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
        { key: "A", text: "1, 4, 3, 2" },
        { key: "B", text: "1, 2, 3, 4" },
        { key: "C", text: "1, 4, 2, 3" },
        { key: "D", text: "1, 3, 4, 2" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Synchronous code runs first ('1', then '4'). Before taking the next macrotask (setTimeout '2') from the task queue, the event loop drains the entire microtask queue (Promise '3'). Therefore: 1 -> 4 -> 3 -> 2.",
        whyIncorrect: "Even with 0ms delay, setTimeout is placed in the Macrotask queue. Promises are Microtasks and always execute before macrotasks.",
        proTip: "Microtasks (Promises, queueMicrotask) always take priority and execute immediately after the current call stack clears."
      }
    },
    {
      id: "js_closure",
      technology: "JavaScript",
      subtopic: "Closures & Scoping",
      question: "What does this code output due to JavaScript variable scoping?",
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
        { key: "A", text: "3 3 3" },
        { key: "B", text: "0 1 2" },
        { key: "C", text: "undefined undefined undefined" },
        { key: "D", text: "NaN NaN NaN" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "'var' is function-scoped. By the time the loop completes, 'i' equals 3. All 3 closures reference the exact same memory binding of 'i', so each returns 3.",
        whyIncorrect: "To get '0 1 2', use 'let i = 0', which creates a fresh block-scoped binding for each loop iteration.",
        proTip: "Always use 'const' and 'let' in modern JavaScript to prevent variable leakage from function-scoped 'var'."
      }
    },
    {
      id: "js_this",
      technology: "JavaScript",
      subtopic: "this & Prototypes",
      question: "How does the 'this' keyword behave inside arrow functions compared to regular functions?",
      codeSnippet: `const team = {
  name: 'Alpha',
  regular: function() { return this.name; },
  arrow: () => { return this.name; }
};`,
      options: [
        { key: "A", text: "Arrow functions lexically capture 'this' from their enclosing lexical context where they were created." },
        { key: "B", text: "Arrow functions automatically bind 'this' to the closest object literal." },
        { key: "C", text: "Arrow functions dynamically rebind 'this' based on how the function is invoked." },
        { key: "D", text: "Arrow functions throw a TypeError if 'this' is accessed inside them." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Arrow functions lack their own 'this'. They inherit 'this' from the outer lexical scope (which in a top-level module is global/window, not the object literal).",
        whyIncorrect: "Object literals do not create a lexical scope. Therefore team.arrow() looks outside the object.",
        proTip: "Never use arrow functions for methods on object literals if those methods need to access 'this.property'!"
      }
    },
    {
      id: "js_nan",
      technology: "JavaScript",
      subtopic: "Type Coercion & Primitives",
      question: "What is the return value of typeof NaN in JavaScript?",
      codeSnippet: `console.log(typeof NaN);`,
      options: [
        { key: "A", text: "'number'" },
        { key: "B", text: "'undefined'" },
        { key: "C", text: "'nan'" },
        { key: "D", text: "'object'" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Under the IEEE 754 floating-point standard used by JavaScript, NaN ('Not a Number') is formally a numeric value indicating an invalid calculation result.",
        whyIncorrect: "Even though its name is 'Not a Number', its technical type specification in the ECMAScript engine is 'number'.",
        proTip: "Use Number.isNaN(val) instead of global isNaN(val) to avoid forced string-to-number coercion bugs!"
      }
    },
    {
      id: "js_clone",
      technology: "JavaScript",
      subtopic: "Array Methods & Objects",
      question: "What is the result of mutating a nested object after using the spread operator?",
      codeSnippet: `const original = { user: { name: 'Alex' }, role: 'Admin' };
const shallow = { ...original };
shallow.user.name = 'Sam';`,
      options: [
        { key: "A", text: "original.user.name also becomes 'Sam' because nested objects are copied by reference." },
        { key: "B", text: "original.user.name remains 'Alex' because spread creates a deep copy." },
        { key: "C", text: "It throws a TypeError because object spread freezes sub-objects." },
        { key: "D", text: "shallow.user becomes undefined." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "The spread operator ({ ...original }) creates a shallow copy. Top-level properties are copied, but nested objects remain shared references pointing to the same memory heap.",
        whyIncorrect: "Spread does not perform recursive deep cloning.",
        proTip: "Use the modern standard structuredClone(original) for true deep cloning without the serialization limitations of JSON.parse(JSON.stringify())."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 3. HTML5 & CSS3
  // --------------------------------------------------------------------------
  html_css: [
    {
      id: "css_box_model",
      technology: "HTML & CSS",
      subtopic: "CSS Box Model",
      question: "What does 'box-sizing: border-box' do to an element with width: 200px, padding: 20px, and border: 5px?",
      codeSnippet: `.card {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}`,
      options: [
        { key: "A", text: "The total rendered width on screen is exactly 200px (padding and border are absorbed inside)." },
        { key: "B", text: "The total rendered width will be 250px (200 + 40 padding + 10 border)." },
        { key: "C", text: "The border is ignored and only padding is added to the 200px." },
        { key: "D", text: "It causes the element to overflow its parent flex container." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Under 'border-box', the element's declared width includes padding and border. The content area shrinks to (200 - 40 - 10 = 150px), making the total visual width exactly 200px.",
        whyIncorrect: "Option B describes default 'content-box' behavior where padding and borders expand outside the specified width.",
        proTip: "Add '*, *::before, *::after { box-sizing: border-box; }' at the top of your global CSS for predictable component sizing."
      }
    },
    {
      id: "css_specificity",
      technology: "HTML & CSS",
      subtopic: "Specificity & Cascade",
      question: "Which of the following CSS selectors has the highest specificity?",
      codeSnippet: `/* Selector A */ #profile .bio { color: blue; }
/* Selector B */ body div.container #profile { color: red; }
/* Selector C */ header.main-header div p.bio { color: green; }
/* Selector D */ #profile.active { color: purple; }`,
      options: [
        { key: "A", text: "Selector B: 1 ID, 1 Class, 2 Elements (Specificity: 1, 1, 2) - HIGHEST" },
        { key: "B", text: "Selector A: 1 ID, 1 Class, 0 Elements (Specificity: 1, 1, 0)" },
        { key: "C", text: "Selector C: 0 IDs, 2 Classes, 3 Elements (Specificity: 0, 2, 3)" },
        { key: "D", text: "All selectors containing 1 ID have identical specificity." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Specificity is calculated as (IDs, Classes/Attributes, Elements). Selector B has 1 ID, 1 Class, and 2 Elements (1, 1, 2), breaking the tie with Selector A (1, 1, 0) and D (1, 1, 0).",
        whyIncorrect: "Element selectors DO count as tie-breakers when ID and class counts are equal.",
        proTip: "Keep CSS specificity low by relying on single classes (BEM or utility classes) rather than chaining deep ancestor selectors."
      }
    },
    {
      id: "css_flexbox",
      technology: "HTML & CSS",
      subtopic: "Flexbox Layout",
      question: "In CSS Flexbox, what is the role of justify-content vs align-items?",
      codeSnippet: `.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`,
      options: [
        { key: "A", text: "justify-content aligns along the main axis (vertical in column); align-items aligns along the cross axis (horizontal in column)." },
        { key: "B", text: "justify-content is always horizontal; align-items is always vertical regardless of flex-direction." },
        { key: "C", text: "justify-content is for text only; align-items is for child elements." },
        { key: "D", text: "justify-content only works in CSS Grid, not Flexbox." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "The main axis depends on flex-direction. When flex-direction is 'column', the main axis is vertical (handled by justify-content) and the cross axis is horizontal (handled by align-items).",
        whyIncorrect: "justify-content is NOT always horizontal. It always follows the direction of the main axis.",
        proTip: "Remember: 'justify-' = along the main axis; 'align-' = perpendicular along the cross axis."
      }
    },
    {
      id: "html_semantic",
      technology: "HTML & CSS",
      subtopic: "Semantic HTML & Accessibility",
      question: "Which HTML5 semantic element is most appropriate for a self-contained, independently distributable piece of content like a blog post or news item?",
      codeSnippet: `<article>
  <h2>Tech Breakthrough</h2>
  <p>Article content here...</p>
</article>`,
      options: [
        { key: "A", text: "<article>" },
        { key: "B", text: "<section>" },
        { key: "C", text: "<aside>" },
        { key: "D", text: "<div>" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "<article> represents a complete, self-contained composition that makes sense on its own if syndicated or shared independently.",
        whyIncorrect: "<section> is for thematic grouping of content within a document; <aside> is for tangentially related sidebar content.",
        proTip: "Use <article> for items like blog cards, forum posts, product cards, or news stories to improve accessibility and SEO."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 4. TYPESCRIPT
  // --------------------------------------------------------------------------
  typescript: [
    {
      id: "ts_interface_vs_type",
      technology: "TypeScript",
      subtopic: "Type vs Interface",
      question: "What unique capability does an 'interface' have in TypeScript that a 'type' alias does NOT have?",
      codeSnippet: `interface User {
  name: string;
}
interface User {
  age: number;
}
// Merged: { name: string; age: number; }`,
      options: [
        { key: "A", text: "Declaration merging: multiple interface declarations with the same name automatically merge into one." },
        { key: "B", text: "Interfaces can describe union types, while type aliases cannot." },
        { key: "C", text: "Interfaces run at JavaScript runtime, while types are stripped during compilation." },
        { key: "D", text: "Interfaces can only be used with classes, not plain objects." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "TypeScript automatically merges interface declarations with the same identifier in the same scope (declaration merging). Re-declaring a 'type' with the same name throws a duplicate identifier compiler error.",
        whyIncorrect: "Type aliases are the ones that can express unions (type A = B | C); interfaces cannot. Both are completely erased at runtime.",
        proTip: "Use 'interface' when designing public library APIs or extensible objects; use 'type' for unions, primitives, tuples, and complex utility operations."
      }
    },
    {
      id: "ts_generics",
      technology: "TypeScript",
      subtopic: "Generics",
      question: "What is the purpose of the generic constraint '<T extends { id: string }>'?",
      codeSnippet: `function getEntityId<T extends { id: string }>(entity: T): string {
  return entity.id;
}`,
      options: [
        { key: "A", text: "It restricts T so callers can only pass objects that have at least an 'id' property of type string." },
        { key: "B", text: "It forces T to be a class that extends a global Entity base class." },
        { key: "C", text: "It converts any argument into a string before calling the function." },
        { key: "D", text: "It disables TypeScript type checking for the entity parameter." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "The 'extends' clause on a generic parameter acts as a constraint. The compiler guarantees that whatever type T is supplied, it satisfies the shape { id: string }, permitting safe access to entity.id.",
        whyIncorrect: "Generics do not perform runtime type coercion and do not require classes.",
        proTip: "Generic constraints let you write reusable functions without sacrificing type safety or losing the specific return type of the caller."
      }
    },
    {
      id: "ts_any_unknown",
      technology: "TypeScript",
      subtopic: "Narrowing & Guards",
      question: "What is the difference between 'unknown' and 'any' in TypeScript?",
      codeSnippet: `let valA: any = "hello";
valA.toUpperCase(); // Allowed

let valB: unknown = "hello";
valB.toUpperCase(); // Compiler Error!`,
      options: [
        { key: "A", text: "'unknown' is the type-safe counterpart of 'any'; you cannot call methods or access properties on 'unknown' without type narrowing first." },
        { key: "B", text: "'any' is for primitives; 'unknown' is exclusively for objects and functions." },
        { key: "C", text: "'unknown' throws a JavaScript runtime exception when assigned a value." },
        { key: "D", text: "'any' and 'unknown' are identical in modern TypeScript." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "'any' turns off the type checker entirely. 'unknown' represents any possible value, but the compiler forces you to perform runtime type checking (typeof, instanceof, or custom type guard) before operating on it.",
        whyIncorrect: "'unknown' exists purely at compile time like all TypeScript types and works with all values.",
        proTip: "Always prefer 'unknown' over 'any' when handling untrusted external data (such as JSON.parse or third-party API payloads)."
      }
    },
    {
      id: "ts_utility_pick",
      technology: "TypeScript",
      subtopic: "Utility Types",
      question: "What does the utility type 'Pick<User, 'name' | 'email'>' produce?",
      codeSnippet: `interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

type UserPublic = Pick<User, 'name' | 'email'>;`,
      options: [
        { key: "A", text: "A new type containing only the 'name' and 'email' properties from User." },
        { key: "B", text: "A new type excluding 'name' and 'email' from User." },
        { key: "C", text: "A function that extracts those values at runtime." },
        { key: "D", text: "A union type: string | string." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Pick<T, K> constructs a type by picking the set of properties K from T. To exclude properties, you would use Omit<T, K>.",
        whyIncorrect: "Excluding properties is handled by Omit, not Pick.",
        proTip: "Use Pick and Omit to derive DTOs (Data Transfer Objects) and sanitized public models from your main domain models without duplicating fields."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 5. NODE.JS
  // --------------------------------------------------------------------------
  nodejs: [
    {
      id: "node_event_loop",
      technology: "Node.js",
      subtopic: "Event Loop & Libuv",
      question: "Which component powers the asynchronous non-blocking I/O and thread pool in Node.js?",
      codeSnippet: `// Node.js architecture:
// V8 (JS execution) + [?] (Event Loop & Thread Pool)`,
      options: [
        { key: "A", text: "libuv" },
        { key: "B", text: "Chromium Blink" },
        { key: "C", text: "Webpack" },
        { key: "D", text: "Babel" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "libuv is the multi-platform C library that provides the event loop, thread pool (for file I/O, DNS lookup, crypto), and asynchronous networking in Node.js.",
        whyIncorrect: "V8 handles JavaScript compilation and execution, while libuv handles the operating system I/O abstraction and event loop.",
        proTip: "By default, libuv has a thread pool size of 4. You can adjust it for crypto/image processing workloads using the UV_THREADPOOL_SIZE environment variable."
      }
    },
    {
      id: "node_streams",
      technology: "Node.js",
      subtopic: "Streams & Buffers",
      question: "Why are Node.js Streams preferred over fs.readFile when handling large multi-gigabyte files?",
      codeSnippet: `// Option A: fs.readFile loads entire 4GB file into RAM
// Option B: fs.createReadStream().pipe(res) reads in chunks`,
      options: [
        { key: "A", text: "Streams process data sequentially in small chunks (buffers), keeping memory consumption minimal without exceeding the V8 heap limit." },
        { key: "B", text: "Streams automatically compress the file using gzip." },
        { key: "C", text: "fs.readFile is asynchronous, while Streams are always synchronous." },
        { key: "D", text: "Streams encrypt the data during read operations." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "fs.readFile loads the complete file into RAM memory at once, which will crash your Node process with an 'out of memory' error for large files. Streams process data in small 64KB chunks and support backpressure.",
        whyIncorrect: "Streams do not compress or encrypt by default unless piped through zlib/crypto transforms.",
        proTip: "Always use pipeline() from 'stream/promises' when piping streams in modern Node.js to properly handle errors and prevent socket leaks."
      }
    },
    {
      id: "node_nexttick",
      technology: "Node.js",
      subtopic: "Event Loop & Libuv",
      question: "When does a callback scheduled with 'process.nextTick()' execute?",
      codeSnippet: `process.nextTick(() => {
  console.log('nextTick');
});

setImmediate(() => {
  console.log('setImmediate');
});`,
      options: [
        { key: "A", text: "Immediately after the current operation finishes, before the event loop advances to the next phase." },
        { key: "B", text: "After all timers and I/O callbacks have finished." },
        { key: "C", text: "In the check phase alongside setImmediate." },
        { key: "D", text: "Only when the Node process terminates." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "process.nextTick is not technically part of the libuv event loop. It executes at the end of the current synchronous turn of the call stack, starving other I/O if called recursively.",
        whyIncorrect: "setImmediate runs in the Check phase of the event loop; nextTick runs immediately after the current operation completes.",
        proTip: "Avoid recursive process.nextTick() loops as they completely starve the event loop, preventing I/O operations from ever firing."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 6. EXPRESS.JS
  // --------------------------------------------------------------------------
  express: [
    {
      id: "exp_error_middleware",
      technology: "Express.js",
      subtopic: "Error Handling (4-params)",
      question: "What is the exact parameter signature required for Express to recognize a custom error-handling middleware?",
      codeSnippet: `// Which parameter signature tells Express this is an Error Handler?
app.use((a, b, c, d) => {
  res.status(500).json({ error: 'Internal Error' });
});`,
      options: [
        { key: "A", text: "(err, req, res, next) with exactly 4 parameters" },
        { key: "B", text: "(req, res, next, err)" },
        { key: "C", text: "(err, req, res) with 3 parameters" },
        { key: "D", text: "(error, next)" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Express inspects the function's arity (fn.length). A middleware MUST have exactly 4 parameters (err, req, res, next) for Express to identify it as an error-handling middleware.",
        whyIncorrect: "If you only define 3 parameters (err, req, res), Express treats it as a standard request middleware and passes the request object as the first parameter!",
        proTip: "Always place your 4-parameter error middleware at the very end of your middleware stack, after all route handlers."
      }
    },
    {
      id: "exp_cors",
      technology: "Express.js",
      subtopic: "CORS & Security",
      question: "Why does a browser trigger an HTTP OPTIONS preflight request before certain API calls?",
      codeSnippet: `// Browser sends:
OPTIONS /api/data HTTP/1.1
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization, Content-Type`,
      options: [
        { key: "A", text: "The browser checks with the server first if the cross-origin request with custom headers (like Authorization or JSON) is allowed before sending the real request." },
        { key: "B", text: "Because the backend database server is disconnected." },
        { key: "C", text: "Because Express routes cannot accept POST requests without an OPTIONS check." },
        { key: "D", text: "Because the browser is verifying SSL certificates." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Browsers enforce the Cross-Origin Resource Sharing (CORS) security policy. For non-simple requests (with custom headers like Authorization or application/json), browsers send an automatic OPTIONS preflight check.",
        whyIncorrect: "CORS is a browser security mechanism, not a database or SSL check. Postman and cURL do not send preflights.",
        proTip: "Use the 'cors' middleware in Express (app.use(cors())) to automatically handle preflight OPTIONS requests with proper headers."
      }
    },
    {
      id: "exp_middleware_next",
      technology: "Express.js",
      subtopic: "Middleware Architecture",
      question: "What happens if a custom Express middleware does NOT call next() and does NOT send a response?",
      codeSnippet: `app.use((req, res, next) => {
  console.log('Logged request');
  // Neither next() nor res.send() is called!
});`,
      options: [
        { key: "A", text: "The client request hangs indefinitely until it hits a network timeout." },
        { key: "B", text: "Express automatically calls next() after 5 seconds." },
        { key: "C", text: "Express immediately returns a 200 OK empty response." },
        { key: "D", text: "The Node.js server crashes with a segmentation fault." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Express executes middleware sequentially. If you don't invoke next() to pass control to the next handler, and don't terminate the request by sending a response (res.json, res.send), the request hangs until client timeout.",
        whyIncorrect: "Express does not have an automatic default timeout or fallback next() invocation.",
        proTip: "Every middleware must either end the request-response cycle or call next() to pass execution forward."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 7. MONGODB
  // --------------------------------------------------------------------------
  mongodb: [
    {
      id: "mongo_doc_limit",
      technology: "MongoDB",
      subtopic: "Document Schema & Limits",
      question: "What is the maximum BSON document size limit in MongoDB?",
      codeSnippet: `// Document structure in collection:
{
  _id: ObjectId("..."),
  username: "alex",
  events: [ /* massive array */ ]
}`,
      options: [
        { key: "A", text: "16 Megabytes (MB)" },
        { key: "B", text: "2 Megabytes (MB)" },
        { key: "C", text: "64 Megabytes (MB)" },
        { key: "D", text: "Unlimited, constrained only by disk space." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "MongoDB enforces a strict 16MB document size limit to prevent memory bloat and ensure fast query execution and network transmission.",
        whyIncorrect: "If you have rapidly growing unbounded arrays (like user logs or comments), embedding them in a single document will eventually crash at 16MB. You must use relational referencing instead.",
        proTip: "Use GridFS if you need to store files larger than 16MB in MongoDB, or store files in AWS S3 and save the URL in MongoDB."
      }
    },
    {
      id: "mongo_aggregation",
      technology: "MongoDB",
      subtopic: "Aggregation Pipeline",
      question: "In a MongoDB aggregation pipeline, which stage performs a left outer join to another collection?",
      codeSnippet: `db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "inventory_docs"
    }
  }
])`,
      options: [
        { key: "A", text: "$lookup" },
        { key: "B", text: "$match" },
        { key: "C", text: "$project" },
        { key: "D", text: "$unwind" }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "$lookup performs a left outer join to an unsharded collection in the same database to filter in documents from the 'joined' collection for processing.",
        whyIncorrect: "$match filters documents, $project reshapes fields, and $unwind deconstructs an array field into multiple documents.",
        proTip: "Make sure the foreignField in the target collection has an index to ensure your $lookup joins execute with high performance."
      }
    },
    {
      id: "mongo_lean",
      technology: "MongoDB",
      subtopic: "Mongoose Schemas",
      question: "Why do developers add .lean() to Mongoose find queries in performance-critical read operations?",
      codeSnippet: `const users = await User.find({ status: 'active' }).lean();`,
      options: [
        { key: "A", text: "It returns plain JavaScript objects instead of heavy Mongoose Documents, dramatically reducing memory and CPU overhead." },
        { key: "B", text: "It compresses the returned data into gzip format." },
        { key: "C", text: "It skips database indexes to read directly from memory." },
        { key: "D", text: "It deletes the documents after reading them." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "By default, Mongoose wraps query results in full Document instances with internal change-tracking, getters, setters, and save methods. .lean() skips this overhead, making queries up to 5x faster.",
        whyIncorrect: "lean() does not compress or delete documents; it simply skips Mongoose Document instantiation.",
        proTip: "Always use .lean() for read-only queries where you are only displaying data and don't need to call doc.save() or access Mongoose virtuals."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 8. SQL & POSTGRESQL
  // --------------------------------------------------------------------------
  sql: [
    {
      id: "sql_joins",
      technology: "SQL & PostgreSQL",
      subtopic: "Joins (Inner/Left/Right)",
      question: "What is the difference between an INNER JOIN and a LEFT JOIN in SQL?",
      codeSnippet: `SELECT u.name, o.total 
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;`,
      options: [
        { key: "A", text: "INNER JOIN returns only rows with matches in both tables; LEFT JOIN returns all rows from the left table, with NULLs for unmatched right-table columns." },
        { key: "B", text: "LEFT JOIN only works on indexed columns, whereas INNER JOIN works on any column." },
        { key: "C", text: "INNER JOIN deletes rows that do not match across tables." },
        { key: "D", text: "There is no difference; modern SQL optimizers convert all LEFT JOINs to INNER JOINs." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "LEFT JOIN guarantees every row from the left table appears in the output at least once. If a user has no orders, their order fields will simply evaluate to NULL.",
        whyIncorrect: "INNER JOIN excludes any user who has 0 orders.",
        proTip: "Use LEFT JOIN whenever you need all parent records regardless of whether child records exist (e.g. users who may or may not have placed orders)."
      }
    },
    {
      id: "sql_acid",
      technology: "SQL & PostgreSQL",
      subtopic: "Transactions & ACID",
      question: "In relational database ACID guarantees, what does 'Atomicity' mean?",
      codeSnippet: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
      options: [
        { key: "A", text: "All operations in the transaction succeed completely, or if any part fails, the entire transaction is rolled back (all-or-nothing)." },
        { key: "B", text: "Data is written across atomic physical CPU registers." },
        { key: "C", text: "Transactions are executed in parallel without any locks." },
        { key: "D", text: "Data is automatically encrypted using quantum-safe algorithms." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Atomicity ensures that a series of database operations either execute entirely or have zero effect. If money is deducted from account 1 but adding to account 2 fails, the transaction rolls back cleanly.",
        whyIncorrect: "Consistency ensures constraints are satisfied; Isolation ensures concurrent operations don't interfere; Durability ensures committed data survives crashes.",
        proTip: "Always wrap multi-table financial or inventory updates inside database transactions to prevent partial write corruption."
      }
    },
    {
      id: "sql_group_having",
      technology: "SQL & PostgreSQL",
      subtopic: "Grouping & Having",
      question: "What is the key difference between the WHERE clause and the HAVING clause in SQL?",
      codeSnippet: `SELECT department, COUNT(*) 
FROM employees 
WHERE salary > 50000 
GROUP BY department 
HAVING COUNT(*) > 5;`,
      options: [
        { key: "A", text: "WHERE filters rows before grouping/aggregation; HAVING filters the aggregated groups after grouping." },
        { key: "B", text: "WHERE is for PostgreSQL; HAVING is for MySQL." },
        { key: "C", text: "HAVING can only be used with primary keys." },
        { key: "D", text: "WHERE and HAVING can be used interchangeably." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "WHERE filters raw individual records prior to the GROUP BY stage. You cannot use aggregate functions like COUNT() or SUM() inside WHERE. HAVING filters the summarized groups after aggregation.",
        whyIncorrect: "Both WHERE and HAVING are standard SQL supported across all relational databases.",
        proTip: "Filter out irrelevant individual rows early with WHERE to speed up the GROUP BY stage, then filter aggregate totals with HAVING."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 9. GIT & GITHUB
  // --------------------------------------------------------------------------
  git: [
    {
      id: "git_rebase_vs_merge",
      technology: "Git & GitHub",
      subtopic: "Rebase vs Merge",
      question: "What is the difference between 'git merge' and 'git rebase' when integrating changes from a main branch?",
      codeSnippet: `// Option 1: git merge main
// Option 2: git rebase main`,
      options: [
        { key: "A", text: "git merge creates a new merge commit preserving exact history; git rebase rewrites your branch commits on top of main, creating a linear history." },
        { key: "B", text: "git rebase deletes uncommitted files, while git merge stashes them." },
        { key: "C", text: "git merge works with GitHub, while git rebase only works on local git." },
        { key: "D", text: "git rebase forces all team members to re-clone the repository." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Rebase lifts your branch commits and replays them sequentially onto the tip of the target branch. This avoids cluttering git log with trivial 'Merge branch' commits.",
        whyIncorrect: "Never rebase commits that have already been pushed to a shared public branch used by other developers (Golden Rule of Rebasing).",
        proTip: "Use 'git pull --rebase' on your local feature branches to keep your commit tree clean, linear, and easy to review in pull requests."
      }
    },
    {
      id: "git_reset_vs_revert",
      technology: "Git & GitHub",
      subtopic: "HEAD & Reset vs Revert",
      question: "Why is 'git revert' considered safer than 'git reset --hard' on a shared public branch?",
      codeSnippet: `// Scenario: Undo commit abc1234 on main branch
git revert abc1234`,
      options: [
        { key: "A", text: "git revert creates a brand new commit that inverts the changes without rewriting commit history, preserving collaboration." },
        { key: "B", text: "git revert deletes the remote branch automatically." },
        { key: "C", text: "git reset --hard creates a backup zip file on disk." },
        { key: "D", text: "git revert only works if you have Admin permissions on GitHub." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "git reset --hard alters past history by moving the branch pointer backwards, which will cause rejected pushes and conflicts for other teammates. git revert moves forward by recording an inverse commit.",
        whyIncorrect: "git reset does not create backup zips. Once pushed, rewriting history with reset creates serious synchronization headaches for teammates.",
        proTip: "Use git reset for local unpushed scratch work; use git revert for any commits that have already been pushed to origin."
      }
    },
    {
      id: "git_stash",
      technology: "Git & GitHub",
      subtopic: "Stashing & Cherry-pick",
      question: "What does 'git stash' do to your working directory?",
      codeSnippet: `git status // 3 modified files
git stash
git status // Clean working tree!`,
      options: [
        { key: "A", text: "It temporarily shelves your uncommitted changes so you can switch branches with a clean working tree." },
        { key: "B", text: "It permanently deletes all modified files." },
        { key: "C", text: "It commits your files directly to the remote repository." },
        { key: "D", text: "It creates a new pull request on GitHub." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "git stash takes your uncommitted modifications (both staged and unstaged) and saves them on a temporary stack of incomplete changes, reverting your directory to match HEAD.",
        whyIncorrect: "To restore your stashed work later, simply run 'git stash pop'.",
        proTip: "Give your stashes memorable names using 'git stash push -m \"WIP: modal design\"' so you know which stash to restore later."
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 10. SYSTEM DESIGN
  // --------------------------------------------------------------------------
  system_design: [
    {
      id: "sd_caching",
      technology: "System Design",
      subtopic: "Caching & Redis/CDN",
      question: "In the Cache-Aside (Lazy-Loading) pattern, what happens when an application needs to read data?",
      codeSnippet: `// 1. Look in Redis Cache
// 2. If Miss -> Query Database -> Write to Cache -> Return`,
      options: [
        { key: "A", text: "The app checks the cache first; on a cache miss, it reads from the database, writes the data to the cache, and returns it." },
        { key: "B", text: "The database automatically updates the cache synchronously before returning results." },
        { key: "C", text: "The cache intercepts all network packets at the DNS layer." },
        { key: "D", text: "Data is written to cache only when the database crashes." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Cache-Aside puts the application in control. The application only caches data that is actually requested. If data is missing (cache miss), it fetches from primary storage and populates the cache with a TTL.",
        whyIncorrect: "The database does not automatically populate the cache in Cache-Aside.",
        proTip: "Always set a TTL (Time-To-Live) on your cached keys to prevent stale data from lingering indefinitely!"
      }
    },
    {
      id: "sd_cap",
      technology: "System Design",
      subtopic: "CAP Theorem",
      question: "According to the CAP Theorem, in the presence of a Network Partition (P), what trade-off must a distributed system make?",
      codeSnippet: `// Network connection between data centers fails (Partition)
// System must choose between:
// [?] vs [?]`,
      options: [
        { key: "A", text: "Consistency (CP: return an error rather than stale data) OR Availability (AP: return available data even if potentially stale)." },
        { key: "B", text: "Cost vs Performance." },
        { key: "C", text: "CPU Speed vs Disk Storage." },
        { key: "D", text: "Encryption vs Compression." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Network partitions in distributed systems are inevitable. When nodes cannot communicate, you must either refuse to respond to guarantee consistency (CP) or respond with local data risking stale inconsistency (AP).",
        whyIncorrect: "You cannot choose both Consistency and Availability across a broken partition (CA across a partition is physically impossible).",
        proTip: "Financial systems and banks generally choose CP (Consistency over Availability), whereas social media feeds choose AP (Availability over immediate Consistency)."
      }
    },
    {
      id: "sd_load_balancer",
      technology: "System Design",
      subtopic: "Load Balancing",
      question: "What is the key advantage of Horizontal Scaling over Vertical Scaling?",
      codeSnippet: `// Vertical: Upgrade 1 server from 16GB -> 128GB RAM
// Horizontal: Add 10 independent 16GB stateless worker instances behind a Load Balancer`,
      options: [
        { key: "A", text: "No single point of failure and virtually limitless elasticity by adding commodity instances behind a load balancer." },
        { key: "B", text: "Horizontal scaling requires zero network configuration." },
        { key: "C", text: "Vertical scaling is infinitely scalable without hardware ceilings." },
        { key: "D", text: "Horizontal scaling makes application code simpler." }
      ],
      correctKey: "A",
      explanation: {
        whyCorrect: "Vertical scaling hits a hard hardware and cost ceiling (you can only get so many CPUs on a motherboard) and retains a single point of failure. Horizontal scaling distributes traffic across many instances.",
        whyIncorrect: "Vertical scaling has hard limits and downtime during upgrades. Horizontal scaling requires stateless architectures.",
        proTip: "Keep your application servers stateless (store session data in Redis or JWTs) so you can spin up or down horizontal worker nodes dynamically with auto-scaling groups."
      }
    }
  ]
};

// Map tech string aliases to canonical keys
export function resolveTechKey(technology) {
  const t = (technology || "").toLowerCase().trim();
  if (t.includes("react")) return "react";
  if (t.includes("type") || t.includes("ts")) return "typescript";
  if (t.includes("js") || t.includes("javascript")) return "javascript";
  if (t.includes("css") || t.includes("html") || t.includes("style")) return "html_css";
  if (t.includes("express")) return "express";
  if (t.includes("node")) return "nodejs";
  if (t.includes("mongo")) return "mongodb";
  if (t.includes("sql") || t.includes("postgres")) return "sql";
  if (t.includes("git")) return "git";
  if (t.includes("system") || t.includes("design") || t.includes("arch")) return "system_design";
  return "react";
}

// Fisher-Yates shuffle helper
export function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Retrieve fresh, non-repeating questions for a tech and topic
export function getExamQuestions({ technology = "React", topic = "All Topics", difficulty = "Intermediate", questionCount = 5 }) {
  const techKey = resolveTechKey(technology);
  const bank = EXAM_QUESTION_BANKS[techKey] || EXAM_QUESTION_BANKS.react;

  // Filter by topic if specified and not "all"
  let eligible = bank;
  const isAll = !topic || topic.toLowerCase() === "all" || topic.toLowerCase() === "all topics";
  if (!isAll) {
    const topLower = topic.toLowerCase().trim();
    const subtopicMatches = bank.filter(q =>
      (q.subtopic && q.subtopic.toLowerCase().includes(topLower)) ||
      (q.question && q.question.toLowerCase().includes(topLower))
    );
    if (subtopicMatches.length > 0) {
      eligible = subtopicMatches;
    }
  }

  // Retrieve seen question IDs from sessionStorage so questions don't repeat on back-to-back tests
  const historyKey = `SEEN_EXAM_QS_${techKey}`;
  let seenIds = [];
  try {
    const saved = sessionStorage.getItem(historyKey);
    seenIds = saved ? JSON.parse(saved) : [];
  } catch (e) {
    seenIds = [];
  }

  // Separate unseen from seen
  let unseen = eligible.filter(q => !seenIds.includes(q.id));

  // If all eligible questions have been seen, reset the history
  if (unseen.length === 0) {
    seenIds = [];
    unseen = eligible;
  }

  // Shuffle both pools
  unseen = shuffleArray(unseen);
  const seenPool = shuffleArray(eligible.filter(q => seenIds.includes(q.id)));

  // Combine unseen first, then seen if more are needed
  const candidatePool = [...unseen, ...seenPool];

  const targetCount = Math.min(Math.max(Number(questionCount) || 5, 3), 15);
  const selectedQuestions = candidatePool.slice(0, targetCount);

  // Update seen history
  const newlySeen = [...new Set([...seenIds, ...selectedQuestions.map(q => q.id)])];
  try {
    sessionStorage.setItem(historyKey, JSON.stringify(newlySeen));
  } catch (e) {
    // Ignore storage quota
  }

  // Shuffle answer options so the correct answer is not always in the same position
  const formattedQuestions = selectedQuestions.map((q, idx) => {
    // Clone options and shuffle
    const shuffledOptions = shuffleArray(q.options);
    const correctOption = q.options.find(o => o.key === q.correctKey);
    const newOptions = shuffledOptions.map((opt, i) => {
      const keys = ["A", "B", "C", "D"];
      return {
        key: keys[i],
        text: opt.text,
        isOriginalCorrect: opt.key === q.correctKey
      };
    });

    const newCorrectOption = newOptions.find(o => o.isOriginalCorrect);

    return {
      ...q,
      id: `${q.id}_run_${Date.now()}_${idx}`,
      options: newOptions.map(({ key, text }) => ({ key, text })),
      correctKey: newCorrectOption ? newCorrectOption.key : "A"
    };
  });

  return {
    technology,
    topic,
    difficulty,
    questions: formattedQuestions
  };
}

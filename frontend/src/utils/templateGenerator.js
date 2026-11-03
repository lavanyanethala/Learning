// Multi-Level Frontend Practice Challenges: Basic, Moderate, and Advanced
// Clean starter skeletons without pre-solved code, accompanied by target reference implementations.

export const LEVELS = ["Basic", "Moderate", "Advanced"];

export const TEMPLATE_PRESETS = [
  // ==========================================
  // BASIC LEVEL TEMPLATES (Beginner)
  // ==========================================
  {
    id: "profile-card",
    name: "Personal Profile & Bio Card",
    category: "UI Component",
    difficulty: "Basic",
    description:
      "Design a clean, modern user profile card with an avatar placeholder, user details, skill badges, and an interactive Follow button.",
    colors: {
      primary: "#3b82f6",
      accent: "#10b981",
      background: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
    },
    requirements: [
      "Centered responsive card layout with subtle drop shadow and rounded corners",
      "Circular avatar image or stylized placeholder with an online status indicator",
      "User name (bold) and profession/role subtitle",
      "Pill badges for core skills (e.g. HTML, CSS, JavaScript, UI/UX)",
      "Interactive 'Follow' button that toggles between 'Follow' and 'Following' with styling change",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Personal Profile Card</title>
  <style>
    /* CSS Reset & Body Setup */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    /* 
      TODO: Write your CSS styles below
      1. Style .profile-card with background, border-radius, padding, box-shadow
      2. Style the avatar container and status badge
      3. Style the skills pills (.tag / .badge)
      4. Style the follow button with hover and active states
    */
    .profile-card {
      /* Add card styles here */
    }

  </style>
</head>
<body>
  <!-- 
    TODO: Build your HTML structure below
    - Card container
    - Avatar placeholder / image
    - Name & title
    - Skills list
    - Follow / Message action buttons
  -->
  <div class="profile-card">
    <p style="color: #64748b; font-size: 0.95rem;">
      &larr; Start writing your HTML & CSS to build the Profile Card!
    </p>
  </div>

  <script>
    // TODO: Add JavaScript to toggle Follow / Following button state
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personal Profile Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .profile-card {
      background: #ffffff;
      width: 100%;
      max-width: 360px;
      border-radius: 20px;
      padding: 32px 24px;
      box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.8);
      transition: transform 0.2s;
    }
    .profile-card:hover {
      transform: translateY(-4px);
    }
    .avatar-wrapper {
      position: relative;
      width: 90px;
      height: 90px;
      margin: 0 auto 16px;
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      color: #ffffff;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
    }
    .status-dot {
      position: absolute;
      bottom: 2px;
      right: 4px;
      width: 16px;
      height: 16px;
      background-color: #10b981;
      border: 3px solid #ffffff;
      border-radius: 50%;
    }
    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 4px;
    }
    p.title {
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 18px;
    }
    .bio {
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 24px;
    }
    .tag {
      background: #f1f5f9;
      color: #334155;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid #e2e8f0;
    }
    .actions {
      display: flex;
      gap: 12px;
    }
    .btn {
      flex: 1;
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #3b82f6;
      color: #ffffff;
      border: none;
    }
    .btn-primary:hover {
      background: #2563eb;
    }
    .btn-primary.following {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
    }
    .btn-secondary {
      background: #ffffff;
      color: #475569;
      border: 1px solid #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f8fafc;
      color: #0f172a;
    }
  </style>
</head>
<body>
  <div class="profile-card">
    <div class="avatar-wrapper">
      <div class="avatar">AR</div>
      <div class="status-dot" title="Available for work"></div>
    </div>
    <h2>Alex Rivera</h2>
    <p class="title">Junior Frontend Developer</p>
    <p class="bio">Passionate about clean semantic markup, CSS Grid layouts, and responsive UI components.</p>
    
    <div class="tags">
      <span class="tag">HTML5</span>
      <span class="tag">CSS3</span>
      <span class="tag">JavaScript</span>
      <span class="tag">Flexbox</span>
      <span class="tag">Figma</span>
    </div>

    <div class="actions">
      <button class="btn btn-primary" id="followBtn" onclick="toggleFollow()">+ Follow</button>
      <button class="btn btn-secondary">Message</button>
    </div>
  </div>

  <script>
    function toggleFollow() {
      const btn = document.getElementById('followBtn');
      if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.textContent = '+ Follow';
      } else {
        btn.classList.add('following');
        btn.textContent = '✓ Following';
      }
    }
  </script>
</body>
</html>`,
  },

  {
    id: "contact-form",
    name: "Interactive Contact & Feedback Form",
    category: "Forms",
    difficulty: "Basic",
    description:
      "Construct a clean contact form with input fields for Name, Email, Subject, and Message, including focus styling and submission feedback.",
    colors: {
      primary: "#6366f1",
      success: "#10b981",
      background: "#f8fafc",
      card: "#ffffff",
      text: "#1e293b",
    },
    requirements: [
      "Responsive card containing contact form inputs",
      "Semantic input fields: Full Name (text), Email (email), Topic (select dropdown), Message (textarea)",
      "Polished focus states with outline glow and smooth border transitions",
      "Full-width submit button with hover effects",
      "JavaScript submission handler that prevents default reload and displays an inline success message",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Contact Form</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    /* 
      TODO: Style the form container (.contact-card),
      labels, input fields, dropdown select, textarea, and submit button.
      Add active/focus styling when clicking inside fields.
    */
    .contact-card {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build your form markup
    - Form title and subtitle
    - Name field
    - Email field
    - Subject dropdown
    - Message textarea
    - Submit button
    - Success feedback container
  -->
  <div class="contact-card">
    <p style="color: #64748b;">
      &larr; Create your Contact Form markup and styles according to the checklist!
    </p>
  </div>

  <script>
    // TODO: Prevent default form submit and show a success confirmation message
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact & Feedback Form</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .contact-card {
      background: #ffffff;
      width: 100%;
      max-width: 480px;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .header { margin-bottom: 24px; }
    .header h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
    .header p { color: #64748b; font-size: 0.9rem; }
    
    .form-group { margin-bottom: 18px; }
    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 6px;
    }
    input[type="text"],
    input[type="email"],
    select,
    textarea {
      width: 100%;
      padding: 10px 14px;
      font-size: 0.92rem;
      font-family: inherit;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: #f8fafc;
      color: #0f172a;
      transition: all 0.2s ease;
      outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: #6366f1;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
    textarea { resize: vertical; min-height: 90px; }
    
    .submit-btn {
      width: 100%;
      padding: 12px;
      background: #6366f1;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .submit-btn:hover { background: #4f46e5; }
    
    .alert-success {
      display: none;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      padding: 14px;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-top: 16px;
      text-align: center;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="contact-card">
    <div class="header">
      <h2>Get in Touch</h2>
      <p>Have questions or feedback? Leave a message below.</p>
    </div>

    <form id="contactForm">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Sarah Connor" required>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" placeholder="sarah@example.com" required>
      </div>

      <div class="form-group">
        <label for="topic">Inquiry Topic</label>
        <select id="topic" required>
          <option value="">Select a subject...</option>
          <option value="frontend">Frontend Coaching</option>
          <option value="project">Project Collaboration</option>
          <option value="general">General Question</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Type your message here..." required></textarea>
      </div>

      <button type="submit" class="submit-btn">Send Message</button>
      <div id="successMsg" class="alert-success">✓ Thank you! Your message has been sent successfully.</div>
    </form>
  </div>

  <script>
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const msg = document.getElementById('successMsg');
      msg.style.display = 'block';
      this.reset();
    });
  </script>
</body>
</html>`,
  },

  {
    id: "pricing-card",
    name: "Product Pricing Showcase Card",
    category: "Landing Page Component",
    difficulty: "Basic",
    description:
      "Create a highlighted tier pricing card featuring plan name, badge tag, price tag, checklist items with custom checkmarks, and an action CTA.",
    colors: {
      primary: "#2563eb",
      highlight: "#dbeafe",
      background: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
    },
    requirements: [
      "Visually distinct pricing card with prominent border and top accent badge",
      "Plan header ('Pro Plan') with a badge tag ('Most Popular')",
      "Large price heading ('$29') with period billing indicator ('/month')",
      "Feature list of at least 4 items with green checkmark bullet icons",
      "Gradient or highlighted Call-to-Action button with hover lift effect",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Pricing Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    /* 
      TODO: Style the .pricing-card container,
      badge label, price amount, feature items with checkmarks, and CTA button.
    */
    .pricing-card {
      /* Add your styles here */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build your Pricing Card layout
  -->
  <div class="pricing-card">
    <p style="color: #64748b;">
      &larr; Build your Pricing Tier Card according to the checklist!
    </p>
  </div>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pro Tier Pricing Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .pricing-card {
      background: #ffffff;
      width: 100%;
      max-width: 360px;
      border-radius: 20px;
      padding: 36px 28px;
      box-shadow: 0 12px 30px rgba(37, 99, 235, 0.08);
      border: 2px solid #2563eb;
      position: relative;
    }
    .badge {
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      background: #2563eb;
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 14px;
      border-radius: 999px;
    }
    .plan-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 6px; }
    .plan-desc { color: #64748b; font-size: 0.88rem; margin-bottom: 24px; }
    .price-box { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
    .price { font-size: 2.7rem; font-weight: 800; color: #0f172a; }
    .period { color: #64748b; font-size: 0.95rem; font-weight: 500; }
    
    .feature-list { list-style: none; margin-bottom: 30px; display: flex; flex-direction: column; gap: 12px; }
    .feature-item { display: flex; align-items: center; gap: 10px; font-size: 0.92rem; color: #334155; }
    .check-icon {
      width: 20px;
      height: 20px;
      background: #dcfce7;
      color: #16a34a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .cta-btn {
      width: 100%;
      padding: 13px;
      background: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
      transition: all 0.2s;
    }
    .cta-btn:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="pricing-card">
    <div class="badge">Most Popular</div>
    <h3 class="plan-name">Pro Developer</h3>
    <p class="plan-desc">For ambitious engineers shipping high performance web apps.</p>
    
    <div class="price-box">
      <span class="price">$29</span>
      <span class="period">/ month</span>
    </div>

    <ul class="feature-list">
      <li class="feature-item"><span class="check-icon">✓</span> Unlimited practice sandboxes</li>
      <li class="feature-item"><span class="check-icon">✓</span> AI code review & coaching</li>
      <li class="feature-item"><span class="check-icon">✓</span> Download clean offline templates</li>
      <li class="feature-item"><span class="check-icon">✓</span> Priority Discord community support</li>
    </ul>

    <button class="cta-btn">Start 14-Day Free Trial &rarr;</button>
  </div>
</body>
</html>`,
  },

  {
    id: "navbar-simple",
    name: "Responsive Navigation Bar",
    category: "Navigation",
    difficulty: "Basic",
    description:
      "Build a modern responsive navigation header with brand logo, nav links with active hover indicators, CTA button, and mobile toggle.",
    colors: {
      primary: "#0ea5e9",
      background: "#ffffff",
      text: "#0f172a",
      border: "#e2e8f0",
    },
    requirements: [
      "Clean horizontal navbar with flexbox layout and max-width container",
      "Brand logo with stylized accent icon or bold typography",
      "Nav links (Home, Practice, Notes, Guides) with subtle hover underline or color change",
      "Action button ('Sign In' or 'Get Started') aligned to the right",
      "Responsive hamburger toggle button for smaller screen widths",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Responsive Navbar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #0f172a;
    }
    
    /* 
      TODO: Style the <header> and <nav> elements:
      1. Flexbox alignment (justify-content: space-between)
      2. Link hover styles
      3. Mobile menu button styling
      4. Responsive media queries (@media (max-width: 768px))
    */
    header {
      /* Add navbar styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Create navbar markup
  -->
  <header>
    <p style="padding: 20px; color: #64748b;">
      &larr; Build your responsive navbar here!
    </p>
  </header>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Navigation Bar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      min-height: 100vh;
    }
    header {
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      font-size: 1.35rem;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .logo span { color: #0ea5e9; }
    
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }
    .nav-link {
      color: #475569;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      position: relative;
      transition: color 0.2s;
    }
    .nav-link:hover { color: #0ea5e9; }
    .nav-link.active { color: #0ea5e9; font-weight: 600; }
    
    .nav-actions { display: flex; align-items: center; gap: 12px; }
    .btn-login {
      background: #0ea5e9;
      color: #ffffff;
      padding: 9px 18px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-login:hover { background: #0284c7; }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #334155;
    }

    @media (max-width: 768px) {
      .menu-toggle { display: block; }
      .nav-menu {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: #ffffff;
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      }
      .nav-menu.open { display: flex; }
    }
  </style>
</head>
<body>
  <header>
    <div class="nav-container">
      <a href="#" class="logo">⚡ Code<span>Flow</span></a>
      <ul class="nav-menu" id="navMenu">
        <li><a href="#" class="nav-link active">Home</a></li>
        <li><a href="#" class="nav-link">Practice</a></li>
        <li><a href="#" class="nav-link">Daily Notes</a></li>
        <li><a href="#" class="nav-link">Resources</a></li>
      </ul>
      <div class="nav-actions">
        <button class="btn-login">Get Started</button>
        <button class="menu-toggle" id="toggleBtn" onclick="toggleMobileMenu()">☰</button>
      </div>
    </div>
  </header>

  <main style="padding: 60px 20px; text-align: center; max-width: 600px; margin: 0 auto;">
    <h1 style="font-size: 2rem; margin-bottom: 12px;">Responsive Navigation Bar</h1>
    <p style="color: #64748b;">Resize your browser window or switch device mode to test mobile menu toggle behavior.</p>
  </main>

  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('navMenu');
      menu.classList.toggle('open');
    }
  </script>
</body>
</html>`,
  },

  // ==========================================
  // MODERATE LEVEL TEMPLATES (Intermediate)
  // ==========================================
  {
    id: "todo-app",
    name: "Interactive To-Do & Task Tracker",
    category: "Web Application",
    difficulty: "Moderate",
    description:
      "Create a functional task manager app with input validation, task completion toggling, active/completed category filters, and task deletion.",
    colors: {
      primary: "#8b5cf6",
      completed: "#10b981",
      background: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
    },
    requirements: [
      "Text input with 'Add Task' button and Enter-key listener",
      "Dynamic task list rendering items with checkbox, task text, and delete icon",
      "Toggle task completion with strikethrough styling and completed indicator",
      "Filter buttons (All, Active, Completed) that dynamically filter the displayed tasks",
      "Active task counter ('3 tasks remaining') and Clear Completed button",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Interactive To-Do Tracker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    /* 
      TODO: Style your To-Do App
      1. Container box (.todo-box)
      2. Input & Add Button row
      3. Filter tabs (All, Active, Completed)
      4. Task items with checkbox and delete button
      5. Strikethrough style for completed tasks (.completed)
    */
    .todo-app {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build To-Do App structure
  -->
  <div class="todo-app">
    <p style="color: #94a3b8;">
      &larr; Start coding your Task Tracker app!
    </p>
  </div>

  <script>
    // TODO: Write JavaScript logic
    // 1. Array of tasks state
    // 2. Add task function
    // 3. Toggle completed function
    // 4. Delete task function
    // 5. Filter state & render function
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow To-Do Tracker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .todo-card {
      background: #1e293b;
      width: 100%;
      max-width: 480px;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .header { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: baseline; }
    .header h2 { font-size: 1.4rem; font-weight: 700; color: #fff; }
    .header span { font-size: 0.85rem; color: #94a3b8; }
    
    .input-row { display: flex; gap: 10px; margin-bottom: 20px; }
    .task-input {
      flex: 1;
      padding: 12px 16px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      color: #f8fafc;
      font-size: 0.95rem;
      outline: none;
    }
    .task-input:focus { border-color: #8b5cf6; }
    .add-btn {
      background: #8b5cf6;
      color: #fff;
      border: none;
      padding: 0 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .add-btn:hover { background: #7c3aed; }
    
    .filters { display: flex; gap: 8px; margin-bottom: 18px; border-bottom: 1px solid #334155; padding-bottom: 12px; }
    .filter-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 6px;
    }
    .filter-btn.active { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
    
    .task-list { list-style: none; display: flex; flex-direction: column; gap: 10px; max-height: 280px; overflow-y: auto; }
    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #334155;
      transition: all 0.2s;
    }
    .task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
    .task-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #8b5cf6;
    }
    .task-text { font-size: 0.92rem; color: #f8fafc; }
    .task-item.completed .task-text { text-decoration: line-through; color: #64748b; }
    .delete-btn {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 1.1rem;
      padding: 2px 6px;
      border-radius: 4px;
      transition: color 0.2s;
    }
    .delete-btn:hover { color: #ef4444; }
  </style>
</head>
<body>
  <div class="todo-card">
    <div class="header">
      <h2>TaskFlow</h2>
      <span id="counter">0 tasks remaining</span>
    </div>

    <div class="input-row">
      <input type="text" id="taskInput" class="task-input" placeholder="What needs to be done?" />
      <button id="addBtn" class="add-btn">Add</button>
    </div>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <ul class="task-list" id="taskList"></ul>
  </div>

  <script>
    let tasks = [
      { id: 1, text: "Learn CSS Flexbox and Grid", done: true },
      { id: 2, text: "Build responsive landing page", done: false },
      { id: 3, text: "Prepare React interview answers", done: false }
    ];
    let filter = "all";

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const counter = document.getElementById("counter");

    function render() {
      taskList.innerHTML = "";
      const filtered = tasks.filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        return true;
      });

      filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item" + (task.done ? " completed" : "");
        li.innerHTML = \`
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" \${task.done ? "checked" : ""} onchange="toggleTask(\${task.id})">
            <span class="task-text">\${task.text}</span>
          </div>
          <button class="delete-btn" onclick="deleteTask(\${task.id})">&times;</button>
        \`;
        taskList.appendChild(li);
      });

      const remaining = tasks.filter(t => !t.done).length;
      counter.textContent = \`\${remaining} task\${remaining === 1 ? "" : "s"} remaining\`;
    }

    function addTask() {
      const text = taskInput.value.trim();
      if (!text) return;
      tasks.push({ id: Date.now(), text, done: false });
      taskInput.value = "";
      render();
    }

    function toggleTask(id) {
      tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      render();
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      render();
    }

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.getAttribute("data-filter");
        render();
      });
    });

    render();
  </script>
</body>
</html>`,
  },

  {
    id: "ecommerce-showcase",
    name: "E-Commerce Product Showcase & Variant Picker",
    category: "E-Commerce",
    difficulty: "Moderate",
    description:
      "Build a dual-pane product card featuring interactive color variant selection, quantity increment/decrement, and an animated cart counter badge.",
    colors: {
      primary: "#2563eb",
      accent: "#f59e0b",
      background: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
    },
    requirements: [
      "Responsive 2-column layout (Product Preview Image / Info Details)",
      "Interactive color variant swatches that update active state on click",
      "Interactive quantity counter with minus and plus controls (prevent zero or negative)",
      "'Add to Cart' button with click ripple effect",
      "Top-right shopping cart icon with live badge counter updating on each add",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: E-Commerce Product Showcase</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    /* 
      TODO: Build the 2-column grid layout
      Left: image/icon pane
      Right: info pane with price, color selector, quantity counter, and add button
    */
    .product-card {
      /* Add styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build markup
  -->
  <div class="product-card">
    <p style="color: #64748b;">
      &larr; Build the Product Showcase with Variant Picker & Cart Counter!
    </p>
  </div>

  <script>
    // TODO: Write JS for quantity counter and Add to Cart badge update
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lumina SoundPro Headphones</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .top-bar {
      width: 100%;
      max-width: 800px;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
    }
    .cart-badge-wrapper {
      position: relative;
      background: #ffffff;
      padding: 10px 14px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .cart-count {
      background: #2563eb;
      color: #ffffff;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.78rem;
    }
    .product-card {
      background: #ffffff;
      max-width: 800px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0,0,0,0.08);
    }
    @media (max-width: 650px) { .product-card { grid-template-columns: 1fr; } }
    
    .image-pane {
      background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      font-size: 5rem;
    }
    .info-pane { padding: 36px; }
    .brand { color: #2563eb; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
    h1 { font-size: 1.6rem; margin: 6px 0 12px; font-weight: 800; }
    .price-box { display: flex; align-items: baseline; gap: 10px; margin-bottom: 18px; }
    .current-price { font-size: 1.8rem; font-weight: 800; color: #0f172a; }
    .old-price { font-size: 1.1rem; text-decoration: line-through; color: #94a3b8; }
    .discount { background: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    
    .colors { margin-bottom: 22px; }
    .colors p { font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: #475569; }
    .color-options { display: flex; gap: 10px; }
    .color-dot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      border: 3px solid transparent;
      transition: 0.2s;
    }
    .color-dot.active { border-color: #2563eb; transform: scale(1.1); }
    
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .qty-control {
      display: flex;
      align-items: center;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: #f8fafc;
    }
    .qty-btn {
      background: none;
      border: none;
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
      cursor: pointer;
      color: #334155;
    }
    .qty-val { width: 32px; text-align: center; font-weight: 700; }
    
    .add-btn {
      flex: 1;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .add-btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="cart-badge-wrapper">
      🛒 Cart <span class="cart-count" id="cartCount">0</span>
    </div>
  </div>

  <div class="product-card">
    <div class="image-pane" id="imagePane">🎧</div>
    <div class="info-pane">
      <div class="brand">Lumina Sound</div>
      <h1>SoundPro Wireless ANC Headphones</h1>
      
      <div class="price-box">
        <span class="current-price">$199.00</span>
        <span class="old-price">$249.00</span>
        <span class="discount">Save 20%</span>
      </div>

      <div class="colors">
        <p>Finish: <strong id="colorLabel">Space Gray</strong></p>
        <div class="color-options">
          <div class="color-dot active" style="background: #334155;" onclick="selectColor('#334155', 'Space Gray')"></div>
          <div class="color-dot" style="background: #0284c7;" onclick="selectColor('#0284c7', 'Deep Azure')"></div>
          <div class="color-dot" style="background: #e2e8f0;" onclick="selectColor('#e2e8f0', 'Arctic Silver')"></div>
        </div>
      </div>

      <div class="actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(-1)">-</button>
          <span class="qty-val" id="qtyVal">1</span>
          <button class="qty-btn" onclick="updateQty(1)">+</button>
        </div>
        <button class="add-btn" onclick="addToCart()">Add to Cart</button>
      </div>
    </div>
  </div>

  <script>
    let qty = 1;
    let totalCart = 0;

    function updateQty(delta) {
      qty = Math.max(1, qty + delta);
      document.getElementById('qtyVal').textContent = qty;
    }

    function selectColor(hex, name) {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('colorLabel').textContent = name;
    }

    function addToCart() {
      totalCart += qty;
      document.getElementById('cartCount').textContent = totalCart;
    }
  </script>
</body>
</html>`,
  },

  {
    id: "faq-accordion",
    name: "Interactive FAQ Accordion",
    category: "UI Component",
    difficulty: "Moderate",
    description:
      "Design an animated FAQ accordion where clicking a question expands its corresponding answer smoothly and toggles the chevron indicator.",
    colors: {
      primary: "#6366f1",
      background: "#f8fafc",
      card: "#ffffff",
      text: "#0f172a",
    },
    requirements: [
      "Stacked accordion container with question items",
      "Each item has a question header, rotating arrow indicator, and collapsible body content",
      "Smooth height/opacity CSS transition when opening and closing",
      "Active item highlight (border or subtle background tint)",
      "JavaScript click handlers allowing one or multiple panels to toggle",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: FAQ Accordion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    /* 
      TODO: Style the accordion container,
      accordion-item headers, chevron icon rotation, and collapsible answer panels.
    */
    .accordion-container {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build FAQ markup with at least 3 question cards
  -->
  <div class="accordion-container">
    <p style="color: #64748b;">
      &larr; Build your animated FAQ Accordion!
    </p>
  </div>

  <script>
    // TODO: Write JS to toggle active class on clicked item
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive FAQ Accordion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .faq-card {
      background: #ffffff;
      width: 100%;
      max-width: 560px;
      padding: 36px 32px;
      border-radius: 20px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.06);
    }
    .header { text-align: center; margin-bottom: 28px; }
    .header h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 6px; }
    .header p { color: #64748b; font-size: 0.92rem; }
    
    .accordion { display: flex; flex-direction: column; gap: 12px; }
    .accordion-item {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    .accordion-item.active { border-color: #6366f1; background: #faf5ff; }
    
    .accordion-header {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .chevron {
      font-size: 0.85rem;
      transition: transform 0.3s ease;
      color: #6366f1;
    }
    .accordion-item.active .chevron {
      transform: rotate(180deg);
    }
    
    .accordion-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 20px;
      color: #475569;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    .accordion-item.active .accordion-body {
      max-height: 150px;
      padding-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="faq-card">
    <div class="header">
      <h2>Frequently Asked Questions</h2>
      <p>Answers to common questions about frontend development</p>
    </div>

    <div class="accordion">
      <div class="accordion-item active">
        <div class="accordion-header" onclick="toggleAccordion(this)">
          <span>What is the difference between Flexbox and CSS Grid?</span>
          <span class="chevron">▼</span>
        </div>
        <div class="accordion-body">
          Flexbox is primarily 1-dimensional (arranging items in a row or column), while CSS Grid is 2-dimensional (handling both rows and columns simultaneously).
        </div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)">
          <span>How does the Virtual DOM enhance React performance?</span>
          <span class="chevron">▼</span>
        </div>
        <div class="accordion-body">
          The Virtual DOM minimizes direct manipulations of the actual DOM by computing a diff and batch-updating only the nodes that changed.
        </div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)">
          <span>Why is semantic HTML important for modern web apps?</span>
          <span class="chevron">▼</span>
        </div>
        <div class="accordion-body">
          Semantic elements (header, nav, main, article, footer) improve screen reader accessibility, browser indexing, SEO, and maintainability.
        </div>
      </div>
    </div>
  </div>

  <script>
    function toggleAccordion(header) {
      const item = header.parentElement;
      item.classList.toggle('active');
    }
  </script>
</body>
</html>`,
  },

  {
    id: "bistro-menu",
    name: "Artisan Bistro Menu with Category Filter",
    category: "Restaurant",
    difficulty: "Moderate",
    description:
      "Craft a rustic restaurant menu with category filter tabs (All, Coffee, Bakery, Brunch), price tags, and dietary badges.",
    colors: {
      primary: "#d97706",
      secondary: "#78350f",
      background: "#fffbeb",
      card: "#ffffff",
      text: "#451a03",
    },
    requirements: [
      "Warm café header with opening hours and brand tagline",
      "Interactive category tabs (All, Coffee, Pastries, Brunch)",
      "Menu cards with item name, description, price, and dietary tags (Vegan / GF)",
      "JavaScript filter behavior showing only matching category items on click",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Café Menu with Filter</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, serif;
      background: #fffbeb;
      color: #451a03;
      padding: 30px 20px;
    }
    
    /* 
      TODO: Style menu header, filter tab pills, and menu item cards
    */
    .menu-container {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build café menu with filter tabs and item cards
  -->
  <div class="menu-container">
    <p style="color: #92400e;">
      &larr; Build the Bistro Menu with Category Filters!
    </p>
  </div>

  <script>
    // TODO: Write JS filter logic for menu categories
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roast & Rustic Bistro</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, serif;
      background: #fffbeb;
      color: #451a03;
      padding: 40px 20px;
    }
    .menu-container { max-width: 760px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 30px; }
    h1 { font-size: 2.6rem; font-style: italic; color: #78350f; margin-bottom: 6px; }
    .tagline { color: #b45309; font-family: sans-serif; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
    
    .category-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 30px;
      font-family: sans-serif;
    }
    .tab-btn {
      background: #ffffff;
      border: 1px solid #fde68a;
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #78350f;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab-btn.active {
      background: #d97706;
      color: #ffffff;
      border-color: #d97706;
    }
    
    .menu-grid { display: grid; gap: 16px; }
    .item-card {
      background: #ffffff;
      padding: 18px 22px;
      border-radius: 12px;
      border: 1px solid #fde68a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.2s;
    }
    .item-card:hover { transform: translateY(-2px); }
    .item-info h3 { font-size: 1.15rem; color: #78350f; margin-bottom: 4px; }
    .item-info p { font-family: sans-serif; font-size: 0.88rem; color: #92400e; }
    .item-badge {
      display: inline-block;
      font-family: sans-serif;
      font-size: 0.72rem;
      font-weight: bold;
      background: #fef3c7;
      color: #92400e;
      padding: 2px 8px;
      border-radius: 4px;
      margin-top: 6px;
    }
    .item-price { font-size: 1.3rem; font-weight: bold; color: #d97706; }
  </style>
</head>
<body>
  <div class="menu-container">
    <header>
      <div class="tagline">Crafted Daily in Seattle</div>
      <h1>Roast & Rustic</h1>
      <p style="font-family: sans-serif; margin-top: 6px; color: #92400e; font-size: 0.9rem;">Open Daily: 7:00 AM &ndash; 6:00 PM</p>
    </header>

    <div class="category-tabs">
      <button class="tab-btn active" onclick="filterCategory('all')">All Items</button>
      <button class="tab-btn" onclick="filterCategory('coffee')">Espresso & Brews</button>
      <button class="tab-btn" onclick="filterCategory('bakery')">Artisanal Bakery</button>
    </div>

    <div class="menu-grid" id="menuGrid">
      <div class="item-card" data-cat="coffee">
        <div class="item-info">
          <h3>Honey Lavender Cortado</h3>
          <p>Double espresso with organic steamed oat milk and lavender blossom honey.</p>
          <span class="item-badge">Organic</span>
        </div>
        <div class="item-price">$5.50</div>
      </div>

      <div class="item-card" data-cat="bakery">
        <div class="item-info">
          <h3>Almond Cardamom Croissant</h3>
          <p>Twice-baked French butter pastry stuffed with toasted almond cream.</p>
          <span class="item-badge">Fresh Baked</span>
        </div>
        <div class="item-price">$4.75</div>
      </div>

      <div class="item-card" data-cat="coffee">
        <div class="item-info">
          <h3>Cold Brew Float</h3>
          <p>24-hour slow steep Ethiopian roast topped with vanilla bean gelato.</p>
          <span class="item-badge">Signature</span>
        </div>
        <div class="item-price">$6.25</div>
      </div>
    </div>
  </div>

  <script>
    function filterCategory(cat) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');

      document.querySelectorAll('.item-card').forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>`,
  },

  // ==========================================
  // ADVANCED LEVEL TEMPLATES (Advanced)
  // ==========================================
  {
    id: "crypto-dashboard",
    name: "FinPulse - Financial & Crypto Metrics Dashboard",
    category: "Dashboard",
    difficulty: "Advanced",
    description:
      "A high-tech analytics dashboard with overview stat cards, gain/loss indicators, interactive time-range filter, and a transaction ledger table.",
    colors: {
      primary: "#8b5cf6",
      secondary: "#10b981",
      background: "#090d16",
      card: "#131b2e",
      text: "#f8fafc",
    },
    requirements: [
      "Dark futuristic cyberpunk theme with deep navy/black tones and glowing accents",
      "Overview statistics cards with total balance, 24h net profit, and yield rate",
      "Interactive time range filter tabs (24H, 7D, 30D, 1Y) with active states",
      "Responsive transaction ledger table with status badges (Completed / Pending)",
      "Action buttons (Deposit, Transfer) with subtle hover glow effects",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: FinPulse Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 30px;
    }
    
    /* 
      TODO: Build the advanced dashboard layout
      1. Top header with title and action buttons
      2. 3-column stats grid (.stats-row)
      3. Filterable transaction table (.table-container)
    */
    .dashboard-container {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build Dashboard Markup
  -->
  <div class="dashboard-container">
    <p style="color: #64748b;">
      &larr; Build the Financial Metrics Dashboard according to specifications!
    </p>
  </div>

  <script>
    // TODO: Write JS for filter tabs or deposit interactions
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FinPulse Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 30px 20px;
    }
    .container { max-width: 1000px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
    .title h1 { font-size: 1.8rem; font-weight: 800; color: #fff; }
    .title p { color: #64748b; font-size: 0.9rem; }
    
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: #131b2e;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 22px;
      transition: transform 0.2s;
    }
    .stat-card:hover { transform: translateY(-3px); }
    .stat-label { color: #94a3b8; font-size: 0.85rem; margin-bottom: 6px; }
    .stat-val { font-size: 1.8rem; font-weight: 800; }
    .stat-change { font-size: 0.85rem; color: #10b981; font-weight: 600; margin-top: 4px; }
    
    .table-container {
      background: #131b2e;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 24px;
    }
    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
    .table-header h3 { font-size: 1.1rem; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { color: #64748b; font-size: 0.85rem; padding: 12px 10px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    td { padding: 14px 10px; font-size: 0.92rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .badge { padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .badge-success { background: rgba(16,185,129,0.15); color: #10b981; }
    .btn-deposit {
      background: #8b5cf6;
      color: #fff;
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-deposit:hover { background: #7c3aed; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="title">
        <h1>FinPulse Overview</h1>
        <p>Real-time crypto telemetry & portfolio transactions</p>
      </div>
      <button class="btn-deposit">+ Deposit Funds</button>
    </header>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Total Portfolio Value</div>
        <div class="stat-val">$48,250.80</div>
        <div class="stat-change">+8.4% this month</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">24h Net Profit</div>
        <div class="stat-val">+$1,420.50</div>
        <div class="stat-change">+3.1% today</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Staking APY</div>
        <div class="stat-val">12.8%</div>
        <div class="stat-change" style="color: #8b5cf6;">Auto-compounding</div>
      </div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h3>Recent Transactions</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitcoin (BTC)</td>
            <td>Buy</td>
            <td>+0.045 BTC</td>
            <td><span class="badge badge-success">Completed</span></td>
          </tr>
          <tr>
            <td>Ethereum (ETH)</td>
            <td>Staking Reward</td>
            <td>+0.12 ETH</td>
            <td><span class="badge badge-success">Completed</span></td>
          </tr>
          <tr>
            <td>Solana (SOL)</td>
            <td>Transfer</td>
            <td>-5.20 SOL</td>
            <td><span class="badge badge-success">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`,
  },

  {
    id: "checkout-wizard",
    name: "Multi-Step Checkout & Registration Wizard",
    category: "Application Flow",
    difficulty: "Advanced",
    description:
      "Build a step-by-step wizard (Account Details -> Shipping Address -> Payment Summary) with a visual progress bar and Next/Back navigation.",
    colors: {
      primary: "#2563eb",
      success: "#10b981",
      background: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
    },
    requirements: [
      "Visual 3-step progress bar showing completed, active, and upcoming steps",
      "Step 1: Account Info (Name, Email, Password)",
      "Step 2: Shipping Details (Address, City, Postal Code)",
      "Step 3: Review & Payment Confirmation",
      "Dynamic Next / Back buttons that navigate between steps and validate input before proceeding",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Multi-Step Wizard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    /* 
      TODO: Build Multi-step Wizard
      1. Progress bar with step numbers
      2. Step content panels (show/hide via JS)
      3. Next / Back navigation buttons
    */
    .wizard-card {
      /* Add wizard container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build Wizard Markup
  -->
  <div class="wizard-card">
    <p style="color: #64748b;">
      &larr; Build the 3-Step Checkout Wizard according to requirements!
    </p>
  </div>

  <script>
    // TODO: Write JS state machine for active step navigation
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Step Checkout Wizard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .wizard-card {
      background: #ffffff;
      width: 100%;
      max-width: 520px;
      padding: 36px 32px;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.08);
    }
    
    .steps-indicator {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      position: relative;
    }
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      z-index: 1;
    }
    .step-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e2e8f0;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      transition: all 0.3s;
    }
    .step-item.active .step-circle { background: #2563eb; color: #fff; }
    .step-item.done .step-circle { background: #10b981; color: #fff; }
    .step-label { font-size: 0.78rem; font-weight: 600; color: #64748b; }
    .step-item.active .step-label { color: #2563eb; }
    
    .step-panel { display: none; }
    .step-panel.active { display: block; }
    
    .form-group { margin-bottom: 16px; }
    label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: #334155; }
    input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.92rem;
      outline: none;
    }
    input:focus { border-color: #2563eb; }
    
    .nav-btns { display: flex; justify-content: space-between; margin-top: 28px; }
    .btn {
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .btn-prev { background: #f1f5f9; color: #475569; }
    .btn-next { background: #2563eb; color: #fff; }
  </style>
</head>
<body>
  <div class="wizard-card">
    <div class="steps-indicator">
      <div class="step-item active" id="stepInd1">
        <div class="step-circle">1</div>
        <span class="step-label">Account</span>
      </div>
      <div class="step-item" id="stepInd2">
        <div class="step-circle">2</div>
        <span class="step-label">Shipping</span>
      </div>
      <div class="step-item" id="stepInd3">
        <div class="step-circle">3</div>
        <span class="step-label">Summary</span>
      </div>
    </div>

    <!-- Step 1 -->
    <div class="step-panel active" id="panel1">
      <h3 style="margin-bottom: 16px;">Account Details</h3>
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="Sarah Connor" />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="sarah@example.com" />
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-panel" id="panel2">
      <h3 style="margin-bottom: 16px;">Shipping Address</h3>
      <div class="form-group">
        <label>Street Address</label>
        <input type="text" placeholder="104 Elm Street" />
      </div>
      <div class="form-group">
        <label>City & Zip</label>
        <input type="text" placeholder="Seattle, WA 98101" />
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-panel" id="panel3">
      <h3 style="margin-bottom: 16px;">Review & Complete</h3>
      <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">
        Everything looks great! Click the button below to confirm your registration and order.
      </p>
    </div>

    <div class="nav-btns">
      <button class="btn btn-prev" id="prevBtn" onclick="changeStep(-1)" style="visibility: hidden;">Back</button>
      <button class="btn btn-next" id="nextBtn" onclick="changeStep(1)">Next &rarr;</button>
    </div>
  </div>

  <script>
    let currentStep = 1;
    function changeStep(delta) {
      currentStep = Math.max(1, Math.min(3, currentStep + delta));
      
      // Update panels
      for (let i = 1; i <= 3; i++) {
        document.getElementById('panel' + i).classList.toggle('active', i === currentStep);
        const ind = document.getElementById('stepInd' + i);
        ind.classList.toggle('active', i === currentStep);
        ind.classList.toggle('done', i < currentStep);
      }

      document.getElementById('prevBtn').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
      document.getElementById('nextBtn').textContent = currentStep === 3 ? 'Confirm Order' : 'Next →';
      if (currentStep === 3 && delta === 1) {
        // completed
      }
    }
  </script>
</body>
</html>`,
  },

  {
    id: "kanban-board",
    name: "SprintTrack - Agile Kanban Task Board",
    category: "Productivity",
    difficulty: "Advanced",
    description:
      "Construct a multi-column Kanban board (To Do, In Progress, Done) with priority tags, task cards, and quick task creation.",
    colors: {
      primary: "#6366f1",
      success: "#10b981",
      background: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
    },
    requirements: [
      "3 responsive status columns: 'To Do', 'In Progress', and 'Completed'",
      "Task cards displaying task title, category pill, and priority badge (High / Medium / Low)",
      "Card count badge on each column header (e.g. '3 cards')",
      "Quick Add input inside columns to append new task cards dynamically",
      "Subtle hover elevation and dark modern dashboard styling",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: Kanban Board</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 30px 20px;
    }
    
    /* 
      TODO: Build Kanban Board
      1. Board container with 3 columns (flexbox or CSS Grid)
      2. Column headers with badges
      3. Task cards with priority pills
      4. Add task input row
    */
    .board-container {
      /* Add container styles */
    }
  </style>
</head>
<body>
  <!-- 
    TODO: Build Kanban markup
  -->
  <div class="board-container">
    <p style="color: #94a3b8;">
      &larr; Build the SprintTrack Kanban Board according to specifications!
    </p>
  </div>

  <script>
    // TODO: Write JS to add cards to columns
  </script>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SprintTrack Kanban Board</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 30px 20px;
      min-height: 100vh;
    }
    .header { max-width: 1100px; margin: 0 auto 24px; }
    .header h1 { font-size: 1.8rem; font-weight: 800; }
    .header p { color: #64748b; font-size: 0.9rem; }
    
    .board {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .column {
      background: #1e293b;
      border-radius: 14px;
      padding: 20px;
      border: 1px solid rgba(255,255,255,0.06);
      display: flex;
      flex-direction: column;
    }
    .col-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .col-title { font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 8px; }
    .col-count { background: #334155; padding: 2px 8px; border-radius: 999px; font-size: 0.78rem; font-weight: 600; }
    
    .card-list { display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .kanban-card {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 16px;
      border-radius: 10px;
      transition: transform 0.2s;
    }
    .kanban-card:hover { transform: translateY(-2px); border-color: #6366f1; }
    .card-title { font-size: 0.92rem; font-weight: 600; margin-bottom: 10px; }
    .card-meta { display: flex; justify-content: space-between; align-items: center; }
    .badge-priority {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .priority-high { background: rgba(239,68,68,0.2); color: #f87171; }
    .priority-med { background: rgba(245,158,11,0.2); color: #fbbf24; }
    .priority-low { background: rgba(16,185,129,0.2); color: #34d399; }
    .assignee { font-size: 0.75rem; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="header">
    <h1>SprintTrack Kanban</h1>
    <p>Agile task pipeline and deliverables overview</p>
  </div>

  <div class="board">
    <!-- To Do -->
    <div class="column">
      <div class="col-header">
        <span class="col-title">📋 To Do</span>
        <span class="col-count">2</span>
      </div>
      <div class="card-list">
        <div class="kanban-card">
          <div class="card-title">Setup OAuth Google Authentication</div>
          <div class="card-meta">
            <span class="badge-priority priority-high">High</span>
            <span class="assignee">Alex R.</span>
          </div>
        </div>
        <div class="kanban-card">
          <div class="card-title">Optimize Webpack Bundle Sizes</div>
          <div class="card-meta">
            <span class="badge-priority priority-med">Medium</span>
            <span class="assignee">Jordan K.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- In Progress -->
    <div class="column">
      <div class="col-header">
        <span class="col-title">⚡ In Progress</span>
        <span class="col-count">1</span>
      </div>
      <div class="card-list">
        <div class="kanban-card">
          <div class="card-title">Implement Frontend Practice Sandboxes</div>
          <div class="card-meta">
            <span class="badge-priority priority-high">High</span>
            <span class="assignee">Lavanya</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Done -->
    <div class="column">
      <div class="col-header">
        <span class="col-title">✅ Completed</span>
        <span class="col-count">1</span>
      </div>
      <div class="card-list">
        <div class="kanban-card">
          <div class="card-title">Responsive Navbar & Theme Mode</div>
          <div class="card-meta">
            <span class="badge-priority priority-low">Low</span>
            <span class="assignee">Dev Team</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
  },

  {
    id: "saas-landing",
    name: "ApexCloud - Modern SaaS Landing Page",
    category: "Landing Page",
    difficulty: "Advanced",
    description:
      "Build a high-converting cloud SaaS landing page with sticky navbar, gradient hero banner, 3-column feature grid with hover micro-interactions, and responsive layout.",
    colors: {
      primary: "#6366f1",
      secondary: "#ec4899",
      background: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
    },
    requirements: [
      "Responsive sticky navbar with logo, navigation links, and CTA",
      "Engaging hero section with gradient text title and dual action buttons",
      "3-column feature grid with hover lift effects and icons",
      "Interactive pricing or feature callout section",
      "Clean footer with copyright and social links",
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Challenge: SaaS Landing Page</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
    }
    
    /* 
      TODO: Build the SaaS Landing Page
      1. Navbar with logo and CTA
      2. Hero section with glowing gradient headline
      3. 3-column feature grid (.features)
      4. Footer
    */
    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <p style="padding: 40px 0; color: #94a3b8; text-align: center;">
      &larr; Build the SaaS Landing Page from scratch according to the checklist!
    </p>
  </div>
</body>
</html>`,
    targetHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ApexCloud SaaS</title>
  <style>
    :root {
      --primary: #6366f1;
      --secondary: #ec4899;
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
    
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .logo { font-size: 1.4rem; font-weight: bold; color: #fff; }
    .logo span { color: var(--primary); }
    .nav-links { display: flex; gap: 20px; list-style: none; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.92rem; transition: 0.2s; }
    .nav-links a:hover { color: var(--text); }
    .btn {
      background: var(--primary);
      color: #fff;
      padding: 10px 22px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: 0.2s;
    }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }

    .hero {
      text-align: center;
      padding: 70px 20px 50px;
    }
    .hero h1 {
      font-size: 2.8rem;
      margin-bottom: 18px;
      background: linear-gradient(135deg, #fff 0%, var(--primary) 50%, var(--secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 30px;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin: 40px 0;
    }
    .card {
      background: var(--card-bg);
      padding: 28px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
    }
    .card h3 { margin-bottom: 10px; color: #fff; font-size: 1.15rem; }
    .card p { color: var(--text-muted); font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="container">
    <nav>
      <div class="logo">Apex<span>Cloud</span></div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#docs">Docs</a></li>
      </ul>
      <button class="btn">Get Started</button>
    </nav>

    <section class="hero">
      <h1>Deploy in Seconds, Scale to Billions</h1>
      <p>The developer-first cloud platform engineered for blistering speed, real-time observability, and effortless global deployments.</p>
      <button class="btn" style="padding: 13px 30px; font-size: 1rem;">Start Free Trial &rarr;</button>
    </section>

    <section class="features" id="features">
      <div class="card">
        <h3>⚡ Blazing Fast Edge Network</h3>
        <p>Distribute compute tasks in under 15ms across 300+ global edge locations with zero cold starts.</p>
      </div>
      <div class="card">
        <h3>🛡️ Enterprise Security</h3>
        <p>Automated SSL certification, DDoS mitigation, and end-to-end payload encryption by default.</p>
      </div>
      <div class="card">
        <h3>📊 Real-Time Analytics</h3>
        <p>Monitor requests, latency, errors, and cache hit ratios with sub-second accuracy dashboards.</p>
      </div>
    </section>
  </div>
</body>
</html>`,
  },
];

// Helper functions
export function getAllTemplates() {
  return TEMPLATE_PRESETS;
}

export function getTemplatesByLevel(level) {
  if (!level || level === "All") return TEMPLATE_PRESETS;
  return TEMPLATE_PRESETS.filter((t) => t.difficulty.toLowerCase() === level.toLowerCase());
}

export function getRandomTemplate(level = null, currentId = null) {
  let pool = TEMPLATE_PRESETS;
  if (level && level !== "All") {
    pool = pool.filter((t) => t.difficulty.toLowerCase() === level.toLowerCase());
  }
  const filtered = pool.filter((t) => t.id !== currentId);
  const candidatePool = filtered.length > 0 ? filtered : pool;
  const randomIndex = Math.floor(Math.random() * candidatePool.length);
  return candidatePool[randomIndex] || TEMPLATE_PRESETS[0];
}

export function getTemplateById(id) {
  return TEMPLATE_PRESETS.find((t) => t.id === id) || TEMPLATE_PRESETS[0];
}

// FAQ content (from the client's Word files).
// servicesFaq   = FAQ at the bottom of the main /services page
// serviceFaqs   = one FAQ per inner service page, keyed by the service slug in data.js
//                 (web, app, marketing, branding, ai, hosting)

export const servicesFaq = {
  eyebrow: "Got Questions?",
  heading: "Everything You Need to Know About Our Services",
  items: [
    {
      q: "What services does Envol Solutions offer?",
      a: "We provide a range of digital solutions, including web design and development, mobile app development, digital marketing and SEO, branding and graphic design, AI automation and hosting services. Our goal is to help businesses build, improve and grow their digital presence.",
    },
    {
      q: "How do I know which service is right for my business?",
      a: "It depends on your business goals and current requirements. Whether you need a new website, a mobile application, better online visibility, a stronger brand identity or automated business processes, our team can help you identify the right solution.",
    },
    {
      q: "Can I combine multiple services into one project?",
      a: "Absolutely. You can combine services such as website development, branding, digital marketing and hosting into a coordinated project. We can also discuss customised solutions based on your requirements.",
    },
    {
      q: "Do you offer customised packages?",
      a: "Yes. Our packages provide a starting point, but we understand that every business has different needs. We can prepare a customised proposal based on your project scope, required features, budget and objectives.",
    },
    {
      q: "How much do your services cost?",
      a: "Our pricing depends on the type of service, project complexity and required deliverables. We offer predefined packages with transparent pricing, as well as custom quotations for projects with specific requirements.",
    },
    {
      q: "How long does it take to complete a project?",
      a: "Project timelines vary depending on the service and scope of work. Smaller projects may take a few business days, while larger websites, applications and automation systems may require several weeks or longer. We provide an estimated timeline before starting.",
    },
    {
      q: "Do you provide support after project completion?",
      a: "Yes. We offer ongoing support and maintenance options depending on the service you choose. This may include website maintenance, technical assistance, hosting support, marketing optimisation and updates to developed solutions.",
    },
    {
      q: "How can I get started with Envol Solutions?",
      a: "Getting started is simple. Explore our services, select the solution that matches your needs and contact our team. We'll discuss your requirements, understand your goals and provide a suitable proposal or quotation.",
    },
  ],
  closing: "Still have questions or a specific project in mind? Let's discuss how we can help your business move forward.",
  button: { label: "Talk to Our Team", to: "/contact" },
};

export const serviceFaqs = {
  /* ---------- Web Design & Development ---------- */
  web: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About Web Development",
    items: [
      {
        q: "Will my website be custom-designed or built using a template?",
        a: "We create websites based on your brand identity, business goals and requirements. Depending on your project, we can develop custom designs or use suitable frameworks and templates to deliver a professional result efficiently.",
      },
      {
        q: "How many pages can you build for my website?",
        a: "The number of pages depends on your selected package. Our packages include options for single landing pages, websites with up to five pages and larger business websites with up to ten pages. Additional pages can be included through a custom quotation.",
      },
      {
        q: "Do you provide domain registration and website hosting?",
        a: "We can assist with domain registration, hosting setup and website deployment. You can use your existing domain and hosting provider or discuss suitable hosting options with our team.",
      },
      {
        q: "Can you integrate payment gateways and third-party tools?",
        a: "Yes. We can integrate supported payment gateways, contact forms, booking systems, CRM platforms, analytics tools and other third-party services based on your website's requirements and available integrations.",
      },
      {
        q: "Will my website be optimised for Google?",
        a: "We follow SEO-friendly development practices, including proper page structure, metadata, responsive layouts and performance optimisation. Our packages also include different levels of SEO setup. Higher search rankings require ongoing optimisation and are not guaranteed.",
      },
      {
        q: "Can you redesign or improve my existing website?",
        a: "Absolutely. We can redesign outdated websites, improve their visual appearance, enhance usability, optimise performance and update their functionality to better support your business goals.",
      },
      {
        q: "What do you need from me before starting the project?",
        a: "We'll generally need your business information, logo, brand assets, website content, preferred design references and an outline of your requirements. If you don't have everything ready, we can guide you through the content and planning process.",
      },
      {
        q: "What happens after my website is launched?",
        a: "Once your website is completed and approved, we'll assist with the agreed launch and handover process. You can also arrange ongoing maintenance, security updates, backups and technical support through our available support services.",
      },
    ],
    closing: "Have a specific website requirement? Let's discuss your ideas and find the right solution for your business.",
    button: { label: "Discuss Your Website Project", to: "/contact" },
  },

  /* ---------- Mobile App Development ---------- */
  app: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About Mobile App Development",
    items: [
      {
        q: "How much does it cost to develop a mobile application?",
        a: "The cost depends on the app's features, complexity, design requirements, integrations and supported platforms. We offer solutions for different budgets and provide customised quotations based on your project requirements.",
      },
      {
        q: "Can you develop apps for both iOS and Android?",
        a: "Yes. We develop applications for Apple's iOS and Google's Android platforms. Depending on your requirements, we can build separate native applications or use cross-platform technologies such as Flutter and React Native.",
      },
      {
        q: "How long does it take to develop a mobile app?",
        a: "Development timelines depend on the application's functionality, design and technical requirements. A simple application may take several weeks, while more complex applications can require several months. We establish an estimated timeline before development begins.",
      },
      {
        q: "Can you develop an app based on my business idea?",
        a: "Absolutely. You can bring us your initial idea, business concept or detailed requirements. We'll help you plan the features, user experience and technical approach needed to turn your idea into a functional mobile application.",
      },
      {
        q: "Will my application be published on the App Store and Google Play?",
        a: "Yes. We can assist with preparing your application for submission to Apple's App Store and Google Play, including the required assets and submission process. Store approval remains subject to each platform's review policies.",
      },
      {
        q: "Can you integrate payment gateways and third-party APIs?",
        a: "Yes. We can integrate supported payment gateways, maps, authentication systems, CRM platforms, notifications and other third-party APIs according to your application's requirements and provider availability.",
      },
      {
        q: "Will I own my mobile application and its source code?",
        a: "Yes. Once the agreed payments have been completed, ownership of the custom deliverables and source code will transfer according to your project agreement. Third-party libraries, tools and licensed components remain subject to their respective licensing terms.",
      },
      {
        q: "Do you provide updates and maintenance after launch?",
        a: "Yes. We offer ongoing maintenance and support options that may include bug fixes, compatibility updates, performance improvements, security updates and new feature development.",
      },
    ],
    closing: "Have an app idea you'd like to bring to life? Let's discuss your requirements and explore the right development approach.",
    button: { label: "Discuss Your App Idea", to: "/contact" },
  },

  /* ---------- Digital Marketing & SEO ---------- */
  marketing: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About Digital Marketing & SEO",
    items: [
      {
        q: "How long does SEO take to show results?",
        a: "SEO is a long-term strategy, and results depend on your website's current condition, competition, industry and target keywords. Some improvements may appear within a few months, while achieving stronger organic visibility generally requires consistent optimisation over time.",
      },
      {
        q: "What's the difference between SEO and paid advertising?",
        a: "SEO focuses on improving your website's visibility in organic search results, while paid advertising allows you to reach targeted audiences through sponsored placements. Both approaches can work together to strengthen your online presence and attract potential customers.",
      },
      {
        q: "Do I need to pay separately for Google Ads?",
        a: "Yes. Our advertising management fees and your advertising budget are separate unless specifically stated in your agreement. You control the advertising budget, while our team helps plan, manage and optimise your campaigns.",
      },
      {
        q: "Which social media platforms can you manage?",
        a: "We can help manage platforms such as Facebook, Instagram, LinkedIn and other relevant social networks depending on your target audience and business objectives. The platforms included will be confirmed in your selected package or project proposal.",
      },
      {
        q: "Can you help my business generate more leads and sales?",
        a: "Our marketing strategies are designed to improve visibility, attract relevant audiences and create opportunities for conversions. We focus on measurable performance indicators, but actual leads and sales depend on factors such as your market, offer, competition and website experience. We do not guarantee specific sales results.",
      },
      {
        q: "Will I receive reports on my marketing performance?",
        a: "Yes. We provide performance reports according to your selected package. Depending on the services being delivered, reports may include website traffic, keyword performance, advertising expenditure, clicks, conversions, engagement and lead generation metrics.",
      },
      {
        q: "Do I need to sign a long-term marketing contract?",
        a: "Our engagement terms depend on the selected service and project agreement. We discuss the expected duration, deliverables, payment schedule and cancellation conditions before starting, so you understand your commitment.",
      },
      {
        q: "Can you create a customised marketing strategy for my business?",
        a: "Absolutely. We can develop a marketing strategy based on your industry, target audience, business objectives and available budget. You can choose individual services or combine SEO, paid advertising, social media and content marketing into a customised solution.",
      },
    ],
    closing: "Ready to attract the right audience and grow your business online? Let's discuss a marketing strategy built around your goals.",
    button: { label: "Get Your Marketing Quote", to: "/contact" },
  },

  /* ---------- Branding & Graphic Design ---------- */
  branding: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About Branding & Graphic Design",
    items: [
      {
        q: "What's included in a complete brand identity package?",
        a: "A complete brand identity can include logo design, colour palettes, typography, visual elements and brand guidelines. Depending on your selected package, we can also provide business stationery, social media designs and other branded materials.",
      },
      {
        q: "How long does it take to design a logo?",
        a: "Logo design timelines depend on the selected package, project complexity and feedback process. Initial concepts may be delivered within 24–48 hours for eligible packages, while more comprehensive branding projects require additional time.",
      },
      {
        q: "How many logo concepts and revisions will I receive?",
        a: "The number of initial logo concepts and revisions depends on your selected package. We discuss the design direction with you before starting to ensure the concepts align with your brand vision.",
      },
      {
        q: "Will I receive editable and high-resolution logo files?",
        a: "Yes. Depending on your package, we can provide professional formats such as AI, EPS, PSD, SVG, PNG and JPEG. These formats allow you to use your logo across websites, social media, printing and other marketing materials.",
      },
      {
        q: "Can you redesign my existing logo or refresh my brand identity?",
        a: "Absolutely. We can modernise your existing logo, refine your visual identity, update your colour palette and typography, and develop a more consistent brand presentation while retaining the elements your customers already recognise.",
      },
      {
        q: "Do you design business cards, brochures and other marketing materials?",
        a: "Yes. We design business cards, letterheads, envelopes, brochures, flyers, social media graphics and other branded materials. These can be developed to match your existing brand identity or created as part of a new branding project.",
      },
      {
        q: "Will I own my logo and branding designs after completion?",
        a: "Yes. Once all agreed project payments have been completed, ownership of the custom deliverables will transfer to you according to your project agreement. Third-party fonts, stock assets and licensed materials remain subject to their respective licensing conditions.",
      },
      {
        q: "Can you create a complete brand identity for a new business?",
        a: "Absolutely. We work with startups, entrepreneurs and established businesses to develop brand identities from the ground up. We'll help establish your visual direction through logo design, colours, typography and other branding elements that reflect your business personality.",
      },
    ],
    closing: "Ready to give your business a distinctive identity? Let's create a brand that makes a lasting impression.",
    button: { label: "Start Your Branding Project", to: "/contact" },
  },

  /* ---------- AI Automation ---------- */
  ai: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About AI Automation",
    items: [
      {
        q: "What types of business processes can you automate using AI?",
        a: "We can automate a wide range of repetitive business tasks, including customer enquiries, appointment scheduling, document processing, data entry, lead management, email responses and internal workflows. The right solution depends on your business operations and requirements.",
      },
      {
        q: "Can you develop a custom AI chatbot for my business?",
        a: "Absolutely. We develop AI-powered chatbots trained around your business information, services and customer requirements. They can answer frequently asked questions, assist visitors, collect enquiries and direct complex requests to your team.",
      },
      {
        q: "Can AI automation integrate with my existing business software?",
        a: "Yes. We can connect supported CRMs, websites, databases, communication platforms and other business applications using APIs and automation tools. Integration possibilities depend on the platforms involved and their available capabilities.",
      },
      {
        q: "Do I need technical knowledge to use AI automation?",
        a: "No. We design automation solutions with user-friendly interfaces and workflows so your team can operate them without advanced technical knowledge. We can also provide guidance and documentation to help you understand and manage the systems.",
      },
      {
        q: "How much does it cost to implement AI automation?",
        a: "The cost depends on workflow complexity, the number of integrations, AI model requirements and the level of custom development involved. We offer starting packages for simpler automation projects and customised quotations for more advanced solutions.",
      },
      {
        q: "Is AI automation accurate and reliable?",
        a: "AI automation can significantly reduce repetitive manual work, but AI-generated outputs may occasionally contain errors or require human review. We design workflows with appropriate validation, testing and human oversight to improve reliability and minimise operational risks.",
      },
      {
        q: "Is my business data secure when using AI automation?",
        a: "We consider data protection and access control when designing automation systems. Security measures depend on the platforms, integrations and infrastructure involved. We also help identify appropriate data-handling practices to protect sensitive business information.",
      },
      {
        q: "Do you provide ongoing maintenance and support for AI solutions?",
        a: "Yes. We offer ongoing support options that may include workflow monitoring, troubleshooting, integration updates, performance improvements and adjustments as your business requirements evolve.",
      },
    ],
    closing: "Ready to reduce manual work and make your business more efficient? Let's explore what AI automation can do for your operations.",
    button: { label: "Discuss Your AI Project", to: "/contact" },
  },

  /* ---------- Hosting ---------- */
  hosting: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions About Web Hosting",
    items: [
      {
        q: "What type of hosting is best for my website?",
        a: "It depends on your website's traffic, storage requirements and technical needs. Shared hosting is suitable for smaller websites, while cloud hosting and VPS solutions offer greater flexibility and resources for growing businesses. We can help you choose the right option.",
      },
      {
        q: "What's included in your hosting plans?",
        a: "Our hosting solutions can include website storage, SSL support, business email, backups, security configurations and technical assistance. The exact features, resource limits and support options depend on your selected hosting plan.",
      },
      {
        q: "Can you migrate my existing website to your hosting?",
        a: "Yes. We can assist with migrating your existing website, including its files, databases and relevant configurations. Migration requirements and any additional charges will be discussed before the transfer begins.",
      },
      {
        q: "Will my website remain online around the clock?",
        a: "We aim to provide reliable hosting infrastructure and minimise service interruptions. However, availability can be affected by maintenance, network issues and third-party infrastructure providers. Any specific uptime commitments will be defined in the applicable hosting agreement.",
      },
      {
        q: "Do your hosting plans include SSL certificates and website security?",
        a: "Our hosting solutions can include SSL certificate support and security configurations to help protect website connections and information. Additional security services may be available depending on your selected plan and requirements.",
      },
      {
        q: "Do you provide automatic website backups?",
        a: "Backup options depend on your hosting package. We can configure scheduled backups to help protect your website files and databases. Backup frequency, retention periods and restoration arrangements will be confirmed with your selected plan.",
      },
      {
        q: "Can I upgrade my hosting plan as my business grows?",
        a: "Absolutely. You can discuss upgrading to a higher hosting plan or moving to a more powerful infrastructure as your website traffic, storage requirements and resource usage increase. Upgrade availability depends on the hosting provider and selected environment.",
      },
      {
        q: "Do you provide technical support and hosting management?",
        a: "Yes. We offer hosting-related assistance, including configuration, troubleshooting, migration support and technical maintenance. The level of ongoing management and support depends on your selected hosting plan or service agreement.",
      },
    ],
    closing: "Looking for reliable hosting for your website? Let's find the right solution to keep your business connected and ready to grow.",
    button: { label: "Find Your Hosting Plan", to: "/contact" },
  },
};

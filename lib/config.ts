export const config = {
  name: "John Doe",
  title: "Full Stack Developer",
  email: "john.doe@example.com",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",

  about: {
    title: "About Me",
    description: "I'm a passionate full stack developer with 5+ years of experience building web applications. I love creating clean, efficient, and user-friendly solutions to complex problems.",
    image: "/images/profile.jpg"
  },

  skills: [
    {
      id: "react",
      name: "React",
      category: "Frontend",
      description: "Expert in building modern, responsive web applications using React and its ecosystem. Experienced with hooks, context, and state management libraries.",
      yearsOfExperience: 4,
      projects: ["E-commerce Platform", "Social Media Dashboard"]
    },
    {
      id: "nextjs",
      name: "Next.js",
      category: "Frontend",
      description: "Proficient in building SSR and SSG applications with Next.js. Deep understanding of App Router, API routes, and optimization techniques.",
      yearsOfExperience: 3,
      projects: ["Portfolio Site", "Blog Platform"]
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Language",
      description: "Strong typing advocate. Use TypeScript for all major projects to ensure code quality and developer experience.",
      yearsOfExperience: 3,
      projects: ["Multiple projects"]
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Backend",
      description: "Building scalable backend services with Node.js and Express. Experience with RESTful APIs and real-time applications.",
      yearsOfExperience: 4,
      projects: ["API Gateway", "Real-time Chat"]
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "Styling",
      description: "Utility-first CSS framework expert. Fast at prototyping and building responsive designs.",
      yearsOfExperience: 2,
      projects: ["Multiple projects"]
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Database",
      description: "Database design and optimization. Experience with complex queries, indexes, and performance tuning.",
      yearsOfExperience: 3,
      projects: ["E-commerce Platform", "Analytics Dashboard"]
    }
  ],

  experience: [
    {
      company: "Tech Corp",
      position: "Senior Full Stack Developer",
      period: "2022 - Present",
      description: "Leading development of customer-facing applications. Mentoring junior developers and establishing best practices.",
      achievements: [
        "Reduced page load times by 60%",
        "Led migration to Next.js 14",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      company: "StartUp Inc",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built core features for SaaS platform. Worked across the entire stack from database to UI.",
      achievements: [
        "Developed real-time collaboration features",
        "Optimized database queries reducing response time by 40%",
        "Implemented automated testing"
      ]
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      period: "2019 - 2020",
      description: "Created responsive websites and web applications for various clients.",
      achievements: [
        "Delivered 15+ client projects",
        "Improved mobile performance scores to 95+",
        "Established component library"
      ]
    }
  ],

  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Computer Science",
      period: "2015 - 2019",
      description: "Focused on software engineering and web technologies. Graduated with honors."
    },
    {
      institution: "Online Courses",
      degree: "Various Certifications",
      period: "2019 - Present",
      description: "Continuous learning through platforms like Udemy, Frontend Masters, and Coursera."
    }
  ],

  projects: [
    {
      id: "ecommerce",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      longDescription: "A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, and Stripe payment integration. Includes admin dashboard for inventory management and order tracking.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      image: "/images/projects/ecommerce.jpg",
      images: [
        "/images/projects/ecommerce-1.jpg",
        "/images/projects/ecommerce-2.jpg",
        "/images/projects/ecommerce-3.jpg"
      ],
      github: "https://github.com/johndoe/ecommerce",
      demo: "https://ecommerce-demo.com",
      featured: true
    },
    {
      id: "dashboard",
      title: "Analytics Dashboard",
      description: "Real-time data visualization dashboard",
      longDescription: "Interactive dashboard for visualizing complex data sets. Features real-time updates, customizable widgets, and export capabilities. Built with performance in mind to handle large datasets efficiently.",
      tags: ["React", "D3.js", "Node.js", "WebSocket"],
      image: "/images/projects/dashboard.jpg",
      images: [
        "/images/projects/dashboard-1.jpg",
        "/images/projects/dashboard-2.jpg"
      ],
      github: "https://github.com/johndoe/dashboard",
      demo: "https://dashboard-demo.com",
      featured: true
    },
    {
      id: "blog",
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support",
      longDescription: "A feature-rich blogging platform that supports markdown, code syntax highlighting, and SEO optimization. Includes author profiles, comments system, and social sharing features.",
      tags: ["Next.js", "MDX", "Tailwind"],
      image: "/images/projects/blog.jpg",
      images: [
        "/images/projects/blog-1.jpg"
      ],
      github: "https://github.com/johndoe/blog",
      demo: "https://blog-demo.com",
      featured: false
    },
    {
      id: "chat",
      title: "Real-time Chat App",
      description: "WebSocket-based chat application",
      longDescription: "Real-time chat application with features like private messaging, group chats, file sharing, and typing indicators. Built with scalability in mind using Redis for pub/sub.",
      tags: ["Node.js", "Socket.io", "React", "Redis"],
      image: "/images/projects/chat.jpg",
      images: [
        "/images/projects/chat-1.jpg",
        "/images/projects/chat-2.jpg"
      ],
      github: "https://github.com/johndoe/chat",
      demo: "https://chat-demo.com",
      featured: true
    }
  ],

  testimonials: [
    {
      name: "Sarah Johnson",
      position: "Product Manager at Tech Corp",
      company: "Tech Corp",
      rating: 5,
      text: "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
      avatar: "/images/avatars/sarah.jpg"
    },
    {
      name: "Michael Chen",
      position: "CTO at StartUp Inc",
      company: "StartUp Inc",
      rating: 5,
      text: "Working with John was a pleasure. He took ownership of complex features and delivered them on time. His code is clean and well-documented.",
      avatar: "/images/avatars/michael.jpg"
    },
    {
      name: "Emma Williams",
      position: "Lead Designer",
      company: "Digital Agency",
      rating: 4,
      text: "John brought our designs to life perfectly. Great communication and always open to feedback. Would definitely work with him again.",
      avatar: "/images/avatars/emma.jpg"
    },
    {
      name: "David Brown",
      position: "Engineering Manager",
      company: "Tech Solutions",
      rating: 5,
      text: "One of the best developers I've worked with. John's technical expertise and collaborative approach made our project a success.",
      avatar: "/images/avatars/david.jpg"
    }
  ]
};

"use client"

export interface Failure {
  id: number
  title: string
  description: string
  tags: string[]
  status: "Open" | "In Analysis" | "Resolved" | "Closed"
  priority: "Critical" | "High" | "Medium" | "Low"
  date: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  expectedBehavior?: string
  observedBehavior?: string
  stackTrace?: string
  context: "Development" | "Testing" | "Staging" | "Production"
  attachments?: Array<{ name: string; size: string }>
  solutionCount: number
  createdAt: Date
}

export interface Solution {
  id: number
  title: string
  description: string
  tags: string[]
  effectiveness: number
  relatedFailureId: number
  relatedFailure: string
  date: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  likes: number
  uses: number
  code?: string
  references?: Array<{ url: string; description: string }>
  createdAt: Date
}

// Mock Database - Falhas
export const failures: Failure[] = [
  {
    id: 1,
    title: "Login Authentication Error",
    description:
      "User authentication fails with JWT token validation causing login issues across the application. This error occurs intermittently and affects approximately 15% of login attempts during peak hours.",
    tags: ["React", "Authentication", "JWT", "Frontend"],
    status: "Open",
    priority: "High",
    date: "2024-01-15",
    author: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Developer",
    },
    expectedBehavior:
      "Users should be able to log in successfully with valid credentials and receive a JWT token for authenticated requests.",
    observedBehavior:
      "Login fails with 'Invalid token' error message even with correct credentials. The error appears to be related to token validation timing.",
    stackTrace: `Error: JWT token validation failed
    at validateToken (auth.js:45)
    at login (auth.js:23)
    at LoginComponent.handleSubmit (Login.jsx:67)
    at onClick (Login.jsx:89)`,
    context: "Production",
    attachments: [
      { name: "error-screenshot.png", size: "245 KB" },
      { name: "network-logs.txt", size: "12 KB" },
    ],
    solutionCount: 3,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Database Connection Timeout",
    description:
      "Connection pool exhaustion causing timeout errors in production environment during high traffic periods.",
    tags: ["PostgreSQL", "Database", "Performance", "Backend"],
    status: "In Analysis",
    priority: "Critical",
    date: "2024-02-01",
    author: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Database Administrator",
    },
    expectedBehavior:
      "Database connections should be established within 5 seconds and queries should execute normally.",
    observedBehavior: "Connection timeouts after 30 seconds, causing application crashes and user session losses.",
    stackTrace: `Error: Connection timeout
    at Pool.connect (pg-pool.js:156)
    at Database.query (database.js:23)
    at UserService.findById (user.service.js:45)`,
    context: "Production",
    solutionCount: 2,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 3,
    title: "API Response Delay",
    description:
      "Slow API responses affecting user experience and application performance, particularly in data-heavy endpoints.",
    tags: ["API", "Performance", "Node.js", "Backend"],
    status: "Open",
    priority: "Medium",
    date: "2024-02-10",
    author: {
      name: "Pedro Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
    },
    expectedBehavior: "API responses should return within 2 seconds for standard queries.",
    observedBehavior: "API responses taking 8-15 seconds, causing frontend timeouts and poor user experience.",
    context: "Production",
    solutionCount: 2,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: 4,
    title: "Memory Leak in React Component",
    description:
      "Memory consumption increases over time due to component lifecycle issues and improper cleanup of event listeners.",
    tags: ["React", "Memory", "Performance", "Frontend"],
    status: "Resolved",
    priority: "High",
    date: "2024-02-15",
    author: {
      name: "Ana Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
    },
    expectedBehavior: "Memory usage should remain stable during normal application usage.",
    observedBehavior: "Memory usage continuously increases, eventually causing browser crashes after extended use.",
    context: "Production",
    solutionCount: 4,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: 5,
    title: "Network Connection Issues",
    description: "Intermittent network failures causing data synchronization problems between client and server.",
    tags: ["Network", "Connectivity", "API", "Infrastructure"],
    status: "Open",
    priority: "Medium",
    date: "2024-02-20",
    author: {
      name: "Carlos Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "DevOps Engineer",
    },
    expectedBehavior: "Network requests should complete successfully with proper error handling for failures.",
    observedBehavior: "Random network failures causing data loss and synchronization issues.",
    context: "Production",
    solutionCount: 1,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: 6,
    title: "File Upload Failure",
    description: "Large file uploads failing due to server timeout configuration and insufficient error handling.",
    tags: ["Upload", "Server", "Configuration", "Backend"],
    status: "In Analysis",
    priority: "Low",
    date: "2024-02-25",
    author: {
      name: "Lucia Ferreira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer",
    },
    expectedBehavior: "Files up to 100MB should upload successfully with progress indication.",
    observedBehavior: "Files larger than 10MB fail to upload with generic error messages.",
    context: "Production",
    solutionCount: 1,
    createdAt: new Date("2024-02-25"),
  },
  {
    id: 7,
    title: "Session Management Bug",
    description: "User sessions expiring unexpectedly, forcing frequent re-authentication and disrupting workflow.",
    tags: ["Session", "Authentication", "Security", "Backend"],
    status: "Open",
    priority: "High",
    date: "2024-03-01",
    author: {
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Security Engineer",
    },
    expectedBehavior: "User sessions should remain active for the configured duration (8 hours).",
    observedBehavior: "Sessions expire randomly after 30-60 minutes of activity.",
    context: "Production",
    solutionCount: 0,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: 8,
    title: "CSS Layout Breaking on Mobile",
    description:
      "Responsive design breaking on specific mobile devices, causing UI elements to overlap and become unusable.",
    tags: ["CSS", "Mobile", "Responsive", "Frontend"],
    status: "Resolved",
    priority: "Medium",
    date: "2024-03-05",
    author: {
      name: "Fernanda Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UI/UX Developer",
    },
    expectedBehavior: "Layout should adapt properly to all screen sizes and orientations.",
    observedBehavior: "UI elements overlap and become unclickable on devices with specific screen resolutions.",
    context: "Production",
    solutionCount: 2,
    createdAt: new Date("2024-03-05"),
  },
]

// Mock Database - Soluções
export const solutions: Solution[] = [
  {
    id: 1,
    title: "JWT Token Refresh Implementation",
    description:
      "Complete solution for handling JWT token refresh in React applications with automatic retry logic and proper error handling.",
    tags: ["React", "Authentication", "JWT", "Frontend"],
    effectiveness: 4.8,
    relatedFailureId: 1,
    relatedFailure: "Login Authentication Error",
    date: "2024-01-20",
    author: {
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Developer",
    },
    likes: 24,
    uses: 45,
    code: `// JWT Token Refresh Implementation
const refreshToken = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    // Redirect to login
    window.location.href = '/login';
  }
};`,
    references: [
      { url: "https://jwt.io/introduction/", description: "JWT Introduction" },
      {
        url: "https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/",
        description: "Refresh Tokens Guide",
      },
    ],
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 2,
    title: "Database Connection Pool Optimization",
    description:
      "Optimized connection pooling configuration for high-load applications to prevent timeouts and improve performance.",
    tags: ["PostgreSQL", "Database", "Performance", "Backend"],
    effectiveness: 4.5,
    relatedFailureId: 2,
    relatedFailure: "Database Connection Timeout",
    date: "2024-02-05",
    author: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Database Administrator",
    },
    likes: 18,
    uses: 38,
    code: `// Database Connection Pool Configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});`,
    references: [{ url: "https://node-postgres.com/features/pooling", description: "Node.js PostgreSQL Pooling" }],
    createdAt: new Date("2024-02-05"),
  },
  {
    id: 3,
    title: "API Response Caching Strategy",
    description:
      "Implementation of Redis caching layer to improve API response times significantly and reduce database load.",
    tags: ["API", "Performance", "Redis", "Caching", "Backend"],
    effectiveness: 4.7,
    relatedFailureId: 3,
    relatedFailure: "API Response Delay",
    date: "2024-02-12",
    author: {
      name: "Pedro Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
    },
    likes: 31,
    uses: 52,
    code: `// Redis Caching Implementation
const redis = require('redis');
const client = redis.createClient();

const getCachedData = async (key) => {
  try {
    const cached = await client.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Cache error:', error);
    return null;
  }
};

const setCachedData = async (key, data, ttl = 3600) => {
  try {
    await client.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Cache set error:', error);
  }
};`,
    references: [{ url: "https://redis.io/docs/manual/patterns/", description: "Redis Patterns" }],
    createdAt: new Date("2024-02-12"),
  },
  {
    id: 4,
    title: "React Memory Leak Prevention",
    description:
      "Best practices and cleanup strategies to prevent memory leaks in React components with proper useEffect cleanup.",
    tags: ["React", "Memory", "Performance", "Frontend"],
    effectiveness: 4.6,
    relatedFailureId: 4,
    relatedFailure: "Memory Leak in React Component",
    date: "2024-02-18",
    author: {
      name: "Ana Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
    },
    likes: 27,
    uses: 41,
    code: `// Memory Leak Prevention in React
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };

  fetchData();

  // Cleanup function
  return () => {
    controller.abort();
  };
}, []);`,
    references: [
      { url: "https://react.dev/learn/synchronizing-with-effects", description: "React Effects Documentation" },
    ],
    createdAt: new Date("2024-02-18"),
  },
  {
    id: 5,
    title: "Network Retry Mechanism",
    description:
      "Robust retry mechanism with exponential backoff for handling network failures and improving reliability.",
    tags: ["Network", "Connectivity", "Retry", "Infrastructure"],
    effectiveness: 4.3,
    relatedFailureId: 5,
    relatedFailure: "Network Connection Issues",
    date: "2024-02-22",
    author: {
      name: "Carlos Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "DevOps Engineer",
    },
    likes: 15,
    uses: 28,
    code: `// Network Retry with Exponential Backoff
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};`,
    references: [
      {
        url: "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/",
        description: "Exponential Backoff Guide",
      },
    ],
    createdAt: new Date("2024-02-22"),
  },
  {
    id: 6,
    title: "File Upload Optimization",
    description: "Chunked file upload implementation with progress tracking and error recovery for large files.",
    tags: ["Upload", "File", "Optimization", "Backend"],
    effectiveness: 4.4,
    relatedFailureId: 6,
    relatedFailure: "File Upload Failure",
    date: "2024-02-28",
    author: {
      name: "Lucia Ferreira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer",
    },
    likes: 12,
    uses: 22,
    code: `// Chunked File Upload
const uploadFileInChunks = async (file, chunkSize = 1024 * 1024) => {
  const totalChunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', i.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('fileName', file.name);
    
    await fetch('/api/upload/chunk', {
      method: 'POST',
      body: formData
    });
  }
};`,
    references: [
      { url: "https://developer.mozilla.org/en-US/docs/Web/API/File/slice", description: "File.slice() Documentation" },
    ],
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 7,
    title: "Token Validation Timing Fix",
    description:
      "Fixes timing issues in JWT token validation by implementing proper async handling and token refresh logic.",
    tags: ["JWT", "Authentication", "Async", "Security"],
    effectiveness: 4.6,
    relatedFailureId: 1,
    relatedFailure: "Login Authentication Error",
    date: "2024-01-25",
    author: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Security Engineer",
    },
    likes: 18,
    uses: 33,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: 8,
    title: "Authentication State Management",
    description: "Improved authentication state management to prevent token validation conflicts using React Context.",
    tags: ["React", "State Management", "Authentication", "Context"],
    effectiveness: 4.4,
    relatedFailureId: 1,
    relatedFailure: "Login Authentication Error",
    date: "2024-02-01",
    author: {
      name: "Pedro Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Architect",
    },
    likes: 15,
    uses: 29,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 9,
    title: "Database Query Optimization",
    description:
      "Advanced query optimization techniques to reduce database load and improve connection pool efficiency.",
    tags: ["PostgreSQL", "Query", "Optimization", "Performance"],
    effectiveness: 4.3,
    relatedFailureId: 2,
    relatedFailure: "Database Connection Timeout",
    date: "2024-02-08",
    author: {
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Database Specialist",
    },
    likes: 21,
    uses: 35,
    createdAt: new Date("2024-02-08"),
  },
  {
    id: 10,
    title: "CSS Grid Mobile Fix",
    description:
      "Responsive CSS Grid implementation that works consistently across all mobile devices and screen sizes.",
    tags: ["CSS", "Grid", "Mobile", "Responsive"],
    effectiveness: 4.5,
    relatedFailureId: 8,
    relatedFailure: "CSS Layout Breaking on Mobile",
    date: "2024-03-07",
    author: {
      name: "Fernanda Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UI/UX Developer",
    },
    likes: 19,
    uses: 26,
    createdAt: new Date("2024-03-07"),
  },
]

// Utility functions for database operations
export const getFailureById = (id: number): Failure | undefined => {
  return failures.find((failure) => failure.id === id)
}

export const getSolutionById = (id: number): Solution | undefined => {
  return solutions.find((solution) => solution.id === id)
}

export const getSolutionsByFailureId = (failureId: number): Solution[] => {
  return solutions.filter((solution) => solution.relatedFailureId === failureId)
}

export const getFailuresByStatus = (status: string): Failure[] => {
  return failures.filter((failure) => failure.status === status)
}

export const getFailuresByPriority = (priority: string): Failure[] => {
  return failures.filter((failure) => failure.priority === priority)
}

export const getSolutionsByEffectiveness = (minEffectiveness: number): Solution[] => {
  return solutions.filter((solution) => solution.effectiveness >= minEffectiveness)
}

export const getTopSolutionsByUses = (limit = 10): Solution[] => {
  return [...solutions].sort((a, b) => b.uses - a.uses).slice(0, limit)
}

export const getRecentFailures = (limit = 10): Failure[] => {
  return [...failures].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}

export const searchFailures = (query: string, tags: string[] = []): Failure[] => {
  return failures.filter((failure) => {
    const matchesQuery =
      query === "" ||
      failure.title.toLowerCase().includes(query.toLowerCase()) ||
      failure.description.toLowerCase().includes(query.toLowerCase()) ||
      failure.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

    const matchesTags =
      tags.length === 0 ||
      tags.every((tag) => failure.tags.some((failureTag) => failureTag.toLowerCase().includes(tag.toLowerCase())))

    return matchesQuery && matchesTags
  })
}

export const searchSolutions = (query: string, tags: string[] = []): Solution[] => {
  return solutions.filter((solution) => {
    const matchesQuery =
      query === "" ||
      solution.title.toLowerCase().includes(query.toLowerCase()) ||
      solution.description.toLowerCase().includes(query.toLowerCase()) ||
      solution.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

    const matchesTags =
      tags.length === 0 ||
      tags.every((tag) => solution.tags.some((solutionTag) => solutionTag.toLowerCase().includes(tag.toLowerCase())))

    return matchesQuery && matchesTags
  })
}

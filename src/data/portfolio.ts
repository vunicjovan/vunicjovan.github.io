export const profile = {
  name: "Jovan Vunić",
  role: "Senior Full-Stack Engineer",
  location: "Vienna, Austria",
  qualification: "M.Sc. in Applied Computer Science and Informatics",
  email: "vunicjovan@gmail.com",
  github: "https://github.com/vunicjovan",
  linkedin: "https://www.linkedin.com/in/jovan-vuni%C4%87-m-sc-4851091a9/",
};

export const languages = [
  { name: "Serbian", level: "Native" },
  { name: "Bosnian, Croatian & Montenegrin", level: "Professional" },
  { name: "English", level: "Professional" },
  { name: "German", level: "Advanced" },
  { name: "Italian & Spanish", level: "Beginner" },
];

export const experience = [
  {
    company: "Adverity",
    role: "Senior Full-Stack Engineer",
    focus: "Back-end focused",
    start: "2025-11",
    startLabel: "November 2025",
    end: null,
    endLabel: "Present",
    location: "Vienna, Austria",
  },
  {
    company: "Allianz Technology",
    role: "Java Developer / Lead Python Developer",
    focus: null,
    start: "2022-08",
    startLabel: "August 2022",
    end: "2025-10",
    endLabel: "October 2025",
    location: "Vienna, Austria",
  },
  {
    company: "ALAS",
    role: "Software Engineer",
    focus: null,
    start: "2021-01",
    startLabel: "January 2021",
    end: "2022-06",
    endLabel: "June 2022",
    location: "Novi Sad, Serbia",
  },
  {
    company: "INVT",
    role: "Junior Software Engineer",
    focus: null,
    start: "2019-08",
    startLabel: "August 2019",
    end: "2020-12",
    endLabel: "December 2020",
    location: "Novi Sad, Serbia",
  },
];

type Project = {
  id: string;
  title: string;
  category: string;
  status: "In progress" | "Completed";
  description: string;
  detail: string;
  tags: string[];
  github: string;
};

export const projects: Project[] = [
  {
    id: "bimmer",
    title: "Bimmer",
    category: "Full-stack platform",
    status: "In progress",
    description: "A home for the next ride.",
    detail: "A monolithic vehicle rental and sale advertisement platform, built with Django and React, with room to expand into other categories.",
    tags: ["Python", "Django", "DRF", "React", "TypeScript", "PostgreSQL", "Docker", "Just"],
    github: "https://github.com/vunicjovan/bimmer",
  },
  {
    id: "kombat",
    title: "Kombat",
    category: "Published Python tool",
    status: "Completed",
    description: "Make sense of your filesystem.",
    detail: "A Python library for crawling filesystem hierarchies: aggregate sizes, timestamps, permissions, MIME types and SHA256 hashes for duplicate detection. Export to interactive HTML, JSON or CSV.",
    tags: ["Python", "UV"],
    github: "https://github.com/vunicjovan/kombat",
  },
  {
    id: "rose-by-any-name",
    title: "A Rose By Any Name",
    category: "Personal reading archive",
    status: "In progress",
    description: "Books read. Stories remembered.",
    detail: "A hobby project collecting an overview of the books I've read over the years. A small intersection of software and a life beyond the screen.",
    tags: ["Python", "Rio", "TinyDB", "UV"],
    github: "https://github.com/vunicjovan/rose-by-any-name",
  },
  {
    id: "xws",
    title: "XWS",
    category: "University team project",
    status: "Completed",
    description: "One rental platform. Many services.",
    detail: "A team-built rent-a-car application with 10+ microservice applications and a standalone client. Explores architectural and communication patterns, including RabbitMQ messaging and SOAP exchanges.",
    tags: ["Java", "Spring Boot", "Vue.js", "Docker", "Maven", "PostgreSQL", "RabbitMQ"],
    github: "https://github.com/vunicjovan/xws",
  },
  {
    id: "weather-http-server",
    title: "Weather HTTP Server",
    category: "Standard library experiment",
    status: "Completed",
    description: "Back to the building blocks.",
    detail: "A proof-of-concept HTTP server that exposes city weather data through a REST API, exploring custom standalone servers with Python's standard library.",
    tags: ["Python", "http.server"],
    github: "https://github.com/vunicjovan/weather-http-server",
  },
  {
    id: "simple-pytorch-workflow",
    title: "Simple PyTorch Workflow",
    category: "Machine learning demonstration",
    status: "Completed",
    description: "From synthetic data to a saved model.",
    detail: "A minimal PyTorch workflow covering data generation, train/test splitting, model training, saving and loading, and visualization with Matplotlib.",
    tags: ["Python", "UV", "PyTorch", "Matplotlib"],
    github: "https://github.com/vunicjovan/simple-pytorch-workflow",
  },
];

export const skillGroups = [
  {
    "name": "Areas of Expertise",
    "groups": [
      {
        "name": null,
        "items": [
          "Back-End Development",
          "Full-Stack Development",
          "Data Engineering",
          "Data Analysis",
          "Data Science",
          "Machine Learning",
          "High Performance Computing",
          "Microservices",
          "Process Automation",
          "Architectural Patterns",
          "Scripting"
        ]
      }
    ]
  },
  {
    "name": "Programming Languages",
    "groups": [
      {
        "name": null,
        "items": [
          "Python",
          "Java",
          "JavaScript",
          "TypeScript",
          "Go",
          "R",
          "C++"
        ]
      }
    ]
  },
  {
    "name": "Back-End Development",
    "groups": [
      {
        "name": "Python",
        "items": [
          "Django",
          "Django REST Framework",
          "FastAPI",
          "Flask",
          "Quart",
          "SQLAlchemy",
          "Alembic",
          "Pydantic",
          "Asyncio",
          "Jinja2"
        ]
      },
      {
        "name": "Java",
        "items": [
          "Spring Boot",
          "Quarkus",
          "Hibernate",
          "JPA",
          "JavaFX"
        ]
      },
      {
        "name": "Go",
        "items": [
          "Gin",
          "Echo",
          "GORM"
        ]
      },
      {
        "name": "Node.js",
        "items": [
          "Express.js",
          "Socket.io"
        ]
      }
    ]
  },
  {
    "name": "Front-End Development",
    "groups": [
      {
        "name": "JavaScript/TypeScript",
        "items": [
          "React.js",
          "Redux",
          "Vue.js",
          "Vuex",
          "TypeScript"
        ]
      },
      {
        "name": "Styling & UI Frameworks",
        "items": [
          "HTML/CSS",
          "SASS/SCSS",
          "Tailwind CSS",
          "Quasar"
        ]
      }
    ]
  },
  {
    "name": "Full-Stack Development",
    "groups": [
      {
        "name": null,
        "items": [
          "Django + React",
          "FastAPI + Vue.js",
          "Spring Boot + Vue.js",
          "Node.js Stack",
          "Rio",
          "Gradio",
          "NiceGUI"
        ]
      }
    ]
  },
  {
    "name": "Event-Driven Development",
    "groups": [
      {
        "name": null,
        "items": [
          "Apache Kafka",
          "Apache Spark",
          "RabbitMQ",
          "Celery"
        ]
      }
    ]
  },
  {
    "name": "Data Analysis & Visualization",
    "groups": [
      {
        "name": null,
        "items": [
          "Pandas",
          "Polars",
          "Matplotlib",
          "Streamlit",
          "Dash",
          "Jupyter"
        ]
      }
    ]
  },
  {
    "name": "Data Science & Machine Learning",
    "groups": [
      {
        "name": "Machine Learning",
        "items": [
          "Scikit-Learn",
          "Neural Networks",
          "Joblib"
        ]
      },
      {
        "name": "Deep Learning",
        "items": [
          "PyTorch",
          "TensorFlow",
          "Keras",
          "OpenCV"
        ]
      },
      {
        "name": "NLP",
        "items": [
          "NLTK",
          "spaCy",
          "TextBlob",
          "NLP Pipelines"
        ]
      }
    ]
  },
  {
    "name": "Generative Artificial Intelligence",
    "groups": [
      {
        "name": null,
        "items": [
          "Claude Code",
          "Windsurf",
          "GitHub Copilot",
          "OpenAI GPT",
          "Google Gemini",
          "MCP Servers"
        ]
      }
    ]
  },
  {
    "name": "Databases & Search Engines",
    "groups": [
      {
        "name": "Relational Databases",
        "items": [
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "IBM DB2"
        ]
      },
      {
        "name": "Search Engines",
        "items": [
          "Elasticsearch",
          "Solr"
        ]
      }
    ]
  },
  {
    "name": "Cloud & DevOps",
    "groups": [
      {
        "name": "Cloud Platforms",
        "items": [
          "Amazon Web Services",
          "Google Cloud Platform",
          "Oracle Cloud",
          "Heroku",
          "Streamlit Cloud"
        ]
      },
      {
        "name": "Containerization & Orchestration",
        "items": [
          "Docker",
          "Docker Hub",
          "Docker Compose",
          "Kubernetes"
        ]
      },
      {
        "name": "CI/CD",
        "items": [
          "GitHub Actions",
          "GitLab CI/CD",
          "Jenkins",
          "Travis CI"
        ]
      },
      {
        "name": "Build & Automation Tools",
        "items": [
          "Make",
          "Just",
          "Pre-Commit"
        ]
      },
      {
        "name": "Monitoring",
        "items": [
          "Sentry",
          "Grafana",
          "Kibana"
        ]
      },
      {
        "name": "Code Quality",
        "items": [
          "Ruff",
          "TY",
          "Black",
          "isort",
          "mypy",
          "Prettier"
        ]
      }
    ]
  },
  {
    "name": "Version Control",
    "groups": [
      {
        "name": null,
        "items": [
          "Git",
          "GitHub",
          "GitLab",
          "SVN"
        ]
      }
    ]
  },
  {
    "name": "Documentation",
    "groups": [
      {
        "name": null,
        "items": [
          "Notion",
          "Confluence",
          "MkDocs",
          "GitHub Pages"
        ]
      }
    ]
  }
];

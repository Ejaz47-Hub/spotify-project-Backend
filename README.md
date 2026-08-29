# 📄 GenAI Resume Analyzer & Job Preparation Platform

A full-stack, GenAI-powered web application built using the MERN stack designed to help job seekers optimize resumes and prepare for technical interviews. The platform leverages the Google Gemini API to analyze resume content, provide ATS compatibility scores, highlight keyword gaps, and deliver structured recommendations.

🔗 **Live Application:** https://capable-queijadas-927118.netlify.app/login

---

## ✨ Features

- 🤖 **GenAI Resume Analysis:** Automated resume review and gap analysis powered by Google Gemini API.
- 🎯 **ATS Compatibility Scoring:** Evaluates document structure, keyword density, and formatting against target job roles.
- 🔒 **User Authentication:** Secure stateless authentication and route authorization using JSON Web Tokens (JWT) and bcrypt password hashing.
- 📑 **PDF Export & Reports:** Generates structured feedback reports with actionable improvement steps.
- 📱 **Responsive UI:** Clean, responsive user experience built with modern CSS / UI components.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, REST APIs
- **Database:** MongoDB, Mongoose ODM
- **AI Integration:** Google Gemini API
- **Deployment:** Netlify (Frontend), Railway / Cloud (Backend)
- **Testing & Tooling:** Postman, Git, npm

---

## 📁 Repository Structure

```text
├── Backend/          # Node.js + Express backend API & Gemini integration
├── Frontend/         # React.js client interface
├── netlify.toml      # Netlify deployment and redirect configurations
└── README.md
🚀 Getting StartedPrerequisitesNode.js (v18+ recommended)MongoDB instance (Local or MongoDB Atlas)Google Gemini API Key1. Clone the repositoryBashgit clone [https://github.com/Ejaz47-Hub/Ejaz47-Hub-Resume-Analyzer_Nodejs-GenAI.git](https://github.com/Ejaz47-Hub/Ejaz47-Hub-Resume-Analyzer_Nodejs-GenAI.git)
cd Ejaz47-Hub-Resume-Analyzer_Nodejs-GenAI
2. Backend SetupBashcd Backend
npm install
Create a .env file in the Backend directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
Start the backend development server:Bashnpm run dev
3. Frontend SetupBashcd ../Frontend
npm install
Create a .env file in the Frontend directory:Code snippetVITE_API_BASE_URL=http://localhost:5000/api
Start the frontend application:Bashnpm run dev
📡 Key API EndpointsMethodEndpointDescriptionAuth RequiredPOST/api/auth/registerRegister new user accountNoPOST/api/auth/loginAuthenticate user & return JWTNoPOST/api/resume/analyzeParse resume & generate Gemini insightsYesGET/api/resume/historyRetrieve previous evaluation recordsYes👨‍💻 AuthorEjaz AhmedGitHub: https://github.com/Ejaz47-HubLinkedIn: https://www.linkedin.com/in/ejaz-ahmed-786bd/
```

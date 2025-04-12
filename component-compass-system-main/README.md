🔌 Embedded Lab Lending System
A web-based platform for managing and tracking the lending of electronic components and lab equipment by students in an embedded systems laboratory.

🎯 Project Overview
This system simplifies how students borrow components from the lab by enabling:

Digital tracking of borrowed and returned items

Streamlined approval process for lab staff

Easy access to borrowing history for students

Efficient inventory management

🛠 Tech Stack
Built using modern frontend technologies for a smooth and responsive experience:

⚡ Vite – Fast build tool and dev server

🔷 TypeScript – Static typing for better code quality

⚛️ React – Component-based user interface

🧩 shadcn/ui – Accessible and reusable UI components

🎨 Tailwind CSS – Utility-first CSS framework for styling

🚀 Getting Started
To run the project locally:

Prerequisites
Make sure you have Node.js and npm installed.
(Recommended: Use nvm for managing Node versions.)

Setup Instructions
bash
Copy
Edit
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate into the project directory
cd embedded-lab-lending-system

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
🧠 Folder Structure
bash
Copy
Edit
src/
├── components/     # Reusable UI elements
├── pages/          # Main views like Dashboard, Borrow Form, etc.
├── data/           # Static or mock data
├── styles/         # Tailwind and custom styles
├── App.tsx         # Root component
└── main.tsx        # App entry point
🌍 Deployment
You can deploy this app using any platform that supports static frontend hosting:

Vercel

Netlify

GitHub Pages

Cloudflare Pages

To prepare for deployment:

bash
Copy
Edit
npm run build
Deploy the contents of the dist/ folder.

🧪 Features in Development
✅ Student login and authentication

✅ Borrow/Return form submission

✅ Component availability tracker

🔄 Admin dashboard for approval & inventory control (coming soon)

🔄 Email/SMS notifications for due dates (optional)

🤝 Contributing
This is a collaborative academic project. Contributions, suggestions, and improvements are welcome!

📄 License
Licensed under the MIT License.

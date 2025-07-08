# 🏡 NeighborFit

**NeighborFit** is a full-stack web application that helps users discover the perfect neighborhood based on their lifestyle preferences. It combines a smart matching algorithm, clean UI, and an admin dashboard to manage and moderate data efficiently.

---

## 🌟 Key Features

### 🔍 Lifestyle-Based Matching
- Users rate their preferences: safety, affordability, nightlife, parks, and schools.
- A custom algorithm suggests top-matching neighborhoods based on score proximity.

### 🏘️ Neighborhood Directory
- Browse all neighborhoods with rich descriptions, ratings, images, and location.
- Search and filter interface for better discoverability.

### ✏️ Edit Request System
- Normal users can suggest edits to neighborhood data.
- Admin can approve or reject those requests with one click.

### 🛠️ Admin Dashboard
- View total neighborhoods and edit request counts.
- Add neighborhoods, review user suggestions, and maintain data integrity.

### 🔐 Authentication
- Google OAuth login using secure `@react-oauth/google`.
- Role-based access (admin vs. user) via whitelisted emails.

---

##  Matching Algorithm

Neighborhoods are scored using absolute differences from user input:

```js
score += Math.abs(n.safety - user.safety);
score += Math.abs(n.affordability - user.affordability);
score += Math.abs(n.nightlife - user.nightlife);
score += Math.abs(n.parks - user.parks);
score += Math.abs(n.schools?.length - user.schools);




##  Tech Stack

| Frontend     | Backend           | Database      | Styling                     |
| ------------ | ----------------- | ------------- | --------------------------- |
| React + Vite | Node.js + Express | MongoDB Atlas | Tailwind CSS + Lucide Icons |

Getting Started
📦 Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
Create a .env file inside server/ with:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
💻 Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev
📁 Folder Structure
pgsql
Copy
Edit
client/
  └── components/
      └── Navbar.jsx
      └── Home.jsx
      └── PreferencesForm.jsx
      └── NeighborhoodList.jsx
      └── NeighborhoodListPage.jsx
      └── NeighborhoodDetails.jsx
      └── AddNeighborhoodForm.jsx
      └── EditRequestsPage.jsx
      └── AdminDashboard.jsx
      └── Login.jsx

server/
  └── models/
      └── Neighborhood.js
      └── EditRequest.js
  └── routes/
      └── neighborhoods.js
  └── index.js
✅ Deliverables
✅ Functional Google Login

✅ Real MongoDB-based data

✅ Matching algorithm

✅ Admin dashboard

✅ Edit request review & approval

✅ Fully responsive and elegant UI

📫 Submission
GitHub Repo: https://github.com/Chaitanyabajaj05/neighborfit

WhatsApp: +91 9350281798

🙏 Thanks
Thank you TruEstate for the opportunity. Looking forward to the next steps!

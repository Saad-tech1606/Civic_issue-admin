# 🏛️ Civic Issue Admin Portal  

[🌐 Live Website](https://civic-issue-admin-pi.vercel.app/)  

The **Civic Issue Admin Portal** is the **official management dashboard** for the *Civic Issue Reporter System*.  
It enables government officials and administrators to efficiently **monitor, verify, and resolve** civic complaints reported by citizens through the main platform.

This system brings **transparency and efficiency** to public service operations by providing real-time insights into civic infrastructure issues.

---

## 🎯 Project Objective  

The Admin Portal is built to:
- Provide an **intuitive dashboard** for government officials.  
- Allow **real-time monitoring** and management of reported civic issues.  
- Enable quick **status updates and resolutions** for citizen-reported problems.  
- Facilitate **data-driven decision-making** using analytics and visualization tools.  

---

## 💡 Key Features  

| Feature | Description |
| :--- | :--- |
| 📊 **Real-Time Dashboard** | Displays total issues, resolved cases, and pending reports. |
| 🔄 **Status Management** | Admins can update the status of issues (Pending, In Progress, Resolved). |
| 🧭 **Location Tracking** | Integrated with map visualizations to locate issue reports geographically. |
| 🧾 **Detailed Issue View** | Inspect full issue reports including user info, timestamps, and photos. |
| 🧑‍💻 **Official Login System** | Secure authentication for government officials and staff. |
| 📈 **Analytics Section** | Data visualization for category-wise and region-wise issue summaries. |
| ⚙️ **Responsive UI** | Fully responsive dashboard optimized for both desktop and tablet use. |

---

## 🛠️ Tech Stack  

### 🧑‍💻 Frontend  
- React.js  
- Tailwind CSS  
- Framer Motion  
- React Router DOM  
- Recharts (for data visualization)

### ⚙️ Backend  
- Node.js  
- Express.js  
- MongoDB  

### ☁️ Deployment  
- **Frontend:** Vercel  
- **Backend:** Vercel (Serverless Functions)  
- **Database:** MongoDB Atlas  

---

## ⚙️ How the System Works  

1. **Admin Login:**  
   - Officials log in using verified credentials.  

2. **View & Filter Issues:**  
   - Access all issues submitted by citizens via the main portal.  

3. **Manage Status:**  
   - Update issue status in real time — from *Pending → In Progress → Resolved*.  

4. **Visualize Data:**  
   - The dashboard presents visual insights for better resource allocation.  

5. **Instant Sync:**  
   - All updates are reflected instantly across both the **Citizen** and **Admin** portals.  

---


---

## 🧩 API Endpoints  

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/admin/login` | **POST** | Authenticate government official |
| `/api/issues` | **GET** | Retrieve all civic issues |
| `/api/issue/:id` | **PUT** | Update issue status |
| `/api/stats` | **GET** | Fetch summary statistics for dashboard |

---

## 🚀 Deployment  

Both frontend and backend are hosted on **Vercel** for seamless integration and high availability.  

🔗 **Frontend:** [https://civic-issue-admin-pi.vercel.app/](https://civic-issue-admin-pi.vercel.app/)  
🔗 **Backend:** Deployed on Vercel Serverless Functions  

---

## 🧪 Local Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/YourUsername/civic-issue-admin.git
cd civic-issue-admin

---
## 📈 Future Enhancements

🔔 Automated email notifications to citizens upon issue status change

🧠 AI-based priority detection for critical issues

📱 Dedicated mobile admin app

🗺️ Advanced geospatial analytics using Mapbox

👥 Role-based access system (e.g., Super Admin, Field Officer)

# 📝 AAPMOR Blogs

AAPMOR Blogs is an internal blogging platform designed for employees to share insights, knowledge, and departmental updates. The platform promotes a collaborative and knowledge-driven culture with a focus on user experience, personalization, and AI-powered enhancements.

## 🚀 Live Links

- 🔗 [Production](https://blogs.aapmor.com/)
- 🌐 [Development](https://aapmor-blogs.vercel.app/)

---

## 📌 Features

### 🆕 Version 3.0 Highlights

- 🎨 **Updated/Enhanced UI:** Fresh look and improved user experience across the platform.
- 🔔 **New Notifications:** Get notified instantly when someone comments on or likes your blog.
- 🕒 **Activities Section:** See recent activity of all members, including their likes and comments on any blog.
- 🏆 **Winners Section:** New scrolling section at the top showcasing recent blog winners.
- ✍️ **Updated Writing Blog Page:** Enhanced thumbnail UI and the ability to preview your blog before publishing.
- 🔑 **New Login Page:** Redesigned login experience.
- 👤 **Profile Updates:** Now update your profile details directly from the profile section.

---

### ✅ Previous Version Highlights

- 🧾 Simple blog listing with thumbnails, title, and author info
- ❤️ Like blogs and 🗨️ comment on them
- 📄 Detailed blog view on click
- 📂 View and manage saved blogs
- 👤 Edit profile (name, department, etc.)
- 📊 Top liked blogs panel

---

### 🌟 New Version Updates (v2.0)

#### 🖌️ UI & UX

- Revamped design with **Dark/Light themes**
- Cleaned up top liked blogs section to ensure fair content visibility
- Custom illustrations and accent colors for better engagement

#### 📚 Blog Experience

- **Author details section** with image, bio, contact link, and stats
- Blog sharing to **WhatsApp**, **LinkedIn**, or via link
- Updated comment system:
  - Nested replies
  - Like a comment
  - Reply to replies

#### 🔮 AI Integration

- ✨ **AI-powered summary generation** for blogs
- 🤖 Auto-generate profile bios based on user data using **GroqCloud**

#### 👥 Profile Enhancements

- Upload profile image
- Edit or auto-generate bio
- View saved blogs

#### 🛠 Admin Features

- Admin badge in header (visible only to admins)
- Admin-only view of blog like counts

#### 🧠 Smart Suggestions (Beta)

- Right-side dashboard showing:
  - Recommended blogs based on user interest
  - Trending blogs
  - Recent user activity (likes, comments, etc.)

---

## ⚙️ Tech Stack

| Frontend | Backend | Database | Styling     | AI        | Deployment                 |
| -------- | ------- | -------- | ----------- | --------- | -------------------------- |
| React    | Node.js | MongoDB  | Material UI | GroqCloud | Azure (Prod), Vercel (Dev) |

- ✉️ **Nodemailer** for OTPs and blog publishing notifications
- 🖼 **Vercel Blob** for image uploads (moving to Azure Blob Storage)

---

## 🧪 Development & Testing

### Run Locally

```bash
# Clone repo
git clone https://github.com/Saipraveenkanda/aapmor_blogs_frontend.git

# Install dependencies
cd aapmor-blogs
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 📬 Feedback

Have suggestions or issues? Please open an issue or reach out to the internal Dev team.

---

## 📄 License

MIT License. For internal use only at AAPMOR.

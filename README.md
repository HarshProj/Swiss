# MemeVerse

MemeVerse is a dynamic meme-sharing platform that allows users to explore, upload, and interact with memes. Built with **Next.js**, **Firebase**, and **Cloudinary**, it provides a seamless and engaging experience for meme lovers.

## 🚀 Features

### 🔍 Meme Exploration
- Infinite scrolling to explore endless memes.
- Fetch memes from multiple sources.
- Optimized image loading using `next/image`.

### 🖼 Meme Uploading
- Users can upload memes directly from their device.
- Images are stored in **Cloudinary** for optimized delivery.
- AI-generated captions for uploaded memes (if enabled).

### 👍 Like & Comment System
- Users can like memes to show appreciation.
- Add comments to engage in discussions.

### 👤 User Profiles
- Each user has a dedicated profile page.
- Displays uploaded memes and user interactions.

### 🏆 Leaderboard
- Track top meme creators based on likes and engagement.
- Ranks users dynamically based on activity.

### 🔒 Authentication & Security
- Secure authentication with **Firebase Auth**.
- Supports Google login for a quick and secure experience.

## 🛠 Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Firebase Firestore
- **Image Hosting:** Cloudinary
- **Authentication:** Firebase Auth
- **Deployment:** Vercel

## 📦 Installation & Setup

1. Clone the repository:
   ```sh
   git clone [https://github.com/your-username/memeverse.git](https://github.com/HarshProj/Swiss.git)
   cd memeverse
   ```

2. Install dependencies:
   ```sh
   npm install
   # OR
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_upload_url
   ```

4. Run the development server:
   ```sh
   npm run dev
   # OR
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### 🔹 Allow External Image Domains in `next.config.js`
Make sure your `next.config.js` includes:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgflip.com" },
    ],
  },
};

module.exports = nextConfig;
```

## 🚀 Deployment

This project is deployed using **Vercel**. To deploy:
```sh
vercel
```
Or configure your repository to deploy automatically.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by Harsh Chauhan


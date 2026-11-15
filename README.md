# 📚 BookNook

**BookNook** is a small online library where you can **add a book, borrow a book and return a book**.

Readers can browse every title on the shelf, borrow a copy for a few days, keep track of their loans and share their own books with others, all in a clean and simple interface.

🌐 **Live Website:** https://ass-08-booknook.vercel.app/

---

## ✨ Features

### 1. 📖 Browse the Shelf

See every book in a responsive grid of equal-sized cards, filter by category, and open any book to read its full details.

### 2. 🆕 New Arrivals & Top Categories

The home page shows the latest books added to the shelf, and ranks categories by how many books they hold.

### 3. ➕ Add Your Own Books

Logged-in users can add a book with a title, author, category, cover image link, description and total number of copies.

### 4. ✏️ Manage My Books

Edit a book you added with the old details already filled in, or delete it after confirming in a modal.

### 5. 🔄 Borrow & Return

Borrow a book in one step and return it from My Borrows. The number of available copies goes down when a book is borrowed and goes back up when it is returned.

### 6. 🚫 Smart Borrowing Rules

A user can borrow only one copy of the same book at a time. When no copies are left, the button turns grey and shows "Not Available".

### 7. 🔐 User Authentication

Register with email and password (with password rules), log in with email or Google, edit your profile and log out. Private pages send logged-out visitors to the login page and bring them back after login.

### 8. 🛡️ Secure API with JWT

Protected API routes check a JWT sent with each request, so only logged-in users can add, update or delete books and borrow or return them.

### 9. 📱 Responsive & User-friendly UI

Works smoothly on desktop, tablet and mobile, with a hamburger menu, toast messages for every success and error, loading spinners and a custom 404 page.

---

## 🛠️ Technologies Used

**Client**

- **Next.js 16 (App Router)** – React framework
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Styling and responsive layouts
- **shadcn/ui** – Carousel, dialogs, dropdown menu, sheet and avatar
- **Better Auth** (MongoDB adapter) – Authentication with Google login
- **JWT** – Token sent to the API with each protected request
- **Sonner** – Toast notifications
- **Lucide React & React Icons** – Icons
- **Vercel** – Deployment

**Server**

- **Express.js** – REST API
- **MongoDB** – Database for books and borrows
- **JWT verification** – Middleware that protects private routes

---

## 📌 How Borrowing Works

1. **Find a book** on the All Books page.
2. **Borrow it** from the details page. Confirm in the modal and keep it for 7 days.
3. **Return it** from My Borrows. The copy goes back on the shelf.

---

## 🗺️ Pages

| Page             | Route                | Access  |
| ---------------- | -------------------- | ------- |
| Home             | `/`                  | Public  |
| All Books        | `/all-books`         | Public  |
| Book Details     | `/all-books/:id`     | Private |
| Add Book         | `/add-book`          | Private |
| My Books         | `/my-books`          | Private |
| My Borrows       | `/my-borrows`        | Private |
| My Profile       | `/profile`           | Private |
| Login / Register | `/signin`, `/signup` | Public  |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone [CLIENT_REPO_URL]
cd booknook-client

# 2. Install dependencies
pnpm install

# 3. Add your environment variables (see below)

# 4. Run the development server
pnpm dev
```

The app runs at `http://localhost:3000`.

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

The API for this project is in a separate repository: https://github.com/souravO2/ass-08-booknook-backend

---

## 📂 Project Purpose

This project was built as a practical full-stack web development project to explore **Next.js, TypeScript, authentication, REST API design with MongoDB, responsive UI design and data-driven interfaces**.

---

## 👨‍💻 Developer

**Saifur Rahman Sourav**

Built with ❤️ using Next.js and TypeScript.

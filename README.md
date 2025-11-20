# A11y Friend - Accessibility Companion

A modern, accessible web application built with Next.js 16, Tailwind CSS, and Supabase for authentication and data storage.

## Features

- ✨ **Next.js 16** with App Router
- 🎨 **Tailwind CSS v4** for styling
- 🔐 **Supabase Authentication** (Login/Register)
- 🛡️ **Protected Routes** with middleware
- 📱 **Responsive Design**
- ♿ **Accessibility-First** approach
- 🧩 **Reusable UI Components**

## Project Structure

```
a11yfriend/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── dashboard/          # Protected dashboard
│   ├── about/              # About page
│   ├── features/           # Features page
│   ├── pricing/            # Pricing page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── LogoutButton.tsx
├── lib/
│   └── supabase/           # Supabase client utilities
│       ├── client.ts       # Browser client
│       └── server.ts       # Server client
└── middleware.ts           # Auth middleware

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project ([Get started here](https://supabase.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RBN2208/a11yfriend.git
cd a11yfriend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and anon/public key
4. Add them to your `.env.local` file
5. Authentication is automatically enabled in Supabase

Note: The app will work without Supabase for viewing pages, but authentication features require valid Supabase credentials.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## UI Components

### Button
Versatile button component with multiple variants:
- `primary` - Blue background (default)
- `secondary` - Gray background
- `outline` - Border only
- `ghost` - Transparent background

Sizes: `sm`, `md` (default), `lg`

### Input
Accessible input component with:
- Label support
- Error states with validation messages
- Helper text
- Full ARIA support

### Card
Card container components:
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardContent` - Content area

## Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/features` - Features page
- `/pricing` - Pricing page
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

## Middleware

The app uses Next.js middleware to:
- Protect dashboard routes (redirect to login if not authenticated)
- Redirect authenticated users away from auth pages
- Refresh user sessions automatically

## Styling

This project uses Tailwind CSS v4 with a custom configuration. Styles are defined in:
- `app/globals.css` - Global styles and CSS variables
- Component files - Using Tailwind utility classes

## Accessibility

This project prioritizes accessibility:
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus states on interactive elements
- Error messages with proper roles
- Color contrast compliance

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## License

This project is open source and available under the MIT License.


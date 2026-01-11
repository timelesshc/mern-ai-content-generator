# ContentFlow AI - MERN AI Content Generator

A full-stack AI-powered content generation application built with the MERN stack (MongoDB, Express, React, Node.js). ContentFlow AI uses OpenAI's GPT models to help users generate high-quality content for blogs, marketing copy, and creative writing.

## 🚀 Features

- **AI-Powered Content Generation**: Generate engaging content using OpenAI's advanced language models
- **User Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Subscription Plans**: Multiple tiers (Free, Basic, Premium) with different API request limits
- **Payment Integration**: Stripe payment integration for subscription upgrades
- **Content History**: Track and manage all generated content
- **Customizable Output**: Choose tone (Formal, Informal, Humorous) and category (Technology, Health, Business)
- **Trial Period**: 3-day free trial for new users
- **Responsive Design**: Beautiful UI built with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- OpenAI API Key
- Stripe API Keys (for payments)

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing
- **Stripe**: Payment processing
- **Axios**: HTTP client for OpenAI API calls
- **Node-Cron**: Scheduled tasks for subscription renewals

### Frontend
- **React**: UI framework
- **React Router**: Client-side routing
- **Tanstack Query**: Server state management
- **Formik & Yup**: Form handling and validation
- **Tailwind CSS**: Styling
- **Stripe React**: Payment UI components
- **Axios**: API communication

## 📁 Project Structure

```
mern-ai-content-generator/
├── mern-ai-content-generator-backend/
│   ├── controllers/         # Route controllers
│   ├── middlewares/        # Authentication & error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   └── server.js          # Entry point
└── mern-ai-content-generator-frontend/
    ├── src/
    │   ├── apis/          # API service functions
    │   ├── components/    # React components
    │   ├── AuthContext/   # Authentication context
    │   └── App.js         # Main app component
    └── public/
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-ai-content-generator
```

### 2. Backend Setup

```bash
cd mern-ai-content-generator-backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
# Development mode with nodemon
npm run server

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd mern-ai-content-generator-frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `GET /api/v1/users/profile` - Get user profile (Protected)
- `GET /api/v1/users/auth/check` - Check auth status (Protected)

### Content Generation
- `POST /api/v1/openai/generate-content` - Generate AI content (Protected)

### Payments
- `POST /api/v1/stripe/checkout` - Create payment intent
- `POST /api/v1/stripe/verify-payment/:paymentId` - Verify payment
- `POST /api/v1/stripe/free-plan` - Activate free plan (Protected)

## 💳 Subscription Plans

| Plan | Price | Monthly Requests | Features |
|------|-------|------------------|----------|
| Trial | Free | 100 | 3-day trial period |
| Free | $0 | 5 | Basic features |
| Basic | $20 | 50 | Standard features |
| Premium | $50 | 100 | All features |

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-content-gen
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🧪 Testing

The application includes:
- User registration and authentication
- Content generation with OpenAI
- Subscription management
- Payment processing with Stripe
- Protected routes and middleware

## 🚧 Development

### Backend Development
```bash
cd mern-ai-content-generator-backend
npm run server  # Runs with nodemon for auto-restart
```

### Frontend Development
```bash
cd mern-ai-content-generator-frontend
npm start  # Runs on localhost:3000
```

## 📝 Models

### User Model
- Username, email, password
- Subscription plan and trial status
- API request counts and limits
- Payment history references

### Payment Model
- User reference
- Subscription plan details
- Amount, currency, status
- Payment reference

### Content History Model
- User reference
- Generated content
- Metadata (category, tone, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Stripe for payment processing
- The MERN stack community

---

**Built with ❤️ using the MERN Stack**

# Voice-to-Text Application

This project is a SaaS (Software as a Service) application that allows users to transcribe audio files into text. The application is designed with React (Next.js) on the frontend and uses API for handling transcription and database operations.

---

## Features

- **File Upload**: Users can upload audio files for transcription.
- **Real-Time Transcription**: Audio files are processed and converted into text.
- **Payment Integration**: Users are prompted to pay after exceeding the free transcription limit.
- **Database Integration**: Transcriptions and metadata are saved to a database.
  
---

## Tech Stack

- **Framework**: React (Next.js)
- **Styling**: Tailwind CSS
- **Database**: Prisma with PostgreSQL
- **Authentication**: Clerk
- **Payment**: Stripe for payment processing

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone 
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project and add the following:
   ```env
   DATABASE_URL=<your_postgresql_connection_string>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).



## Usage

1. **Upload Audio File**: Click on the file input to upload an audio file.
2. **Transcribe**: Click the "Transcribe" button to start transcription.
3. **View Results**: Transcribed text is displayed below the file upload section.
4. **Payment Modal**: If the free transcription limit is exceeded, a payment modal will appear.



# Church Anniversary & Birthday Helper - Frontend

A modern Next.js frontend for managing church member celebrations and automated messaging.

## Features

### 📊 **Dashboard**

- System health monitoring
- Today's celebrations overview
- Statistics and metrics
- Real-time status updates

### 👥 **People Management**

- View all church members
- Add/edit/delete member information
- Filter by birthdays and anniversaries
- Phone number management

### 📤 **CSV Upload**

- Bulk import member data
- Validation and error handling
- Progress tracking
- Update existing records

### 💬 **Message History**

- View all sent celebration messages
- Success/failure tracking
- Message content preview
- Date filtering

### 📅 **Celebrations**

- Today's celebrations
- Upcoming events calendar
- Date-specific lookups
- Event type filtering

### ⚙️ **Settings**

- Scheduler configuration
- System status monitoring
- API key management
- Health checks

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**: Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard
│   ├── people/            # People management
│   ├── upload/            # CSV upload
│   ├── messages/          # Message history
│   ├── celebrations/      # Celebrations calendar
│   └── settings/          # Settings
├── components/            # Reusable components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── PeopleTable.tsx    # People data table
│   ├── CSVUploader.tsx    # File upload component
│   └── ...
├── lib/                   # Utilities
│   └── api.ts            # API client
└── types/                 # TypeScript types
    └── index.ts          # Shared interfaces
```

## API Integration

The frontend connects to the FastAPI backend running on `http://localhost:8000`. Key endpoints:

- `GET /health` - System health check
- `GET /people` - Fetch all people
- `GET /celebrations/today` - Today's celebrations
- `POST /upload-csv` - Upload member data
- `GET /scheduler/status` - Scheduler status

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

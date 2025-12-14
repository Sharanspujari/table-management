Setup Instructions
=>Node.js v18+ recommended
=>npm

INSTALLATION:
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd table-management

# Install dependencies
npm install

# Start development server
npm run dev

# The application will be available at:
http://localhost:5173

# Build for Production
npm run build

# Features Implemented
=> High-performance table rendering using TanStack Table

=> Virtualized rows with @tanstack/react-virtual for smooth scrolling

=> Global search across multiple columns

=> Column-level filters ,String match filters ,Numeric range (min/max) filters

=> Sorting (ascending / descending)

=> Client-side pagination

=> CSV export of visible rows

=> Debounced global search for better performance

=> Empty state handling

# Modular architecture
=> Custom hooks
=> Reusable components

=> Responsive UI using Tailwind CSS

# Dataset Choice & Reasoning
The dataset represents music tracks, including:
Track name ,Artist , Album ,Genre ,Popularity ,Tempo,Energy,Danceability,Duration,Release date,Explicit content flag

# Why This Dataset?
=> Contains mixed data types (string, number, boolean, date)
=> Ideal for demonstrating: Sorting ,Filtering ,Numeric range filters
=> Large enough to justify virtualization
=> Realistic, domain-rich data similar to production use cases

# Technology Decisions & Trade-offs
React (with Vite)
=> Fast development and HMR
=> Modern tooling

TanStack React Table
=> Headless and highly flexible
=> Excellent performance
=> Full control over UI and behavior

TanStack React Virtual
=> Handles large datasets efficiently Smooth scrolling and reduced DOM size
=> Smooth scrolling and reduced DOM size

Tailwind CSS
=> Rapid UI development
=> Utility-first and consistent styling

Client-side Pagination & Filtering
=> Simple to implement
=>  Fast for medium datasets

Total Time Spent: 12 hours (Taken help from AI only whenever required)
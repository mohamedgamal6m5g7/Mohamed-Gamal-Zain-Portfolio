# Portfolio Admin Dashboard

A comprehensive, user-friendly admin interface for managing your portfolio website without any coding required.

## 🚀 Features

### ✨ **Enhanced Admin Interface**
- **Live Preview**: See changes in real-time as you edit
- **Auto-save Toggle**: Enable/disable automatic saving
- **Unsaved Changes Indicator**: Know when you have pending changes
- **Modern UI/UX**: Clean, intuitive interface with better organization

### 📝 **Complete Content Management**
- **Personal Information**: Profile photo, basic info, contact details
- **Skills Management**: Add/edit skill categories and individual skills
- **Projects**: Full project management with images and details
- **Experience**: Professional experience tracking
- **Timeline**: Career journey visualization
- **Professional Development**: Course and training management
- **Activities**: Volunteering, leadership, competitions, awards
- **Testimonials**: Client and colleague references

### 🎯 **Key Benefits**
1. **No Coding Required**: Everything can be managed through the admin interface
2. **Real-time Updates**: See changes immediately in the preview
3. **User-friendly Forms**: Intuitive input fields with helpful placeholders
4. **Image Management**: Easy photo uploads and management
5. **Data Persistence**: All changes are saved to the database
6. **Responsive Design**: Works on all devices

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-site_6

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Access Points
- **Main Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## 📖 How to Use

### 1. **Accessing the Admin Panel**
Navigate to `http://localhost:3000/admin` and log in with your credentials.

### 2. **Personal Information**
- **Profile Photo**: Upload your professional photo
- **Basic Info**: Name, title, professional summary
- **Contact Details**: Email, phone, location, LinkedIn

### 3. **Skills Management**
- **Add Skill Categories**: Create categories like "Programming", "Design", etc.
- **Add Skills**: Add individual skills with proficiency levels and project counts
- **Edit Skills**: Modify skill levels, names, and project counts

### 4. **Projects**
- **Add Projects**: Create new projects with descriptions, technologies, and images
- **Edit Projects**: Update project details, status, and achievements
- **Manage Images**: Upload and organize project screenshots

### 5. **Experience**
- **Add Experience**: Add work experience with company details
- **Edit Experience**: Update job descriptions, responsibilities, and achievements
- **Manage Timeline**: Organize experience chronologically

### 6. **Professional Development**
- **Add Courses**: Track training programs and certifications
- **Edit Status**: Mark courses as "In Progress" or "Completed"
- **Manage Institutions**: Add course providers and dates

### 7. **Activities & Volunteering**
- **Volunteering**: Add volunteer work and community service
- **Leadership**: Track leadership roles and committee memberships
- **Competitions**: Manage competition participation and achievements
- **Awards**: Document awards and recognition

### 8. **Testimonials**
- **Add References**: Add client and colleague testimonials
- **Rating System**: 5-star rating system for testimonials
- **Relationship Types**: Categorize by relationship type

## 🔧 Technical Details

### Data Structure
The portfolio data is stored in JSON format with the following structure:

```typescript
interface PortfolioData {
  personalInfo: {
    name: string
    title: string
    subtitle: string
    email: string
    phone: string
    location: string
    linkedin: string
    photo: string
  }
  skillCategories: SkillCategory[]
  projects: Project[]
  experiences: Experience[]
  timeline: TimelineEvent[]
  courses: Course[]
  volunteering: Volunteering[]
  activities: Activity[]
  competitions: Competition[]
  awards: Award[]
  testimonials: Testimonial[]
}
```

### File Structure
```
portfolio-site_6/
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   └── page.tsx         # Main portfolio page
├── components/          # React components
├── lib/                 # Data management
├── hooks/               # Custom hooks
└── public/              # Static assets
```

### API Endpoints
- `GET /api/portfolio` - Fetch portfolio data
- `GET /api/admin/portfolio` - Admin: Fetch portfolio data
- `PUT /api/admin/portfolio` - Admin: Update portfolio data
- `POST /api/auth/login` - Admin authentication
- `POST /api/admin/upload` - Image upload

## 🎨 Customization

### Adding New Sections
1. Update the data structure in `lib/portfolio-data.ts`
2. Add admin interface in `app/admin/page.tsx`
3. Create frontend component
4. Update the main page to include the new section

### Styling
The admin interface uses Tailwind CSS and shadcn/ui components. You can customize:
- Colors and themes
- Layout and spacing
- Form styling
- Button variants

## 🔒 Security

### Authentication
- Simple token-based authentication
- Admin routes are protected
- Session management with localStorage

### Data Validation
- Input validation on all forms
- File upload restrictions
- XSS protection

## 🚀 Deployment

### Production Build
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables
Create a `.env.local` file:
```env
# Add any environment variables here
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🤝 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

## 📄 License

This project is licensed under the MIT License.

---

**Happy Portfolio Management! 🎉** 
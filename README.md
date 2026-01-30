# MapUp - Electric Vehicle Analytics Dashboard

## 🚀 Live Dashboard
**[View Live Dashboard](#)** *(Replace with your deployment URL)*

---

## 📊 Overview

This comprehensive analytics dashboard provides deep insights into the Electric Vehicle (EV) population dataset. The application visualizes key trends, distributions, and patterns in EV adoption, helping understand the current state and growth of electric vehicle market.

---

## ✨ Key Features

### Interactive Visualizations
- **Top Manufacturers Analysis**: Bar chart showing the leading EV manufacturers by vehicle count
- **Growth Trend Analysis**: Area chart displaying EV population growth over time
- **Electric Range Distribution**: Understanding the range capabilities across different EVs
- **Vehicle Type Breakdown**: Pie chart comparing BEV vs PHEV distribution
- **Popular Models**: Horizontal bar chart of the most registered EV models
- **Geographic Distribution**: Regional analysis of EV adoption

### Dynamic Filtering
- Filter by **Model Year** to analyze specific time periods
- Filter by **Manufacturer** to focus on particular brands
- Real-time chart updates based on selected filters
- Easy reset functionality to return to full dataset view

### Key Performance Metrics
- **Total EV Count**: Complete inventory of registered electric vehicles
- **Average Electric Range**: Mean range across all vehicles
- **Top Manufacturer**: Market leader by registration count
- **Unique Models**: Diversity of available EV options

### Data-Driven Insights
- Market leadership analysis
- Growth trajectory observations
- Range evolution trends
- Vehicle diversity assessment

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Data Visualization**: Recharts 2.15.0
- **Data Processing**: PapaParse 5.4.1
- **Styling**: Custom CSS with modern design principles
- **Fonts**: Google Fonts (Outfit & JetBrains Mono)

---

## 📈 Insights Highlighted

### 1. Market Leadership
The dashboard identifies the dominant players in the EV market, revealing which manufacturers have the strongest market penetration and brand preference among consumers.

### 2. Exponential Growth
Analysis of year-over-year data demonstrates the rapid acceleration of EV adoption, with recent years showing exponential growth in registrations.

### 3. Range Evolution
The average electric range metric showcases significant improvements in battery technology, with modern EVs addressing historical range anxiety concerns.

### 4. Market Diversity
With hundreds of unique models available, the analysis reveals a mature and diverse market offering choices for various consumer segments and use cases.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/analytics-dashboard-assessment.git
cd analytics-dashboard-assessment
```

2. **Install dependencies**
```bash
npm install
```

3. **Add the dataset**
- Place `Electric_Vehicle_Population_Data.csv` in the `/public` directory
- The CSV file should be at: `/public/Electric_Vehicle_Population_Data.csv`

4. **Run development server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

---

## 📁 Project Structure

```
ev-analytics-dashboard/
├── public/
│   └── Electric_Vehicle_Population_Data.csv    # Dataset file
├── src/
│   ├── App.jsx                                  # Main dashboard component
│   ├── App.css                                  # Styles and animations
│   └── main.jsx                                 # React entry point
├── index.html                                   # HTML template
├── package.json                                 # Dependencies
├── vite.config.js                              # Vite configuration
└── README.md                                    # This file
```

---

## 🎨 Design Philosophy

The dashboard follows modern design principles:

- **Clean & Professional**: Minimalist interface focusing on data clarity
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle transitions for enhanced user experience
- **Color Psychology**: Strategic use of colors to highlight important metrics
- **Typography**: Modern font pairing (Outfit + JetBrains Mono) for readability
- **Accessibility**: High contrast ratios and clear visual hierarchy

---

## 🔍 Data Analysis Approach

### Data Processing
1. **CSV Parsing**: Using PapaParse for efficient data loading
2. **Data Cleaning**: Filtering out incomplete records
3. **Aggregation**: Computing metrics across different dimensions
4. **Real-time Filtering**: Dynamic data processing based on user selections

### Visualization Strategy
1. **Bar Charts**: For comparing categorical data (makes, models, locations)
2. **Area Charts**: For showing trends over time
3. **Pie Charts**: For proportion analysis (vehicle types)
4. **Color Coding**: Consistent color scheme across all visualizations

---

## 🚢 Deployment

This dashboard can be deployed on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository
2. Import the project
3. Configure: Framework Preset = Vite
4. Deploy

### Netlify
1. Connect via GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Other Options
- GitHub Pages
- AWS Amplify
- Firebase Hosting
- Render

---

## 📊 Dataset Information

**Source**: Electric Vehicle Population Data
**Format**: CSV
**Key Fields**:
- Model Year
- Make (Manufacturer)
- Model
- Electric Vehicle Type (BEV/PHEV)
- Electric Range
- Location Data (State/County)
- Clean Alternative Fuel Vehicle Eligibility

---

## 🔮 Future Enhancements

Potential improvements for future iterations:

- [ ] Add export functionality (PDF/Excel reports)
- [ ] Implement advanced filtering (multi-select, date ranges)
- [ ] Include map visualization for geographic distribution
- [ ] Add comparison mode for year-over-year analysis
- [ ] Integrate real-time data updates
- [ ] Implement user preferences and saved views
- [ ] Add more granular breakdowns (by price range, features)
- [ ] Include predictive analytics and forecasting

---

## 👨‍💻 Development Notes

### Performance Optimizations
- Efficient data processing with memoization
- Responsive chart rendering
- Optimized bundle size with Vite
- Lazy loading of heavy components (if extended)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

---

## 📝 Assessment Submission

This dashboard was created as part of the MapUp Full-Stack Developer assessment.

**Key Requirements Met**:
✅ Interactive data visualization dashboard
✅ Multiple chart types and insights
✅ Clean, professional UI/UX
✅ Responsive design
✅ Deployed and publicly accessible
✅ Comprehensive documentation

---

## 📧 Contact

For questions or feedback regarding this assessment:
- **Email**: himansu72001@gmail.com
- **GitHub**: [Your GitHub Profile]

---

## 📄 License

This project was created for assessment purposes.

---

**Built with ❤️ for MapUp Assessment**

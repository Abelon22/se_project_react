# WTWR (What to Wear?) - Weather-Based Clothing Recommendation App

A modern React application that provides clothing recommendations based on current weather conditions. The app fetches real-time weather data and suggests appropriate clothing items for the current temperature and weather conditions.

![WTWR App](./src/assets/images/logo.png)

## 🌟 Features

- **Real-time Weather Data**: Integrates with OpenWeatherMap API to fetch current weather conditions
- **Geolocation Support**: Users can enable navigator geolocation to get weather data for their current location
- **Clothing Recommendations**: Displays clothing items suitable for current weather (hot, warm, cold)
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius
- **Location Selection**: Choose between user's current location or predefined locations
- **Add Clothing Items**: Users can add new clothing items to the collection
- **Responsive Design**: Fully mobile-responsive with optimized layouts for all screen sizes
- **Modern UI**: Clean, intuitive interface with CSS modules for component styling

## 🛠️ Technologies Used

- **React 18** - Frontend framework with hooks (useState, useEffect, useMemo)
- **Vite** - Build tool and development server
- **CSS Modules** - Scoped CSS styling for components
- **React Context API** - State management for weather data, temperature units, and location settings
- **OpenWeatherMap API** - Weather data provider
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5 Geolocation API** - User location detection

## 🏗️ Application Architecture

### Context Providers

- **WeatherProvider**: Manages weather API calls, temperature data, and weather conditions
- **TempContext**: Handles temperature unit preferences (Fahrenheit/Celsius)
- **LocationContext**: Manages user location settings and geolocation functionality

### Component Structure

```
src/
├── components/
│   ├── App/              # Main application component
│   ├── Header/           # Navigation with date, location, and controls
│   ├── Main/             # Weather display and clothing grid
│   ├── Footer/           # Application footer
│   ├── Modals/           # Modal components for adding items and item details
│   ├── Toggle/           # Temperature unit toggle switch
│   └── LocationChoice/   # Location selection component
├── context/              # React Context providers and hooks
├── utils/                # Utility functions and constants
└── assets/               # Images and static resources
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key

### Installation

1. **Clone the repository**

   ```bash
   git clone [your-repository-url]
   cd se_project_react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

   You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

4. **Update the constants file**

   Update `src/utils/constants.js` to use your API key:

   ```javascript
   export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
   export const latitude = 26.7153; // Default latitude
   export const longitude = -80.0581; // Default longitude
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will open in your browser at `http://localhost:5173`.

### Alternative Setup with Vite Template

If you want to start from scratch:

```bash
npm create vite@latest wtwr-app -- --template react
cd wtwr-app
npm install
```

Then copy the source files and follow the environment setup steps above.

## 📱 Mobile Responsiveness

The application features comprehensive mobile responsiveness with optimized layouts for:

- **Desktop** (1200px+): 4-column clothing grid, full navigation
- **Large Tablets** (960px - 1200px): 3-column grid, compact navigation
- **Small Tablets** (768px - 960px): 2-column grid, collapsible menu
- **Mobile** (≤768px): Single column layout, hamburger menu navigation
- **Small Mobile** (≤480px): Optimized for small screens with adjusted spacing

### Key Responsive Features:

- Collapsible hamburger menu for mobile navigation
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizes and spacing
- Optimized typography scaling across devices
- Improved alignment and spacing for small screens

## 🎮 Usage

1. **Allow Location Access**: Click "Allow" when prompted to share your location for accurate local weather
2. **View Weather**: The app displays current temperature, weather conditions, and time
3. **Browse Clothing**: Scroll through recommended clothing items based on current weather
4. **Toggle Temperature**: Use the toggle switch to change between Fahrenheit and Celsius
5. **Add Clothing**: Click "+ Add clothes" to add new items to your wardrobe
6. **View Item Details**: Click on any clothing item to see more details
7. **Change Location**: Use the location selector to choose different cities

## 🔧 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages (if configured)

## 🌡️ Weather Integration

The app integrates with the OpenWeatherMap API to provide:

- Current temperature and "feels like" temperature
- Weather conditions (clear, cloudy, rainy, snowy, etc.)
- Day/night detection for appropriate imagery
- Local time display
- City name and location information

Weather conditions are classified into three categories:

- **Hot**: ≥86°F (30°C)
- **Warm**: 66°F-85°F (19°C-29°C)
- **Cold**: ≤65°F (≤18°C)

## 🎨 Styling

The application uses CSS Modules for component-scoped styling, ensuring:

- No style conflicts between components
- Maintainable and organized CSS
- Responsive design patterns
- Modern CSS features (Grid, Flexbox, Custom Properties)

## 🔄 State Management

The app uses React Context API for efficient state management:

- **Weather Context**: Manages API calls, weather data, and loading states
- **Temperature Context**: Handles user preference for temperature units
- **Location Context**: Manages geolocation and location selection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of a software engineering curriculum and is for educational purposes.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Vite](https://vitejs.dev/) for the excellent build tool
- [React](https://reactjs.org/) for the robust frontend framework
- CSS Modules for scoped styling solution

---

**Note**: Remember to keep your API key secure and never commit it to version control. Use environment variables for sensitive information.

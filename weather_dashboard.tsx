import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Search } from 'lucide-react';

export default function WeatherDashboard() {
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = (cityName) => {
    setLoading(true);
    
    setTimeout(() => {
      const mockWeather = {
        city: cityName,
        country: 'UK',
        temp: Math.floor(Math.random() * 20) + 10,
        feelsLike: Math.floor(Math.random() * 20) + 8,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 5) + 5,
        pressure: Math.floor(Math.random() * 30) + 1000,
        uvIndex: Math.floor(Math.random() * 8) + 1
      };

      const mockForecast = Array.from({ length: 7 }, (_, i) => ({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() + i) % 7],
        temp: Math.floor(Math.random() * 15) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      }));

      setWeather(mockWeather);
      setForecast(mockForecast);
      setLoading(false);
    }, 800);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setCity(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'Sunny': return <Sun className="w-20 h-20 text-yellow-400" />;
      case 'Rainy': return <CloudRain className="w-20 h-20 text-blue-400" />;
      case 'Cloudy': return <Cloud className="w-20 h-20 text-gray-400" />;
      case 'Partly Cloudy': return <Cloud className="w-20 h-20 text-gray-300" />;
      default: return <Sun className="w-20 h-20 text-yellow-400" />;
    }
  };

  const getBackground = () => {
    if (!weather) return 'from-blue-400 to-blue-600';
    switch(weather.condition) {
      case 'Sunny': return 'from-orange-400 to-yellow-500';
      case 'Rainy': return 'from-gray-600 to-blue-800';
      case 'Cloudy': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold animate-pulse">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackground()} p-4 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-2 flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 bg-transparent text-white placeholder-white placeholder-opacity-70 px-4 py-3 outline-none text-lg"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
            >
              <Search size={20} /> Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-8 text-white">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6" />
              <h2 className="text-3xl font-bold">{weather.city}, {weather.country}</h2>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-7xl font-bold mb-2">{weather.temp}°C</div>
                <div className="text-xl opacity-90">Feels like {weather.feelsLike}°C</div>
                <div className="text-2xl mt-2">{weather.condition}</div>
              </div>
              <div className="transform hover:scale-110 transition-transform">
                {getWeatherIcon(weather.condition)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm opacity-80">Humidity</span>
                </div>
                <div className="text-
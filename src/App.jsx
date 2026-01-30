import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMake, setSelectedMake] = useState('all');

 const calculateMetrics = (rawData) => {
    const totalVehicles = rawData.length;
    
    // Average electric range
    const rangeValues = rawData
      .map(row => parseFloat(row['Electric Range']))
      .filter(val => !isNaN(val) && val > 0);
    const avgRange = rangeValues.length > 0
      ? (rangeValues.reduce((a, b) => a + b, 0) / rangeValues.length).toFixed(1)
      : 0;

    // Most popular make
    const makeCounts = {};
    rawData.forEach(row => {
      const make = row['Make'];
      makeCounts[make] = (makeCounts[make] || 0) + 1;
    });
    const popularMake = Object.entries(makeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Unique models
    const uniqueModels = new Set(rawData.map(row => row['Model'])).size;

    // BEV vs PHEV
    const bevCount = rawData.filter(row => row['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;
    const phevCount = rawData.filter(row => row['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;

    // Latest year data
    const years = rawData.map(row => parseInt(row['Model Year'])).filter(y => !isNaN(y));
    const latestYear = Math.max(...years);
    const latestYearCount = rawData.filter(row => parseInt(row['Model Year']) === latestYear).length;

    setMetrics({
      totalVehicles,
      avgRange,
      popularMake,
      uniqueModels,
      bevCount,
      phevCount,
      latestYear,
      latestYearCount
    });
  };

  const loadData = async () => {
    try {
      const response = await fetch('/Electric_Vehicle_Population_Data.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const cleanedData = results.data.filter(row => 
            row['Model Year'] && row['Make'] && row['Model']
          );
          setData(cleanedData);
          calculateMetrics(cleanedData);
          setLoading(false);
        },
        error: (err) => {
          setError('Failed to load data: ' + err.message);
          setLoading(false);
        }
      });
    } catch (err) {
      setError('Failed to fetch CSV file: ' + err.message);
      setLoading(false);
    }
  };

   useEffect(() => {
    loadData();
  }, []);

  

  const getFilteredData = () => {
    let filtered = [...data];
    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(row => row['Model Year'] === selectedYear);
    }
    
    if (selectedMake !== 'all') {
      filtered = filtered.filter(row => row['Make'] === selectedMake);
    }
    
    return filtered;
  };

  // Chart Data Processors
  const getTopMakesData = () => {
    const filteredData = getFilteredData();
    const makeCounts = {};
    
    filteredData.forEach(row => {
      const make = row['Make'];
      makeCounts[make] = (makeCounts[make] || 0) + 1;
    });

    return Object.entries(makeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([make, count]) => ({ make, count }));
  };

  const getYearlyGrowthData = () => {
    const yearCounts = {};
    
    data.forEach(row => {
      const year = row['Model Year'];
      if (year && parseInt(year) >= 2010) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    });

    return Object.entries(yearCounts)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([year, count]) => ({ year, count }));
  };

  const getElectricRangeData = () => {
    const filteredData = getFilteredData();
    const ranges = {
      '0-50': 0,
      '51-100': 0,
      '101-150': 0,
      '151-200': 0,
      '201-250': 0,
      '251-300': 0,
      '300+': 0
    };

    filteredData.forEach(row => {
      const range = parseFloat(row['Electric Range']);
      if (!isNaN(range)) {
        if (range <= 50) ranges['0-50']++;
        else if (range <= 100) ranges['51-100']++;
        else if (range <= 150) ranges['101-150']++;
        else if (range <= 200) ranges['151-200']++;
        else if (range <= 250) ranges['201-250']++;
        else if (range <= 300) ranges['251-300']++;
        else ranges['300+']++;
      }
    });

    return Object.entries(ranges).map(([range, count]) => ({ range, count }));
  };

  const getVehicleTypeData = () => {
    const filteredData = getFilteredData();
    const types = {};
    
    filteredData.forEach(row => {
      const type = row['Electric Vehicle Type'];
      if (type) {
        const shortType = type.includes('BEV') ? 'BEV' : type.includes('PHEV') ? 'PHEV' : 'Other';
        types[shortType] = (types[shortType] || 0) + 1;
      }
    });

    return Object.entries(types).map(([name, value]) => ({ name, value }));
  };

  const getTopModelsData = () => {
    const filteredData = getFilteredData();
    const modelCounts = {};
    
    filteredData.forEach(row => {
      const model = `${row['Make']} ${row['Model']}`;
      modelCounts[model] = (modelCounts[model] || 0) + 1;
    });

    return Object.entries(modelCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([model, count]) => ({ model, count }));
  };

  const getStateDistribution = () => {
    const filteredData = getFilteredData();
    const stateCounts = {};
    
    filteredData.forEach(row => {
      const state = row['State'] || row['County'] || 'Unknown';
      if (state && state !== 'Unknown') {
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      }
    });

    return Object.entries(stateCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([state, count]) => ({ state, count }));
  };

  const getYearOptions = () => {
    const years = [...new Set(data.map(row => row['Model Year']))]
      .filter(year => year && parseInt(year) >= 2010)
      .sort((a, b) => parseInt(b) - parseInt(a));
    return years;
  };

  const getMakeOptions = () => {
    const makes = [...new Set(data.map(row => row['Make']))]
      .filter(make => make)
      .sort();
    return makes;
  };

  const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#8884D8', '#FF6B9D', '#C084FC', '#34D399'];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading EV Analytics Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Make sure Electric_Vehicle_Population_Data.csv is in the /public folder</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Electric Vehicle Analytics</h1>
            <p>Comprehensive insights into the EV population landscape</p>
          </div>
          <div className="header-badge">
            <span className="badge-text">Live Data</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Year:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="all">All Years</option>
            {getYearOptions().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Filter by Make:</label>
          <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
            <option value="all">All Manufacturers</option>
            {getMakeOptions().map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {(selectedYear !== 'all' || selectedMake !== 'all') && (
          <button 
            className="reset-btn"
            onClick={() => {
              setSelectedYear('all');
              setSelectedMake('all');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card metric-primary">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <div className="metric-label">Total EVs</div>
            <div className="metric-value">{metrics.totalVehicles?.toLocaleString()}</div>
          </div>
        </div>

        <div className="metric-card metric-secondary">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-label">Avg Range</div>
            <div className="metric-value">{metrics.avgRange} mi</div>
          </div>
        </div>

        <div className="metric-card metric-accent">
          <div className="metric-icon">🏆</div>
          <div className="metric-content">
            <div className="metric-label">Top Manufacturer</div>
            <div className="metric-value metric-value-small">{metrics.popularMake}</div>
          </div>
        </div>

        <div className="metric-card metric-info">
          <div className="metric-icon">🚗</div>
          <div className="metric-content">
            <div className="metric-label">Unique Models</div>
            <div className="metric-value">{metrics.uniqueModels}</div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-container">
        {/* Top Manufacturers */}
        <div className="chart-card chart-large">
          <h3 className="chart-title">Top 10 Manufacturers by Vehicle Count</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={getTopMakesData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="make" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* EV Growth Over Time */}
        <div className="chart-card chart-large">
          <h3 className="chart-title">EV Population Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={getYearlyGrowthData()}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#0088FE" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Electric Range Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Electric Range Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getElectricRangeData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FFBB28" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Type Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Vehicle Type Distribution</h3>
          <div className="pie-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getVehicleTypeData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getVehicleTypeData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Models */}
        <div className="chart-card chart-large">
          <h3 className="chart-title">Most Popular EV Models</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={getTopModelsData()} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" />
              <YAxis dataKey="model" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884D8" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* State Distribution */}
        <div className="chart-card chart-large">
          <h3 className="chart-title">Geographic Distribution (Top 10 Locations)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={getStateDistribution()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FF8042" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="insights-section">
        <h2 className="insights-title">Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-number">01</div>
            <h4>Market Leadership</h4>
            <p>{metrics.popularMake} dominates the EV market with the highest number of registered vehicles, indicating strong brand preference and market penetration.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-number">02</div>
            <h4>Growth Trajectory</h4>
            <p>The EV population shows exponential growth over recent years, with {metrics.latestYearCount?.toLocaleString()} vehicles registered in {metrics.latestYear}, demonstrating rapid adoption.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-number">03</div>
            <h4>Range Evolution</h4>
            <p>Average electric range of {metrics.avgRange} miles indicates significant improvements in battery technology, addressing range anxiety concerns.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-number">04</div>
            <h4>Vehicle Diversity</h4>
            <p>With {metrics.uniqueModels} unique models available, the market offers diverse options for consumers with varying needs and preferences.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>MapUp Analytics Dashboard Assessment | Data Source: Electric Vehicle Population Dataset</p>
        <p>Built with React, Recharts, and modern web technologies</p>
      </footer>
    </div>
  );
}

export default App;

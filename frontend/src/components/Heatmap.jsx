import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Heatmap({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:5000/api/activity', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const labels = res.data.map(u => u.username);
        const counts = res.data.map(u => u.activityCount);
        setData({
          labels,
          datasets: [
            {
              label: 'Activity Count',
              data: counts,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
            },
          ],
        });
      });
  }, [token]);

  if (!data) return <p>Loading activity data...</p>;

  // return (
  //   <div className="p-4 max-w-3xl mx-auto">
  //     <h2 className="text-2xl font-bold mb-4">Developer Activity Heatmap</h2>
  //     <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
  //   </div>
  // );
  return (
  <div className="min-h-screen bg-gray-900">
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-light text-white">Developer Activity</h1>
            <p className="text-gray-400 mt-1">Track your development patterns and productivity</p>
          </div>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-medium text-white">Activity Heatmap</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Commits & Activity</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <style jsx>{`
            .chart-container canvas {
              background-color: transparent !important;
            }
          `}</style>
          <div className="chart-container">
            <Bar 
              data={{
                ...data,
                datasets: data.datasets?.map(dataset => ({
                  ...dataset,
                  backgroundColor: dataset.backgroundColor || 'rgba(59, 130, 246, 0.8)',
                  borderColor: dataset.borderColor || 'rgba(59, 130, 246, 1)',
                  borderWidth: 1
                }))
              }} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  intersect: false,
                  mode: 'index'
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#D1D5DB',
                      font: {
                        size: 12
                      },
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: '#374151',
                    titleColor: '#F9FAFB',
                    bodyColor: '#D1D5DB',
                    borderColor: '#4B5563',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: '#374151',
                      borderColor: '#4B5563'
                    },
                    ticks: {
                      color: '#9CA3AF',
                      font: {
                        size: 11
                      }
                    }
                  },
                  y: {
                    grid: {
                      color: '#374151',
                      borderColor: '#4B5563'
                    },
                    ticks: {
                      color: '#9CA3AF',
                      font: {
                        size: 11
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const ExportButton = ({ profiles }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
       const response = await fetch(`${API_BASE_URL}/api/export`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ profiles }),
       });

       if (!response.ok) {
         throw new Error('Failed to generate export');
       }

       // Handle file download
       const blob = await response.blob();
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.style.display = 'none';
       a.href = url;
       a.download = `influencers_export_${new Date().toISOString().slice(0,10)}.csv`;
       document.body.appendChild(a);
       a.click();
       window.URL.revokeObjectURL(url);
    } catch (error) {
       console.error("Export error:", error);
       alert("Failed to export data. Please ensure the backend is running.");
    } finally {
       setIsExporting(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={isExporting} className="secondary-btn">
      {isExporting ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
      Export to CSV
    </button>
  );
};

export default ExportButton;

import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvReader() {
  const [csvData, setCsvData] = useState([]);
  const [maxX, setMaxX] = useState('');
  const [minX, setMinX] = useState('');
  const [maxY, setMaxY] = useState('');
  const [minY, setMinY] = useState('');
  const [maxZ, setMaxZ] = useState('');
  const [minZ, setMinZ] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);

        // Initialize max and min values
        let maxXValue = -Infinity;
        let minXValue = Infinity;
        let maxYValue = -Infinity;
        let minYValue = Infinity;
        let maxZValue = -Infinity;
        let minZValue = Infinity;

        result.data.forEach((row) => {
          const x = parseFloat(row.X);
          const y = parseFloat(row.Y);
          const z = parseFloat(row.Z);

          if (!isNaN(x)) {
            maxXValue = Math.max(maxXValue, x);
            minXValue = Math.min(minXValue, x);
          }

          if (!isNaN(y)) {
            maxYValue = Math.max(maxYValue, y);
            minYValue = Math.min(minYValue, y);
          }

          if (!isNaN(z)) {
            maxZValue = Math.max(maxZValue, z);
            minZValue = Math.min(minZValue, z);
          }
        });

        setMaxX(maxXValue.toFixed(2));
        setMinX(minXValue.toFixed(2));
        setMaxY(maxYValue.toFixed(2));
        setMinY(minYValue.toFixed(2));
        setMaxZ(maxZValue.toFixed(2));
        setMinZ(minZValue.toFixed(2));
      },
      header: true, // Set this to true if your CSV has a header row
    });
  };

  return (
    <div>
      {/* Step One: File Upload */}
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>

      {/* Step Two: Display Input Values */}
      {csvData.length > 0 && (
        <div>
          <h2>Step Two: Display Input Values</h2>
          <p>max_X: {maxX}</p>
          <p>min_X: {minX}</p>
          <p>max_Y: {maxY}</p>
          <p>min_Y: {minY}</p>
          <p>max_Z: {maxZ}</p>
          <p>min_Z: {minZ}</p>
        </div>
      )}

      {/* Step Three: Display CSV Data */}
      {csvData.length > 0 && (
        <div>
          <h2>Step Three: Display CSV Data</h2>
          <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((header) => (
                  <th key={header} style={{ border: '1px solid #ccc', padding: '8px', background: '#f2f2f2' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CsvReader;

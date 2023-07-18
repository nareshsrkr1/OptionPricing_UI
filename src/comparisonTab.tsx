import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { generateComparisonData, ComparisonData } from './randomData';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Comparison: React.FC = () => {
  const [rowData, setRowData] = useState<ComparisonData[]>([]);

  const handleGenerateResults = () => {
    const generatedData = generateComparisonData();
    setRowData(generatedData);
  };

  const defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };

  const columnDefs: ColDef[] = [
    { field:'id', headerName: 'ID'},
    { field: 'spotPrice', headerName: 'Spot Price' },
    { field: 'strikePrice', headerName: 'Strike Price' },
    { field: 'maturity', headerName: 'Maturity (In Days)' },
    { field: 'riskFreeRate', headerName: 'Risk-Free Interest Rate' },
    { field: 'volatility', headerName: 'Volatility' },
    { field: 'callPriceNN', headerName: 'Call Price by NN' },
    { field: 'callPriceMonteCarlos', headerName: 'Call Price by Monte Carlos' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#3C2A21',
        color: '#ffffff',
        height: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" style={{ marginBottom: '12px', fontWeight: 'bold', marginTop: '12px' }}>
        Evaluating our Trained NN with 1000 OTC Derivatives
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGenerateResults} style={{ marginBottom: '16px', marginTop: '10px' }}>
        Generate Results
      </Button>
      {rowData.length>0 &&
      <div
        className="ag-theme-alpine-dark"
        style={{
          width: '100%',
          height: '100%',
          marginBottom: '36px',
          marginLeft: '66px',
          marginRight: '66px',
          marginTop: '36px'
        }}
      >
        <AgGridReact
          rowData={rowData}
          onGridReady={(params) => params.api?.sizeColumnsToFit()}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
        />
      </div>}
    </div>
  );
};

export default Comparison;

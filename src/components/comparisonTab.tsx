import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'
import { generateComparisonData, ComparisonData } from '../randomData';
import flaskService from '../services/flaskAPIService';
import CircularProgress from '@mui/material/CircularProgress';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { setInterval } from 'timers/promises';

const Comparison: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [runtime, setRunTime] = useState<number>(0);
  const [genData, setGenData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  
  
  useEffect(() => {
    const loadData = async () =>{
      setLoader(true);
      const generatedData = await flaskService.getThousandRecords();
      
      setLoader(false);
      setRowData(generatedData);
      setGenData(generatedData);
    }
    loadData();
  },[])

  const customValueFormatter = (params: any) => {
    if (typeof params.value === 'number') {
      return params.value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return params.value;
  };

  const handleGenerateResults = async () => {
    setLoader(true);
    setRunTime(0);
    const startTime = performance.now();
    
    
    const transformedGendata = {
      records: genData
    }
    console.log("TRANS DATA", transformedGendata);
    const newgeneratedData = await flaskService.predictMultipleRecordsCallPrice(transformedGendata);
    setLoader(false);
    const endTime = performance.now();
    console.log("NEW DATA", newgeneratedData);
    setRunTime(endTime-startTime);

    
    setRowData(newgeneratedData);
  };

  const defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable:true,
    
    filter: true,
    floatingFilter: true
  };

  const columnDefs: ColDef[] = [
   
    { field: 'Spot_Price', headerName: 'Spot Price' , valueFormatter: customValueFormatter },
    { field: 'Strike_Price', headerName: 'Strike Price', valueFormatter: customValueFormatter },
    { field: 'Maturity', headerName: 'Maturity (In Days)' },
    { field: 'risk_free_interest', headerName: 'Risk-Free Interest Rate' },
    { field: 'Volatility', headerName: 'Volatility' },
    { field: 'Call_Premium', headerName: 'Call Price(MC)' , valueFormatter: customValueFormatter },
    { field: 'Option_Value', headerName: 'Call Price by DNN', valueFormatter: customValueFormatter }
    
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
        Generate Call Price by Neural Network
      </Button>
      { runtime>0 && <Box
            sx={{
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              border:  'solid 1px green',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '16px',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <Typography variant="body1" sx={{ color: '#ffffff' }}>
              Generating DNN Results.... Time Taken: {runtime}ms 
            </Typography>
      </Box>}
      { loader &&
      <div style={{
        height: '100vh',
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: '30vh'
       
      }}> 
      <CircularProgress size={100}/>
      </div>
      }
      { !loader &&
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
          animateRows={true}
        />
      </div>}
    </div>
  );
};

export default Comparison;

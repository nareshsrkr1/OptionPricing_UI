import React, { useState } from 'react';
import { Box, Button, Slider, TextField, Typography } from '@mui/material';
import flaskService from '../services/flaskAPIService';

const OptionPricing: React.FC = () => {
  const [spotPrice, setSpotPrice] = useState<string>('');
  const [strikePrice, setStrikePrice] = useState<string>('');
  const [maturity, setMaturity] = useState<string>('');
  const [riskFreeRate, setRiskFreeRate] = useState<number>(0.01);
  const [volatility, setVolatility] = useState<number>(50);
  const [outputModel, setOutputModel] = useState<string>('');
  const [outputError, setOutputError] = useState<string>('');
  const [outputMonteCarlo, setOutputMonteCarlo] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleModelButtonClick = async () => {
    if (!isValidInput()) {
      setOutputError('Error: Please enter valid numerical values for all inputs.');
      setIsError(true);
      return;
    }

    const spotPriceNumber = parseFloat(spotPrice);
    const strikePriceNumber = parseFloat(strikePrice);
    const maturityNumber = parseFloat(maturity);

    // API call and output calculation here 
    const callPremium = await flaskService.predictWithNN({"Spot_Price": spotPriceNumber, "Strike_Price": strikePriceNumber, "Maturity": maturityNumber, "risk_free_interest": riskFreeRate, "Volatility": volatility/100 })
    setOutputModel(`Call Premium calculated by Model: ${callPremium}`);
    setIsError(false);
  };

  const handleMonteCarloButtonClick = async () => {
    if (!isValidInput()) {
      setOutputError('Error: Please enter valid numerical values for all inputs.');
      setIsError(true);
      return;
    }

    const spotPriceNumber = parseFloat(spotPrice);
    const strikePriceNumber = parseFloat(strikePrice);
    const maturityNumber = parseFloat(maturity);

    // API call and output calculation here 
    const callPremium = await flaskService.predictWithMonteCarlos({"Spot_Price": spotPriceNumber, "Strike_Price": strikePriceNumber, "Maturity": maturityNumber, "risk_free_interest": riskFreeRate, "Volatility": volatility/100 })
    setOutputMonteCarlo(`Call Premium calculated by Monte Carlos: ${callPremium}`);
    setIsError(false);
  };

  const isValidInput = () => {
    return (
      spotPrice !== '' &&
      strikePrice !== '' &&
      maturity !== '' &&
      riskFreeRate !== undefined &&
      volatility !== undefined &&
      !isNaN(Number(spotPrice)) &&
      !isNaN(Number(strikePrice)) &&
      !isNaN(Number(maturity)) &&
      !isNaN(Number(riskFreeRate)) &&
      !isNaN(Number(volatility))
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#4F4557',
        color: '#ffffff',
        height: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '8px', marginTop: '18px', fontWeight: 'bold' }}>
        Option Pricing
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '26px' }}>
        Add your inputs and select which method to use for predicting the Call Price
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '42px',
        }}
      >
        <TextField
          label="Spot Price"
          variant="filled"
          value={spotPrice}
          onChange={(e) => setSpotPrice(e.target.value)}
          type="text" // Set the input type to "text"
          sx={{ marginBottom: '16px', width: '300px', border: 'solid 1px white' }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
          InputProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="Strike Price"
          variant="filled"
          value={strikePrice}
          onChange={(e) => setStrikePrice(e.target.value)}
          type="text" // Set the input type to "text"
          sx={{ marginBottom: '16px', width: '300px', border: 'solid 1px white' }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
          InputProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="Maturity (In Days)"
          variant="filled"
          value={maturity}
          onChange={(e) => setMaturity(e.target.value)}
          type="text" // Set the input type to "text"
          sx={{ marginBottom: '16px', width: '300px', border: 'solid 1px white' }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
          InputProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="Risk-Free Interest Rate"
          variant="filled"
          value={riskFreeRate.toString()}
          disabled
          sx={{
            marginBottom: '16px',
            width: '300px',
            border: 'solid 1px white',
          }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
          inputProps={{
            style: { color: '#ffffff', pointerEvents: 'none', WebkitTextFillColor: 'white' },
          }}
        />
        <Box sx={{ width: '300px', marginBottom: '16px' }}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            Volatility (%)
          </Typography>
          <Slider
            value={volatility}
            onChange={(e, value) => setVolatility(value as number)}
            min={0}
            max={100}
            marks
            valueLabelDisplay="on"
            aria-label="Volatility"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Button variant="contained" color="primary" sx={{ marginRight: '16px' }} onClick={handleModelButtonClick}>
            Predict with Model
          </Button>
          <Button variant="contained" color="primary" onClick={handleMonteCarloButtonClick}>
            Predict with Monte Carlos
          </Button>
        </Box>
        {outputError && isError && (
          <Box
            sx={{
              backgroundColor: 'rgba(255, 0, 0, 0.2)' ,
              border: 'solid 1px red' ,
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '16px',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <Typography variant="body1" sx={{ color: '#ffffff' }}>
              {outputError}
            </Typography>
          </Box>
        )}
        {outputModel && !isError &&(
          <Box
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
              {outputModel}
            </Typography>
          </Box>
        )}
        {outputMonteCarlo && !isError &&(
          <Box
            sx={{
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              border: 'solid 1px green',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '16px',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <Typography variant="body1" sx={{ color: '#ffffff' }}>
              {outputMonteCarlo}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OptionPricing;

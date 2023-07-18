import React from 'react';
import { useState } from 'react';
import Comparison from './comparisonTab';
import LandingPage from './LandingPage';
import OptionPricing from './OptionPricing';
import Sidebar from './Sidebar';

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const selectOption = (option:string) => {
    setSelectedOption(option)
  } 

  return (
    <div className="flex">
      <Sidebar onOptionClick={selectOption}/>
      <div className="flex-grow bg-gray-200">
       {selectedOption === 'optionPricing' && <OptionPricing />}
       {selectedOption === 'comparison' && <Comparison />}
       {selectedOption === '' && <LandingPage />}
      </div>
    </div>
  );
};

export default App;
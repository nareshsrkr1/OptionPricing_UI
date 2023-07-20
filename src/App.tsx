import React from 'react';
import { useState } from 'react';
import Comparison from './components/comparisonTab';
import LandingPage from './components/LandingPage';
import OptionPricing from './components/OptionPricing';
import Sidebar from './components/Sidebar';

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
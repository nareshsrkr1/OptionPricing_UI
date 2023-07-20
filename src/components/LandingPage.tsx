import React from 'react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#04293A',
        color: '#ffffff',
        padding: '16px',
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}
      >
        Team Ominor
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ fontSize: '24px' }}
      >
        Derivative Pricing using Deep Neural Networks
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y:50 }}
        animate={{ opacity: 1, y:0}}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ marginTop: '32px' }}
      >
      A Model that predicts European Call Options with an average accuracy of 97%
      </motion.div>
    </div>
  );
};

export default LandingPage;

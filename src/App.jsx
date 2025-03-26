import React from 'react';
import FormBuilder from './components/DynamicForm/FormBuilder';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto"
        >
          <FormBuilder />
        </motion.div>
      </div>
    </div>
  );
}

export default App;


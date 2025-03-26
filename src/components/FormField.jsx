import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ field = {}, formData = {}, handleInputChange = () => {} }) => {
  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const optionClasses = "flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200";

  switch (field.type) {
    case 'time':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <input
            type="time"
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`${inputClasses} cursor-time`}
            required={field.required}
            min={field.min || ''}
            max={field.max || ''}
            step={field.step || '60'} // Default to minutes, use 1 for seconds
          />
          {field.description && (
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          )}
        </motion.div>
      );

    case 'text':
    case 'email':
    case 'number':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <input
            type={field.type}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.label || 'Untitled Field'}
            className={inputClasses}
            required={field.required}
          />
        </motion.div>
      );

    case 'textarea':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.label || 'Untitled Field'}
            className={`${inputClasses} min-h-[100px] resize-y`}
            required={field.required}
            rows={4}
          />
        </motion.div>
      );

    case 'radio':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          {(field.options || []).map((option, idx) => (
            <label key={idx} className={optionClasses}>
              <input
                type="radio"
                name={field.id}
                value={option}
                checked={formData[field.id] === option}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                required={field.required}
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </motion.div>
      );

    case 'checkbox':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          {(field.options || []).map((option, idx) => (
            <label key={idx} className={optionClasses}>
              <input
                type="checkbox"
                value={option}
                checked={(formData[field.id] || []).includes(option)}
                onChange={(e) => {
                  const currentValues = formData[field.id] || [];
                  const newValues = e.target.checked
                    ? [...currentValues, option]
                    : currentValues.filter(v => v !== option);
                  handleInputChange(field.id, newValues);
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                required={field.required}
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </motion.div>
      );

    case 'dropdown':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={inputClasses}
            required={field.required}
          >
            <option value="">Select an option</option>
            {(field.options || []).map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </motion.div>
      );

    case 'date':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <input
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={inputClasses}
            required={field.required}
          />
        </motion.div>
      );

    case 'file':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <div className="flex items-center justify-center w-full">
            {formData[field.id] ? (
              <div className="w-full p-4 bg-white border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">
                        {formData[field.id].name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {(formData[field.id].size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors duration-200"
                    onClick={() => handleInputChange(field.id, null)}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <motion.button
                  type="button"
                  className="mt-3 w-full px-3 py-1.5 text-sm text-zinc-600 bg-zinc-50 hover:bg-zinc-100 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                  onClick={() => document.getElementById(`file-${field.id}`).click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Change file</span>
                </motion.button>
              </div>
            ) : (
              <label 
                htmlFor={`file-${field.id}`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-200 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-all duration-200"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    handleInputChange(field.id, file);
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-zinc-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-zinc-500">Any file up to 10MB</p>
                </div>
              </label>
            )}
            <input
              id={`file-${field.id}`}
              type="file"
              className="hidden"
              onChange={(e) => handleInputChange(field.id, e.target.files[0])}
              required={field.required}
            />
          </div>
        </motion.div>
      );

    case 'rating':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <div className="flex flex-col space-y-4">
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                  <div key={num} className="text-sm text-zinc-600 font-medium">{num}</div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                  <motion.button
                    key={num}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange(field.id, num)}
                    className={`p-1 focus:outline-none transition-colors duration-200 rounded-lg
                      ${formData[field.id] === num ? 'text-blue-500' : 'text-zinc-300 hover:text-zinc-400'}`}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 'section':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-gray-200 pt-4 mt-4"
        >
          <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
          {field.description && <p className="text-gray-600 mb-4">{field.description}</p>}
        </motion.div>
      );
    default:
      return null;
  }
};

export default FormField;

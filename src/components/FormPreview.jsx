import React from 'react';
import FormField from './FormField';
import { motion, AnimatePresence } from 'framer-motion';

const FormPreview = ({
  formTitle,
  formDescription,
  formFields,
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  setShowPreview,
  shouldShowField
}) => {
  const commonProps = (field) => ({
    id: field.id,
    name: field.id,
    onChange: (e) => handleInputChange(field.id, e.target.value),
    required: field.required,
    className: 'w-full p-2 border rounded focus:ring-2 focus:ring-blue-500',
    'aria-describedby': errors[field.id] ? `${field.id}-error` : undefined
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-2xl mx-auto"
    >
      <motion.div 
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setShowPreview(false)}
          className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white rounded-lg border border-zinc-200 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200 flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>←</span>
          <span>Back to Editor</span>
        </motion.button>
      </motion.div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-zinc-100">
        <div className="px-8 py-6 bg-gradient-to-br from-zinc-50 to-white border-b border-zinc-100">
          <motion.h1 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {formTitle}
          </motion.h1>
          {formDescription && (
            <motion.p 
              className="mt-2 text-zinc-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formDescription}
            </motion.p>
          )}
        </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <AnimatePresence>
          {formFields.map((field, index) => 
            shouldShowField(field) && (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg border border-zinc-100 hover:border-zinc-200 transition-all duration-200 space-y-3 shadow-sm hover:shadow-md"
              >
                <label className="block">
                  <span className="text-zinc-800 font-medium flex items-center">
                    {field.label}
                    {field.required && (
                      <motion.span 
                        className="text-red-500 ml-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        *
                      </motion.span>
                    )}
                  </span>
                  {field.description && (
                    <motion.p 
                      className="mt-1 text-sm text-zinc-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {field.description}
                    </motion.p>
                  )}
                </label>
                <FormField
                  field={field}
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  commonProps={commonProps(field)}
                />
                {errors[field.id] && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                    id={`${field.id}-error`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <span>⚠️</span>
                    <span>{errors[field.id]}</span>
                  </motion.p>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>

        <motion.div 
          className="mt-12 flex justify-end space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Form
          </motion.button>
        </motion.div>
      </form>
    </div>
  </motion.div>
  );
};

export default FormPreview;

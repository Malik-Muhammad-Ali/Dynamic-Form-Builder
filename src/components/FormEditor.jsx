import React, { useState } from 'react';
import FormField from './FormField';
import { motion, AnimatePresence } from 'framer-motion';

const FormEditor = ({
  formTitle,
  formDescription,
  formFields,
  selectedField,
  setFormTitle,
  setFormDescription,
  setSelectedField,
  updateField,
  moveField,
  duplicateField,
  deleteField,
  addField,
  setShowPreview,
  fieldTypes,
  formData,
  errors,
  handleInputChange
}) => {
  const [showFieldMenu, setShowFieldMenu] = useState(false);

  // Close field menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showFieldMenu && !e.target.closest('.field-menu')) {
        setShowFieldMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFieldMenu]);
  const commonProps = (field) => ({
    id: field.id,
    name: field.id,
    onChange: (e) => handleInputChange(field.id, e.target.value),
    required: field.required,
    className: 'w-full p-2 border rounded focus:ring-2 focus:ring-blue-500',
    'aria-describedby': errors[field.id] ? `${field.id}-error` : undefined,
    updateField: updateField,
    handleInputChange: handleInputChange
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mx-auto py-8"
      >
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-zinc-900">
              Dynamic Form Builder
            </h1>
            <motion.button
              onClick={() => setShowPreview(true)}
              className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg flex items-center space-x-2 hover:bg-zinc-800"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Preview</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>
          </div>
          <p className="text-zinc-500">Create beautiful forms with ease</p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-zinc-200/80 shadow-sm"
        >
          <motion.div
            className="px-8 pt-8 pb-6 space-y-6 border-b border-zinc-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative group">
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-3xl font-semibold w-full border-b border-zinc-200 focus:border-zinc-900 focus:outline-none py-2 bg-transparent transition-colors duration-200 text-zinc-900 placeholder-zinc-400"
                placeholder="Untitled Form"
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            <div className="relative group">
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full text-zinc-600 border-b border-zinc-200 focus:border-zinc-900 focus:outline-none resize-none bg-transparent transition-colors duration-200 text-base"
                placeholder="Form Description"
                rows={2}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </motion.div>

          {/* Floating Add Question Button */}
          <div className="fixed bottom-8 right-8" style={{ zIndex: 1000 }}>
            <div className="relative" style={{ zIndex: 50 }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFieldMenu(!showFieldMenu)}
                className="w-[200px] px-4 py-2.5 bg-white rounded-lg border border-zinc-200 shadow-lg transition-all duration-300 flex items-center justify-between field-menu hover:border-zinc-900 hover:shadow-xl group"
              >
              <div className="flex items-center space-x-2.5">
                <motion.span
                  className="text-sm bg-zinc-900 rounded p-1.5 text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  ➕
                </motion.span>
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Add question</span>
              </div>
              <motion.span
                className="text-lg text-zinc-400 group-hover:text-zinc-600"
                animate={{ rotate: showFieldMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ⌄
              </motion.span>
              </motion.button>

              <AnimatePresence>
                {showFieldMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 8, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', right: 0, bottom: '100%', marginBottom: '8px', width: '240px', zIndex: 100 }}
                    className="py-1.5 bg-white rounded-lg shadow-xl border border-zinc-200 overflow-hidden divide-y divide-zinc-100"
                >
                  {fieldTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      onClick={() => {
                        addField(type.value);
                        setShowFieldMenu(false);
                      }}
                      className="w-full px-3 py-2 flex items-center space-x-2.5 hover:bg-zinc-50 transition-all duration-200 group"
                      whileHover={{ x: 4 }}
                    >
                      <motion.div
                        className="text-sm bg-zinc-100 rounded p-1.5 text-zinc-600"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="block transform transition-transform">{type.icon}</span>
                      </motion.div>
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-medium group-hover:text-gray-900">{type.label}</span>
                        <span className="text-sm text-gray-500 group-hover:text-gray-600">Add a {type.label.toLowerCase()} field</span>
                      </div>
                    </motion.button>
                  ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 overflow-hidden"
          >
            <motion.div
              layoutId={`field-${field.id}`}
              className={`p-5 bg-white rounded-lg transition-all duration-300 ${selectedField?.id === field.id
                  ? 'ring-2 ring-zinc-900 shadow-sm'
                  : 'border border-zinc-200 hover:border-zinc-300'
                }`}
              onClick={() => setSelectedField(field)}
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="text-xl bg-neutral-100 rounded-lg p-2 text-neutral-600"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="block transform transition-transform">
                        {fieldTypes.find(t => t.value === field.type)?.icon}
                      </span>
                    </motion.div>
                    <div className="relative group flex-1">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="text-base font-medium w-full border-b border-zinc-200 focus:border-zinc-900 focus:outline-none py-2 bg-transparent transition-colors duration-200 text-zinc-900 placeholder-zinc-400"
                        placeholder="Question"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={field.description}
                    onChange={(e) => updateField(field.id, { description: e.target.value })}
                    className="text-sm text-zinc-500 w-full border-none focus:outline-none focus:ring-0 bg-transparent placeholder-zinc-400"
                    placeholder="Description (optional)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); moveField(field.id, 'up'); }}
                      className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors duration-200 relative group"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-zinc-800 text-white text-xs rounded shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap z-50">
                        Move question up
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-800"></div>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); moveField(field.id, 'down'); }}
                      className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors duration-200 relative group"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-zinc-800 text-white text-xs rounded shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap z-50">
                        Move question down
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-800"></div>
                      </div>
                    </motion.button>
                  </div>
                  <div className="w-px h-6 bg-zinc-200 mx-1"></div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); duplicateField(field.id); }}
                    className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors duration-200 group relative"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-zinc-800 text-white text-xs rounded shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap z-50">
                      Duplicate question
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-800"></div>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 group relative"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-zinc-800 text-white text-xs rounded shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap z-50">
                      Delete question
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-800"></div>
                    </div>
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown') && (
                  <div className="space-y-2">
                    {field.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(field.options || [])];
                            newOptions[index] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                          className="flex-1 text-sm text-zinc-600 border-b border-zinc-200 focus:border-zinc-900 focus:outline-none py-1 bg-transparent"
                          placeholder={`Option ${index + 1}`}
                        />
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newOptions = field.options.filter((_, i) => i !== index);
                            updateField(field.id, { options: newOptions });
                          }}
                          className="p-1 text-zinc-400 hover:text-red-500"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                    ))}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newOptions = [...(field.options || []), ''];
                        updateField(field.id, { options: newOptions });
                      }}
                      className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center space-x-1 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add option</span>
                    </motion.button>
                  </div>
                )}

                <FormField field={field} {...commonProps(field)} />
                {errors[field.id] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    id={`${field.id}-error`}
                    className="mt-2 text-sm font-medium bg-red-50 text-red-600 px-3 py-2 rounded-lg border border-red-100"
                  >
                    ⚠️ {errors[field.id]}
                  </motion.p>
                )}
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      className="h-4 w-4 text-zinc-600 focus:ring-zinc-500 rounded transition-all duration-200 cursor-pointer"
                    />
                    <motion.span
                      className="text-sm text-zinc-600 group-hover:text-zinc-900"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Required field
                    </motion.span>
                  </label>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {formFields.length > 0 && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => setShowPreview(true)}
            className="px-6 py-3 bg-neutral-900 text-white text-base font-medium rounded-xl transition-all duration-300 flex items-center space-x-2 hover:bg-neutral-800"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Preview Form</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👀
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default FormEditor;

import React, { useState, useEffect } from 'react';
import FormEditor from '../FormEditor';
import FormPreview from '../FormPreview';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-number-input/style.css';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formResponses, setFormResponses] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [errors, setErrors] = useState({});

  const fieldTypes = [
    { label: 'Short Answer', value: 'text', icon: '✏️' },
    { label: 'Long Answer', value: 'textarea', icon: '📝' },
    { label: 'Multiple Choice', value: 'radio', icon: '⭕' },
    { label: 'Checkboxes', value: 'checkbox', icon: '☑️' },
    { label: 'Dropdown', value: 'dropdown', icon: '▼' },
    { label: 'File Upload', value: 'file', icon: '📎' },
    { label: 'Date', value: 'date', icon: '📅' },
    { label: 'Time', value: 'time', icon: '⏰' },
    { label: 'Email', value: 'email', icon: '📧' },
    { label: 'Number', value: 'number', icon: '🔢' },
    { label: 'Rating', value: 'rating', icon: '⭐' },
  ];

  const defaultValidations = {
    text: { required: false, minLength: 0, maxLength: 1000 },
    textarea: { required: false, minLength: 0, maxLength: 5000 },
    email: { required: false, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
    number: { required: false, min: null, max: null },
    phone: { required: false },
    rating: { required: false, max: 5 }
  };

  useEffect(() => {
    const savedForm = localStorage.getItem('formBuilder');
    if (savedForm) {
      const { title, description, fields } = JSON.parse(savedForm);
      setFormTitle(title);
      setFormDescription(description);
      setFormFields(fields);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formBuilder', JSON.stringify({
      title: formTitle,
      description: formDescription,
      fields: formFields
    }));
  }, [formTitle, formDescription, formFields]);

  useEffect(() => {
    localStorage.setItem('formBuilder', JSON.stringify({
      title: formTitle,
      description: formDescription,
      fields: formFields
    }));
  }, [formTitle, formDescription, formFields]);

  const validateField = (fieldId, value) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const newErrors = { ...errors };
    delete newErrors[fieldId];

    if (field.required && !value) {
      newErrors[fieldId] = 'This field is required';
    } else if (field.validation) {
      const { minLength, maxLength, pattern, min, max } = field.validation;

      if (minLength && value?.length < minLength) {
        newErrors[fieldId] = `Minimum length is ${minLength} characters`;
      }
      if (maxLength && value?.length > maxLength) {
        newErrors[fieldId] = `Maximum length is ${maxLength} characters`;
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        newErrors[fieldId] = 'Invalid format';
      }
      if (min !== null && value < min) {
        newErrors[fieldId] = `Minimum value is ${min}`;
      }
      if (max !== null && value > max) {
        newErrors[fieldId] = `Maximum value is ${max}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (fieldId, value) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    let processedValue = value;
    if (field.type === 'file') {
      processedValue = value;
    } else if (field.type === 'checkbox') {
      processedValue = Array.isArray(value) ? value : [value];
    }

    setFormData({
      ...formData,
      [fieldId]: processedValue
    });
    validateField(fieldId, processedValue);
  };

  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `Untitled ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: '',
      required: false,
      options: type === 'radio' || type === 'checkbox' || type === 'dropdown' ? ['Option 1', 'Option 2', 'Option 3'] : [],
      validation: defaultValidations[type] || {},
      conditions: [],
      section: currentSection,
      order: formFields.length,
      placeholder: `Untitled ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      helperText: ''
    };
    setFormFields([...formFields, newField]);
    setSelectedField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFormFields(formFields.map(field => {
      if (field.id === fieldId) {
        const updatedField = { ...field, ...updates };
        // Ensure options array exists for choice-based fields
        if (['radio', 'checkbox', 'dropdown'].includes(updatedField.type)) {
          updatedField.options = updatedField.options || [];
        }
        return updatedField;
      }
      return field;
    }));
  };

  const deleteField = (fieldId) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const duplicateField = (fieldId) => {
    const field = formFields.find(f => f.id === fieldId);
    if (field) {
      const newField = {
        ...field,
        id: Date.now(),
        label: `${field.label} (Copy)`,
        order: formFields.length
      };
      setFormFields([...formFields, newField]);
    }
  };

  const moveField = (fieldId, direction) => {
    const index = formFields.findIndex(f => f.id === fieldId);
    if (index === -1) return;

    const newFields = [...formFields];
    const field = newFields[index];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newFields.length) {
      newFields.splice(index, 1);
      newFields.splice(newIndex, 0, field);
      setFormFields(newFields);
    }
  };

  const shouldShowField = (field) => {
    if (!field.conditions || field.conditions.length === 0) return true;

    return field.conditions.every(condition => {
      const targetField = formFields.find(f => f.id === condition.targetFieldId);
      if (!targetField) return true;

      const targetValue = formData[condition.targetFieldId];
      switch (condition.operator) {
        case 'equals':
          return targetValue === condition.value;
        case 'notEquals':
          return targetValue !== condition.value;
        case 'contains':
          return targetValue?.includes(condition.value);
        case 'greaterThan':
          return Number(targetValue) > Number(condition.value);
        case 'lessThan':
          return Number(targetValue) < Number(condition.value);
        default:
          return true;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};

    formFields.forEach(field => {
      if (!validateField(field.id, formData[field.id])) {
        formErrors[field.id] = errors[field.id];
      }
    });

    if (Object.keys(formErrors).length === 0) {
      setFormResponses([...formResponses, formData]);
      setFormData({});
      alert('Form submitted successfully!');
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {!showPreview ? (
          <FormEditor
            formTitle={formTitle}
            formDescription={formDescription}
            formFields={formFields}
            selectedField={selectedField}
            setFormTitle={setFormTitle}
            setFormDescription={setFormDescription}
            setSelectedField={setSelectedField}
            updateField={updateField}
            moveField={moveField}
            duplicateField={duplicateField}
            deleteField={deleteField}
            addField={addField}
            setShowPreview={setShowPreview}
            fieldTypes={fieldTypes}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        ) : (
          <FormPreview
            formTitle={formTitle}
            formDescription={formDescription}
            formFields={formFields}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setShowPreview={setShowPreview}
            shouldShowField={shouldShowField}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilder;

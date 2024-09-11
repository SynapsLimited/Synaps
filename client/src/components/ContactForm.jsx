import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import './../css/contact.css'; // Assuming you have a corresponding CSS file for styling

const ContactForm = () => {
  const { t } = useTranslation(); // Import translation hook
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    country: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailData = { ...formData };

    sendFormData(emailData);
  };

  const sendFormData = (data) => {
    const templateParams = {
      name: data.name,
      surname: data.surname,
      country: data.country,
      email: data.email,
      phoneNumber: data.phoneNumber,
      companyName: data.companyName,
      message: data.message
    };

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(t('contactForm.successMessage')); // Use translation for success message
      }, (err) => {
        console.error('FAILED...', err);
        alert(t('contactForm.failureMessage')); // Use translation for failure message
      });
  };

  return (
    <section className="container contact-form-section">
      <form className="container contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder={t('contactForm.namePlaceholder')} // Use translation for placeholder
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder={t('contactForm.surnamePlaceholder')} // Use translation for placeholder
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="country"
            placeholder={t('contactForm.countryPlaceholder')} // Use translation for placeholder
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('contactForm.emailPlaceholder')} // Use translation for placeholder
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phoneNumber"
            placeholder={t('contactForm.phoneNumberPlaceholder')} // Use translation for placeholder
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder={t('contactForm.companyNamePlaceholder')} // Use translation for placeholder
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          placeholder={t('contactForm.messagePlaceholder')} // Use translation for placeholder
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-secondary btn-submit-form">
          {t('contactForm.submitButton')}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;

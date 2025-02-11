// components/ContactForm.tsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import './../css/contact.css'; // Assuming you have a corresponding CSS file for styling
import Modal from './Modal'; // Import the Modal component

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailData = { ...formData };

    sendFormData(emailData);
  };

  const sendFormData = (data: { name: string; surname: string; country: string; email: string; phoneNumber: string; companyName: string; message: string; }) => {
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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT as string,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setModalContent({
          title: t('contactForm.successTitle') || 'Success',
          message: t('contactForm.successMessage'),
          type: 'success'
        });
        setIsModalOpen(true);
        setFormData({
          name: '',
          surname: '',
          country: '',
          email: '',
          phoneNumber: '',
          companyName: '',
          message: ''
        });
      }, (err) => {
        console.error('FAILED...', err);
        setModalContent({
          title: t('contactForm.failureTitle') || 'Error',
          message: t('contactForm.failureMessage'),
          type: 'error'
        });
        setIsModalOpen(true);
      });
  };

  return (
    <section data-aos="fade-up" className="container contact-form-section">
      <form className="container contact-form" onSubmit={handleSubmit}>
        <div className="form-group text-background">
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
        <div className="form-group text-background">
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
        <div className="form-group text-background">
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
          className='text-background'
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

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </section>
  );
};

export default ContactForm;

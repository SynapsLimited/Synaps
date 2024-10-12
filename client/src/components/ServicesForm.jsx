import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next'; // Import translation hook
import './../css/services.css'; // Assuming you have a corresponding CSS file for styling

const services = [
  { id: 1, name: 'Web Design', imgSrc: '/assets/Art for Synaps/Services - Web Design.png' },
  { id: 2, name: 'Social Media', imgSrc: '/assets/Art for Synaps/Services - Social Media.png' },
  { id: 3, name: 'Branding', imgSrc: '/assets/Art for Synaps/Services - Branding.png' },
  { id: 4, name: 'Video', imgSrc: '/assets/Art for Synaps/Services - Video.png' },
  { id: 5, name: 'Advertisement', imgSrc: '/assets/Art for Synaps/Services - Advertisement.png' }
];

const ServicesForm = () => {
  const { t } = useTranslation(); // Initialize translation
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    country: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    message: ''
  });

  const toggleService = (id) => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(serviceId => serviceId !== id)
        : [...prevSelected, id]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedServiceNames = services
      .filter(service => selectedServices.includes(service.id))
      .map(service => service.name)
      .join(', ');

    const emailData = {
      ...formData,
      selectedServices: selectedServiceNames
    };

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
      message: data.message,
      selectedServices: data.selectedServices
    };

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID_SERVICES,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(t('servicesForm.successMessage')); // Translated success message
      }, (err) => {
        console.error('FAILED...', err);
        alert(t('servicesForm.failureMessage')); // Translated failure message
      });
  };

  return (
    <section data-aos="fade-up" className="container services-overview-section">
      <div data-aos="fade-up" className="services-overview-title services-overview-title-select">
        <h1>{t('servicesForm.title')}</h1> {/* Translated form title */}
        <p>{t('servicesForm.description')}</p> {/* Translated form description */}
      </div>
      <div className="container services-overview-blobs">
        {services.map(service => (
          <div
            key={service.id}
            className={`service-overview-blob-art ${selectedServices.includes(service.id) ? 'selected' : ''}`}
            onClick={() => toggleService(service.id)}
          >
            <img src={service.imgSrc} alt={service.name} />
            <span>{t(`services.${service.name}`)}</span> {/* Translated service names */}
          </div>
        ))}
      </div>
      <form data-aos="fade-up" className="container services-form" onSubmit={handleSubmit}>
        <div data-aos="fade-up" className="form-group">
          <input
            type="text"
            name="name"
            placeholder={t('servicesForm.namePlaceholder')} // Translated placeholder
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder={t('servicesForm.surnamePlaceholder')} // Translated placeholder
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div data-aos="fade-up" className="form-group">
          <input
            type="text"
            name="country"
            placeholder={t('servicesForm.countryPlaceholder')} // Translated placeholder
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('servicesForm.emailPlaceholder')} // Translated placeholder
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div data-aos="fade-up" className="form-group">
          <input
            type="text"
            name="phoneNumber"
            placeholder={t('servicesForm.phonePlaceholder')} // Translated placeholder
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder={t('servicesForm.companyPlaceholder')} // Translated placeholder
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          placeholder={t('servicesForm.messagePlaceholder')} // Translated placeholder
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-secondary btn-submit-form">
          {t('servicesForm.submitButton')} {/* Translated submit button */}
        </button>
      </form>
    </section>
  );
};

export default ServicesForm;

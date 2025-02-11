// components/ServicesForm.tsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next'; // Import translation hook
import './../css/services.css'; // Assuming you have a corresponding CSS file for styling
import Modal from './Modal'; // Import the Modal component

const services = [
  { id: 1, name: 'Web Design', imgSrc: '/assets/Art for Synaps/Services - Web Design.png' },
  { id: 2, name: 'AppDesign', imgSrc: '/assets/Art for Synaps/Phone - Homepage.png' },
  { id: 3, name: 'Social Media', imgSrc: '/assets/Art for Synaps/Services - Social Media.png' },
  { id: 4, name: 'Branding', imgSrc: '/assets/Art for Synaps/Services - Branding.png' },
  { id: 5, name: 'Video', imgSrc: '/assets/Art for Synaps/Services - Video.png' },
  { id: 6, name: 'Advertisement', imgSrc: '/assets/Art for Synaps/Services - Advertisement.png' }
];

const ServicesForm = () => {
  const { t } = useTranslation(); // Initialize translation
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
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

  const toggleService = (id: number) => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(serviceId => serviceId !== id)
        : [...prevSelected, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const sendFormData = (data: { [key: string]: string }) => {
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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_SERVICES as string,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setModalContent({
          title: t('servicesForm.successTitle') || 'Success',
          message: t('servicesForm.successMessage'),
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
        setSelectedServices([]); // Reset selected services
      }, (err) => {
        console.error('FAILED...', err);
        setModalContent({
          title: t('servicesForm.failureTitle') || 'Error',
          message: t('servicesForm.failureMessage'),
          type: 'error'
        });
        setIsModalOpen(true);
      });
  };

  return (
    <section data-aos="fade-up" className="container services-overview-section">
      <div className="services-overview-title services-overview-title-select">
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
      <form className="container services-form" onSubmit={handleSubmit}>
        <div className="form-group text-background">
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
        <div className="form-group text-background">
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
        <div className="form-group text-background">
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
          className='text-background'
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

export default ServicesForm;

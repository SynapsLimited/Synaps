// types/service.ts
export interface Service {
  id: number;
  name: {
    en: string;
    fr: string;
    de: string;
  };
  description: {
    en: string;
    fr: string;
    de: string;
  };
  baseFeatures: {
    en: string[];
    fr: string[];
    de: string[];
  };
  deliveryDays: number;
  pages: {
    en: string;
    fr: string;
    de: string;
  };
  revisions: {
    en: string;
    fr: string;
    de: string;
  };
}
// service-cards.tsx
"use client";

import { Button } from "@/components/ui/button";
import type { Service } from "@/types/service";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ServiceCardsProps {
  services: Service[];
}

export default function ServiceCards({ services }: ServiceCardsProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "fr" | "de";

  const gridClass = cn(
    "grid gap-6",
    services.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : services.length === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  );

  return (
    <div className={gridClass}>
      {services.map((service: Service, index: number) => {
        const features = service.baseFeatures[currentLang];

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-75 group-hover:opacity-100 group-hover:blur-sm transition duration-1000 group-hover:duration-200 animate-glow"></div>
            <div className="relative flex flex-col h-full bg-background-transparent-post backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800">
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{service.name[currentLang]}</h3>
                <p className="text-gray-300 mb-4">{service.description[currentLang]}</p>
                <Link href="https://wa.me/message/SU2TIHKYORJHH1" className="btn btn-secondary mb-6">
                  {t("service.getInTouch")}
                </Link>
                <div className="space-y-4">
                  {features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-background">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-200">{feature}</p>
                      </div>
                    </div>
                  ))}
                  {service.deliveryDays > 0 ? (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-background">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-200">
                          {t("service.deliveryDays", { days: service.deliveryDays })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-background">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-200">{t("service.basedOnProject")}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-background">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-200">{service.pages[currentLang]}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-background">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-200">{service.revisions[currentLang]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
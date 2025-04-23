import React from "react";

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  ctaText: string;
  isMostPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Sécurité Essentielle",
    price: "30,000 DA",
    frequency: "/ mois",
    description: "Protection essentielle pour individus et petites équipes.",
    features: [
      "Scan de vulnérabilités basique (1/mois)",
      "Filtre de sécurité Email",
      "Support Standard",
      "Jusqu'à 5 actifs surveillés",
      "Rapport de sécurité mensuel",
    ],
    ctaText: "Choisir Starter",
  },
  {
    id: 2,
    name: "Business Pro",
    price: "80,000 DA",
    frequency: "/ mois",
    description:
      "Sécurité complète pour entreprises en croissance nécessitant une défense robuste.",
    features: [
      "Évaluation de vulnérabilités avancée (Hebdo)",
      "Mise en place Programme Bug Bounty (assisté)",
      "Réponse à Incident (basique)",
      "Jusqu'à 25 actifs surveillés",
      "Support Prioritaire (Email & Chat)",
      "Tableaux de bord sécurité personnalisables",
      "Flux d'informations sur les menaces",
    ],
    ctaText: "Choisir Pro",
    isMostPopular: true,
  },
  {
    id: 3,
    name: "Bouclier Entreprise",
    price: "Sur Devis",
    frequency: "",
    description: "Solutions de sécurité sur mesure pour grandes organisations.",
    features: [
      "Gestion continue des vulnérabilités",
      "Programme Bug Bounty entièrement géré",
      "Réponse à Incident Avancée & Forensics",
      "Actifs surveillés illimités",
      "Conseiller Sécurité Dédié",
      "Support Premium 24/7 (Téléphone, Chat, Email)",
      "Rapports de conformité (SOC 2, ISO 27001)",
      "Accès API & Intégrations",
    ],
    ctaText: "Contacter Ventes",
  },
];

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-gradient-to-b from-[#111111] to-[#080808]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-base text-[#0ACF83] font-semibold tracking-wide uppercase">
            Tarification Simple et Transparente
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
            Choisissez Votre Plan de Sécurité
          </p>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Sélectionnez le plan qui correspond à vos besoins. Pas de frais
            cachés.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`
                flex flex-col
                rounded-[30px]
                bg-[rgba(38,45,42,0.50)]
                p-8
                shadow-lg
                transition-transform duration-300 ease-in-out
                hover:scale-[1.03]
                relative
                ${
                  plan.isMostPopular
                    ? "border-2 border-[#0ACF83]"
                    : "border border-white/50"
                }
              `}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-[#0ACF83] text-gray-900 shadow-md">
                    Populaire
                  </span>
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6 text-sm">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl lg:text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className="text-lg font-medium text-gray-400">
                      {plan.frequency}
                    </span>
                  )}
                  {plan.price === "Sur Devis" && (
                    <span className="block text-lg font-medium text-gray-400 mt-1">
                      Adapté à vos besoins
                    </span>
                  )}
                </div>
                <ul className="space-y-3 text-gray-300 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-[#0ACF83] mr-2 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

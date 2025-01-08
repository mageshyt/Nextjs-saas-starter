import { Computer, Handshake, LucideIcon, Network } from 'lucide-react';
import FeaturesOrbitCircle from './tech-stack';

const features = [
  {
    name: 'Accelerate development.',
    description: 'Get up and running in no time with pre-configured settings and best practices.',
    icon: Computer,
  },
  {
    name: 'Focus on what matters.',
    description: 'Prioritize solving real business challenges, not tedious setups.',
    icon: Handshake,
  },
  {
    name: 'Ready for scale.',
    description: 'Prepare for growth from day one with built-in optimizations.',
    icon: Network,
  },
];

interface FeatureItemProps {
  name: string;
  description: string;
  icon: LucideIcon;
}

const FeatureItem = ({ name, description, icon: Icon }: FeatureItemProps) => (
  <div className="relative pl-9">
    <dt className="inline font-semibold dark:text-gray-100  mr-1 text-gray-900">
      <Icon className="absolute left-1 top-1 h-5 w-5" aria-hidden="true" />
      {name}
    </dt>
    <dd className="inline dark:text-gray-400">{description}</dd>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">

            {/* Left Column: Textual content */}
            <div className="lg:max-w-lg">
              {/* Title */}
              <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold tracking-tight dark:text-white text-gray-900">
                Next.js Starter Kit: A faster way to production
              </p>

              {/* Description */}
              <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                Accelerate your development with this powerful Next.js Starter Kit.{' '}
              </p>

              {/* Features */}
              <dl className="mt-10 max-w-xl space-y-8 leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <FeatureItem
                    key={feature.name}
                    name={feature.name}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </dl>
            </div>
          </div>
          <FeaturesOrbitCircle />
        </div>
      </div>
    </section>
  );
};

export default Features;

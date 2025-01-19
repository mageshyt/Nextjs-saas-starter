import Image from 'next/image';
import Link from 'next/link';
import { DiscordLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import logo from '@/public/logo.svg';

const footerNavs = [
  {
    label: 'Product',
    items: [
      { href: '/', name: 'Email Collection' },
      { href: '/', name: 'Pricing' },
      { href: '/', name: 'FAQ' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/', name: 'Discord' },
      { href: '/', name: 'Twitter' },
      { href: 'mailto:test@domain.com', name: 'Email' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { href: '/terms', name: 'Terms' },
      { href: '/privacy', name: 'Privacy' },
    ],
  },
];

const footerSocials = [
  { href: '', name: 'Discord', icon: <DiscordLogoIcon className="h-4 w-4" /> },
  { href: '', name: 'Twitter', icon: <TwitterLogoIcon className="h-4 w-4" /> },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
          {/* Logo and Description */}
          <div className="mb-12 flex-col flex gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                className="h-8 w-8 text-primary"
                width={32}
                height={32}
                alt="Logo"
              />
              <span className="self-center text-2xl ml-2 font-semibold whitespace-nowrap dark:text-white">
                Next.js Starter
              </span>
            </Link>
            <p className="max-w-xs">All-in-one platform for startups.</p>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-3">
            {footerNavs.map((nav) => (
              <FooterNavSection key={nav.label} label={nav.label} items={nav.items} />
            ))}
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border-neutral-700/20 py-4 px-8 gap-2">
          <FooterSocialLinks />
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {currentYear}{' '}
            <Link href="/" className="cursor-pointer">
              Next.js Starter
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}



interface FooterNavSectionProps {
  label: string;
  items: { href: string; name: string }[];
}

const FooterNavSection = ({ label, items }:FooterNavSectionProps) => (
  <div>
    <h2 className="mb-6 text-sm tracking-tighter font-medium text-gray-900 uppercase dark:text-white">
      {label}
    </h2>
    <ul className="gap-2 grid">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="cursor-pointer text-gray-400 hover:text-gray-200 duration-200 font-[450] text-sm"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const FooterSocialLinks = () => (
  <div className="flex space-x-5">
    {footerSocials.map((social) => (
      <Link
        key={social.name}
        href={social.href}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-600 fill-gray-500 hover:fill-gray-900 dark:hover:fill-gray-600"
      >
        {social.icon}
        <span className="sr-only">{social.name}</span>
      </Link>
    ))}
  </div>
);
export default Footer;

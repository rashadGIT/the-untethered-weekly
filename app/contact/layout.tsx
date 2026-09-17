export const metadata = {
  title: 'Contact | Shannon Muruli',
  description: 'Get in touch with Shannon Muruli. Questions about coaching, speaking, or FEARX? Reach out here.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://shannonmuruli.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

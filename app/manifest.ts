import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shannon Muruli | Courage Coach to Women Who Sell',
    short_name: 'Shannon Muruli',
    description: 'Untether from your comfort zone. Serve more. Sell more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161317',
    theme_color: '#a08216',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

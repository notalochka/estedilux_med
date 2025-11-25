import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';
import '../styles/variables.css';
import '../styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={montserrat.className}>
      <Component {...pageProps} key={router.asPath} />
    </div>
  );
}


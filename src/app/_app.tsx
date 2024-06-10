import type { AppProps } from 'next/app';
import './globals.css';

let userId: number | null = null;

export function setUserId(id: number) {
  userId = id;
}

export function getUserId() {
  return userId;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

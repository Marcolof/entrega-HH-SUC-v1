import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Entrega HH SUC — Centro del proyecto',
  description: 'Hub y prototipo funcional de entrega de piezas en sucursal.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}

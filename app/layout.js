import './globals.css';

export const metadata = {
  title: 'Velnox® - Digital Experiences That Move Brands Forward',
  description:
    'Velnox is a digital agency crafting websites, brands and products with precision. Design, development, e-commerce and growth - under one roof.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

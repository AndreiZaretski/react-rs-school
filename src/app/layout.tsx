import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React-Next',
  description: 'App is work',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

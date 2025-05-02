import '@/styles/globals.css';
import { Inter, Roboto_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Bhavesh Pabnani | Portfolio',
  description: 'Full Stack Developer, Data Scientist, and Machine Learning Engineer',
  keywords: ['Full Stack Developer', 'Machine Learning', 'Data Analytics', 'IIT Kharagpur'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>
        <div id="cursor" className="cursor hidden md:block"></div>
        <div id="cursor-follower" className="cursor-follower hidden md:block"></div>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const cursor = document.getElementById('cursor');
                const cursorFollower = document.getElementById('cursor-follower');
                
                document.addEventListener('mousemove', (e) => {
                  cursor.style.left = e.clientX + 'px';
                  cursor.style.top = e.clientY + 'px';
                  
                  setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                  }, 100);
                });
                
                document.querySelectorAll('a, button').forEach(item => {
                  item.addEventListener('mouseenter', () => {
                    cursor.classList.add('scale-150');
                    cursorFollower.classList.add('scale-0');
                  });
                  
                  item.addEventListener('mouseleave', () => {
                    cursor.classList.remove('scale-150');
                    cursorFollower.classList.remove('scale-0');
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
} 
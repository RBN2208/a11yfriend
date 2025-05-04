import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { MobileMenu } from '@/components/common/header/MobileMenu';
import { Sheet } from '@/components/ui/sheet';
import { createClient } from '@/utils/supabase/server';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: "A11y Friend",
  description: "Seemingly easy accessibility audits for the web.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="dark"
          enableColorScheme
          attribute="class"
          disableTransitionOnChange
        >
          <Sheet>
            <MobileMenu user={user} />
            <Header user={user} />
            {children}
            <Footer />
          </Sheet>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

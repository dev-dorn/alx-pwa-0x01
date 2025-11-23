import { memo, type FC, type ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ComponentProps } from '@/interfaces';
const Layouts: FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default memo(Layouts);
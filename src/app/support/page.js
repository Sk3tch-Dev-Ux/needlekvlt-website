import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SupportClient from './support-client';

export const metadata = {
  title: 'Support — NeedleKVLT',
  description: 'FAQ, shipping information, and customer support.',
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <SupportClient />
      <Footer />
      <CartDrawer />
    </>
  );
}

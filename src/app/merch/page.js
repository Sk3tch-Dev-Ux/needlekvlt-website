import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MerchClient from './merch-client';

export const metadata = {
  title: 'Shop — NeedleKVLT',
  description: 'Premium tattoo supplies, brutal merch, needles, ink, jewelry, and aftercare.',
};

export default function MerchPage() {
  return (
    <>
      <Navbar />
      <MerchClient />
      <Footer />
      <CartDrawer />
    </>
  );
}

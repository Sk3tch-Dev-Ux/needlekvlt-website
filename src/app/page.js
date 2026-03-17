import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HomeClient from './home-client';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeClient />
      <Footer />
      <CartDrawer />
    </>
  );
}

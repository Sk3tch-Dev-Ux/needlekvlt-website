import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CoursesClient from './courses-client';

export const metadata = {
  title: 'Courses & Training — NeedleKVLT',
  description: 'Exclusive video content from professional instructors. Members only.',
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <CoursesClient />
      <Footer />
      <CartDrawer />
    </>
  );
}

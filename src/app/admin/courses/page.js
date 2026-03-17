import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminCoursesClient from './admin-courses-client';

export const metadata = {
  title: 'Admin — Manage Courses — NeedleKVLT',
};

export default function AdminCoursesPage() {
  return (
    <>
      <Navbar />
      <AdminCoursesClient />
      <Footer />
    </>
  );
}

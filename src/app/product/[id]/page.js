import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductDetailClient from './product-detail-client';
import { getProduct, products } from '@/lib/products';

export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const product = getProduct(params.id);
  if (!product) return {};
  return {
    title: `${product.name} — NeedleKVLT`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} related={related} />
      <Footer />
      <CartDrawer />
    </>
  );
}

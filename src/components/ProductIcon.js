'use client';

import {
  Wrench, Shirt, Briefcase, Droplets, Syringe,
  Gem, FlaskConical, Tag,
} from 'lucide-react';

const ICONS = {
  'Tools': Wrench,
  'Apparel': Shirt,
  'Accessories': Briefcase,
  'Ink': Droplets,
  'Needles': Syringe,
  'Jewelry': Gem,
  'Aftercare': FlaskConical,
};

export default function ProductIcon({ category, size = 28, color = '#c8ff00', className = '' }) {
  const IconComp = ICONS[category] || Tag;
  return <IconComp size={size} color={color} strokeWidth={1.5} className={className} />;
}

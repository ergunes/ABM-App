import { LucideIcon } from 'lucide-react';

export type Language = 'tr' | 'en' | 'de';

export interface Principle {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  colorTheme: ColorTheme;
}

export interface ColorTheme {
  bg: string;
  border: string;
  text: string;
  iconBg: string;
  hover: string;
}

export interface GeneratedExperience {
  title: string;
  content: string;
  duration: string;
}
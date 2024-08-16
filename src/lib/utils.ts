import { ClassValue } from 'class-variance-authority/types';
import clsx from 'clsx';
import { createHash } from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colorFromStringHash(str: string, lightness: number, saturation = 80): string {
  const hash = createHash('sha256').update(str).digest('hex');
  const intHash = parseInt(hash.substring(0, 8), 16);
  const hue = intHash % 360;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

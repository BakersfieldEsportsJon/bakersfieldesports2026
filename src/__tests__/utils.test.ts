import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge multiple class strings', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('should handle conditional classes via clsx-style objects', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base-class', {
      'active-class': isActive,
      'disabled-class': isDisabled,
    });
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
    expect(result).not.toContain('disabled-class');
  });

  it('should deduplicate conflicting Tailwind classes (last wins)', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6');
    expect(result).not.toContain('px-4');
  });

  it('should handle undefined and null values gracefully', () => {
    const result = cn('text-sm', undefined, null, 'font-bold');
    expect(result).toContain('text-sm');
    expect(result).toContain('font-bold');
  });

  it('should handle empty string inputs', () => {
    const result = cn('', 'text-lg', '');
    expect(result).toBe('text-lg');
  });

  it('should merge conflicting Tailwind color utilities', () => {
    const result = cn('text-red-500', 'text-blue-700');
    expect(result).toBe('text-blue-700');
    expect(result).not.toContain('text-red-500');
  });

  it('should handle array inputs', () => {
    const result = cn(['p-2', 'mt-4']);
    expect(result).toContain('p-2');
    expect(result).toContain('mt-4');
  });

  it('should return an empty string when called with no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should correctly merge complex Tailwind class combinations', () => {
    const result = cn(
      'flex items-center',
      'justify-between',
      'p-4 md:p-8',
      { 'bg-white': true, 'bg-black': false }
    );
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).toContain('justify-between');
    expect(result).toContain('p-4');
    expect(result).toContain('md:p-8');
    expect(result).toContain('bg-white');
    expect(result).not.toContain('bg-black');
  });
});

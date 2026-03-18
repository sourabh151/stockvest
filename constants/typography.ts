const size = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 36,
};

const weight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const typography = {
  size,
  weight,
};

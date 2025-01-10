export const formatCurrency = (amount: number, currency: 'EGP' | 'SAR') => {
  const formatter = new Intl.NumberFormat(currency === 'EGP' ? 'ar-EG' : 'ar-SA', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount);
};
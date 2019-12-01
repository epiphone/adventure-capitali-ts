const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000) {
    return currencyFormatter.format(amount / 1_000_000) + 'M'
  }
  return currencyFormatter.format(amount)
}

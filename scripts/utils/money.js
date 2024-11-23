function formatMoneyAmount(value) {
  return (Math.round(value) / 100).toFixed(2) 
}

export {formatMoneyAmount} // Only 1 default export may exist
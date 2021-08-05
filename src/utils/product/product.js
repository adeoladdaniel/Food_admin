export const getProductTotal = (item) => item.reduce((a, b) => a + b.qty * b.price, 0);

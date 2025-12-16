import { _mock } from './_mock';

export const _ecommerceLatestProducts = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    name: _mock.productName(index),
    date: _mock.number.date(index),
    price: _mock.number.price(index),
    colors,
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _bankingCreditCard = [
  {
    title: 'پرداخت 4 قسطه',
    id: _mock.id(2),
    balance: 8182000,
    cardType: 'ریال',
    cardValid: '1404/09/01',
  },
  {
    title: 'پرداخت آخر ماه',
    id: _mock.id(3),
    balance: 4320000,
    cardType: 'ریال',
    cardValid: '1404/07/01',
  },
  {
    title: 'پرداخت 12 قسطه',
    id: _mock.id(4),
    balance: 2150000,
    cardType: 'ریال',
    cardValid: '1404/10/01',
  },
];

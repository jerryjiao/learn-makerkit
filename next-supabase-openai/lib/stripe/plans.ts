const plans = [
  {
    name: 'Basic',
    description: 'A basic plan for everyone',
    features: [`Enjoy up to 500,000 tokens per month`, `Email Support`],
    trialPeriodDays: 7,
    prices: [
      {
        id: 'price_1Nza9oHl6YvdMUW5kogDvkte',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 9.99,
      },
      {
        id: 'price_1Nza9pHl6YvdMUW5yIjhqvo1',
        name: 'Yearly',
        description: 'A yearly plan',
        price: 99.99,
      },
    ],
  },
  {
    name: 'Pro',
    description: 'A pro plan for ambitious writers',
    features: [`Enjoy up to 3 million tokens per month`, `Chat Support`],
    trialPeriodDays: 14,
    prices: [
      {
        id: 'price_1NzaGeHl6YvdMUW52JZNme8n',
        name: 'Monthly',
        description: 'A monthly plan',
        price: 29.99,
      },
      {
        id: 'price_1NzaGeHl6YvdMUW5wW9laDNN',
        name: 'Yearly',
        description: 'A yearly plan',
        price: 299.99,
      },
    ],
  },
];
 
export default plans;
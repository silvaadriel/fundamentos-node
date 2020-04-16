import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce<number>(
      (previousSum, currentTransaction) =>
        currentTransaction.type === 'income'
          ? previousSum + currentTransaction.value
          : previousSum,
      0,
    );

    const outcomeSum = this.transactions.reduce<number>(
      (previousSum, currentTransaction) =>
        currentTransaction.type === 'outcome'
          ? previousSum + currentTransaction.value
          : previousSum,
      0,
    );

    const total = incomeSum - outcomeSum;

    const balance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

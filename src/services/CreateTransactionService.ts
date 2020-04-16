import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: TransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > total) {
      throw Error('Value greater than the total value in the account.');
    }

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;

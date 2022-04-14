import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;
}

interface TransactionProviderProps {
    children: ReactNode,
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

 type TransactionInput = Omit<Transaction, 'id' | 'createAt'>; //"EXCLUIR" props que estão no Transaction

// type TransactionInput = Pick<Transaction, 'title' | 'amount' |  'type' | 'category'>; //pegar props que estão no Transaction

 const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
     const response = await api.post('/transaction', {
         ...transactionInput,
         createAt: new Date(),
     })
     const { transaction } = response.data

     setTransactions([
         ...transactions, transaction,
     ])
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
          {children}  
        </TransactionContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionContext)

    return context;
}
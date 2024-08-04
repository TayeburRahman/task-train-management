const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema( {
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: [true, "Transactions type is required, it should be 'credit' or 'debit'"],
    },
    amount: {
        type: Number,
        required: [true, "Transactions amount is required"],
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
});

const walletModels = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User ID is required"],
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [TransactionSchema],
}, { timestamps: true });

module.exports = mongoose.model('wallet', walletModels);

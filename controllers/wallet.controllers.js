 
const walletModels = require("../models/wallet.models");
const { handleValidationError } = require("../utils/errorHandler");

const addWallet = async (req, res) => {
    try {
        const { amount, description, type} = req.body;
        const {userId} = req.params; 
    
        if (amount <= 0) {
          return res.status(400).json({ error: 'Amount must be greater than zero.' });
        }
    
        let wallet = await walletModels.findOne({ user: userId });
        if (!wallet) {
          wallet = new walletModels({ user: userId });
        }
    
        wallet.balance += amount;
        wallet.transactions.push({ type , amount, description });
    
        await wallet.save();
    
        res.status(200).json({
             balance: wallet.balance, 
             transactions: wallet.transactions 
            });
      } catch (error) { 
        handleValidationError(error, res);
      }
  };
 
  const getUserTransactions = async (req, res) => {
    try {
        const {userId} = req.params;
    
        const wallet = await walletModels.findOne({ user: userId });
        if (!wallet) {
          return res.status(404).json({ error: 'Wallet not found.' });
        }
     
        res.status(200).json({
             balance: wallet.balance, 
             transactions: wallet.transactions
             });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
      }
  };


  module.exports = {
    addWallet, 
    getUserTransactions
  };
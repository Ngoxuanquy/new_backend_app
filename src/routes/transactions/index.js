
const express = require('express');
const asyncHandler = require('../../helpers/asyncHandle');
const TransactionsControllers = require('../../controllers/transactions.controllers')
const { authentication, authenticationV2 } = require('../../auth/authUtils')

const router = express.Router();


// authentication

// router.use(authenticationV2)

router.post('/create', asyncHandler(TransactionsControllers.createTransactions))
router.post('/update', asyncHandler(TransactionsControllers.updateTransaction))
router.post('/get', asyncHandler(TransactionsControllers.getTransaction))
router.post('/getbyconcactid/:id', asyncHandler(TransactionsControllers.getTransactionByConcactId))




module.exports = router
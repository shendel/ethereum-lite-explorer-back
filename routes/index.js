const express = require('express')
const router = express.Router()

const controller = require('../controllers')

router.get('/', controller.root)
router.post('/dbChartData', controller.dbChartData)
router.get('/dbFromAddress', controller.dbFromAddress)
router.get('/dbToAddress', controller.dbToAddress)
router.get('/dbTotalTxsNum', controller.dbTotalTxsNum)

router.get('/dbLatestBlockData', controller.dbLatestBlockData)
router.get('/dbAllBlocks', controller.dbAllBlocks)
router.get('/dbLatestTxs', controller.dbLatestTxs)
router.get('/dbAllTxs', controller.dbAllTxs)

router.post('/dbBlockDetails', controller.dbBlockDetails)
router.post('/dbBlockTxs', controller.dbBlockTxs)
router.post('/dbTxDetails', controller.dbTxDetails)
router.post('/dbAddressTxs', controller.dbAddressTxs)
router.post('/dbAddressTxsNum', controller.dbAddressTxsNum)
router.post('/dbAddressCheck', controller.dbAddressCheck)
router.post('/dbInputDataDecode', controller.dbInputDataDecode)

router.get('/chartAllTxsByDate', controller.chartAllTxsByDate)
router.get('/chartMonthlyTxsByDate', controller.chartMonthlyTxsByDate)
router.get('/chartWeeklyTxsByDate', controller.chartWeeklyTxsByDate)

module.exports = router

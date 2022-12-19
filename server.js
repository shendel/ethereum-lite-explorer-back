const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRoute = require('./routes')
const rateLimit = require("express-rate-limit"); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-rate-limit
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute interval
    max: 600 * 6, // maximum number of calls during windowMs
    handler(req, res) { // Callback function when limit is exceeded
        res.status(this.statusCode).json({
            code: this.statusCode, // statusCode default is 429
            message: 'Too Many Reqeust..',
        });
    },
});

// basic router
app.use('/', limiter, indexRoute) 

// top of main page
app.use('/dbChartData', limiter, indexRoute)
app.use('/dbFromAddress', limiter, indexRoute)
app.use('/dbToAddress', limiter, indexRoute)
app.use('/dbTotalTxsNum', limiter, indexRoute)

// bottom of main page
app.use('/dbLatestBlockData', limiter, indexRoute)
app.use('/dbAllBlocks', limiter, indexRoute)
app.use('/dbLatestTxs', limiter, indexRoute)
app.use('/dbAllTxs', limiter, indexRoute)

// detail page
app.use('/dbBlockDetails', limiter, indexRoute)
app.use('/dbBlockTxs', limiter, indexRoute)
app.use('/dbTxDetails', limiter, indexRoute)
app.use('/dbAddressTxs', limiter, indexRoute)
app.use('/dbAddressTxsNum', limiter, indexRoute)
app.use('/dbAddressCheck', limiter, indexRoute)
app.use('/dbInputDataDecode', limiter, indexRoute)

// chart data
app.use('/chartAllTxsByDate', limiter, indexRoute)
app.use('/chartMonthlyTxsByDate', limiter, indexRoute)
app.use('/chartWeeklyTxsByDate', limiter, indexRoute)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

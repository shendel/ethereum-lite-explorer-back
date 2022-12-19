const axios = require("axios");
const abiDecoder = require('abi-decoder');
const moment = require('moment');
const { db, api_probit } = require("../config");

// ===== basic controller =====
const root = async(req, res) => {
    try {
        res.json("Hello Server");
    } catch (error) {
        console.error(error);
    }
}

// ===== main page data =====
const tokenData = async(req, res) => {
    try {
        const datas = await axios.get(api_probit);
        res.json(datas.data);
    } catch (error) {
        console.error(error);
    }
}

const dbChartData = async(req, res) => {
    try {
        const date = req.body.date;

        const getChartData = "SELECT * FROM transaction_data WHERE LOCATE( ? , time_stamp) > 0 ;";
        db.query(getChartData, [date], (err, result) => {
            //console.log(result)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbFromAddress = async(req, res) => {
    try {
        const dbFromAddress = "SELECT DISTINCT fromAddress FROM transaction_data;";
        db.query(dbFromAddress, (err, result) => {
            //console.log(result)
            //console.log(err)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbToAddress = async(req, res) => {
    try { 
        const dbToAddress = "SELECT DISTINCT toAddress FROM transaction_data;";
        db.query(dbToAddress, (err, result) => {
            //console.log(result)
            //console.log(err)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbTotalTxsNum = async(req, res) => {
    try {
        const dbTotalTxsNum = "SELECT COUNT(*) AS result FROM transaction_data;";
        db.query(dbTotalTxsNum, (err, result) => {
            //console.log(result)
            //console.log(err)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbLatestBlockData = async(req, res) => {
    try {
        const dbLatestBlockData = "SELECT * FROM block_data ORDER BY blocknumber DESC LIMIT 10;";
        db.query(dbLatestBlockData, (err, result) => {
            //console.log(err)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};


const dbAllBlocks = async(req, res) => {
    try { 
        const dbAllBlocks = "SELECT MAX(blocknumber) AS max_number FROM block_data;"
        db.query(dbAllBlocks, (err, result) => {

            if(!req.query.page){
                const firstPageBlock = "SELECT * FROM block_data ORDER BY blocknumber DESC LIMIT 50;";
                db.query(firstPageBlock, (err, result) => {
                    res.json(result)
                })
            } else {
                let string = JSON.stringify(result)
                let parse = JSON.parse(string)

                let allBlocks = parse[0].max_number
                let countPerPage = Number(req.query.number) 
                let pageNo = req.query.page
            
                let startIndex = allBlocks - (countPerPage * (pageNo - 1)) - countPerPage + 1
                let endIndex = allBlocks - (countPerPage * (pageNo - 1)) 

                console.log("전체블록", allBlocks)
                console.log(countPerPage, "개씩 총 페이지 수", Math.ceil(allBlocks / countPerPage))
                
                console.log("startIndex", startIndex)
                console.log("endIndex", endIndex)

                const pageBlock = "SELECT * FROM block_data WHERE blocknumber BETWEEN ? and ?;"
                db.query(pageBlock, [startIndex, endIndex], (err, result) => {
                    console.log("데이터개수", result.length)
                    res.json(result.reverse())
                })
            }
        });
    } catch(error) {
        console.log(error)
    }
};

const dbLatestTxs = async(req, res) => {
    try {
        const dbLatestTxsData = "SELECT * FROM transaction_data ORDER BY blockNumber DESC LIMIT 10;";
        db.query(dbLatestTxsData, (err, result) => {
            //console.log(result)
            //console.log(err)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbAllTxs = async(req, res) => {
    try {
        const dbAllTxs = "SELECT COUNT(*) AS result FROM transaction_data;"
        db.query(dbAllTxs, (err, result) => {

            if(!req.query.page){
                const firstPageBlock = "SELECT * FROM transaction_data ORDER BY blockNumber DESC LIMIT 50;";
                db.query(firstPageBlock, (err, result) => {
                    res.json(result)
                })
            } else {
                let string = JSON.stringify(result)
                let parse = JSON.parse(string)

                let allTxs = parse[0].result
                let countPerPage = Number(req.query.number)
                let pageNo = req.query.page

                let startIndex = countPerPage * (pageNo - 1)

                console.log("전체트랜잭션", allTxs)
                console.log(countPerPage, "개씩 총 페이지 수", Math.ceil(allTxs / countPerPage))
                
                console.log("startIndex", startIndex)
                console.log("countPerPage", countPerPage)
                
                const pageTx = "SELECT * FROM transaction_data ORDER BY blockNumber DESC LIMIT ?, ?;"
                db.query(pageTx, [startIndex, countPerPage], (err, result) => {
                    console.log("데이터 개수",result.length)
                    res.json(result)
                })
            }
        });
    } catch(error) {
        console.log(error)
    }
};

// ===== detail page data =====
const dbBlockDetails = async(req, res) => {
    try {
        const blockNumber = req.body.blockNumber;
        const getBlockDetail = "SELECT * FROM block_data WHERE blocknumber = ?;";
        db.query(getBlockDetail, [blockNumber], (err, result) => {
            res.json(result);
        })
    } catch(error) {
        console.log(error)
    }
};

const dbBlockTxs = async(req, res) => {
    try {
        const blockHexNumber = req.body.blockHexNumber;
        const getBlockTxs = "SELECT * FROM transaction_data WHERE blockNumberHex = ?;";
        db.query(getBlockTxs, [blockHexNumber], (err, result) => {
            //console.log(blockHexNumber)
            //console.log(result)
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbTxDetails = async(req, res) => {
    try {
        const txHash = req.body.txHash;
        const getTxDetails = "SELECT * FROM transaction_data WHERE txHash = ?;";
        db.query(getTxDetails, [txHash], (err, result) => {
            res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbAddressTxs = async(req, res) => {
    try { 
        const Address = req.body.address;

        if(!req.query.page){
            const getAddressTxs = "SELECT * FROM transaction_data WHERE fromAddress = ? OR toAddress = ? ORDER BY time_stamp DESC LIMIT 25;";
            db.query(getAddressTxs, [Address, Address], (err, result) => {
                //console.log(err)
                res.json(result);
            });
        } else {
            const getAddressTxs = "SELECT * FROM transaction_data WHERE fromAddress = ? OR toAddress = ?";
            db.query(getAddressTxs, [Address, Address], (err, result) => {
                console.log("쿼리있을때 확인",result.length)

                let allTxsNum = result.length;
                let countPerPage = 25;
                let pageNo = req.query.page;

                let startIndex = countPerPage * (pageNo - 1)

                console.log("account 전체트랜잭션", allTxsNum)
                console.log(countPerPage, "개씩 총 페이지 수", Math.ceil(allTxsNum / countPerPage))
                
                console.log("startIndex", startIndex)
                console.log("countPerPage", countPerPage)
                
                const pageTx = "SELECT * FROM transaction_data WHERE fromAddress = ? OR toAddress = ? ORDER BY time_stamp DESC LIMIT ?, ?;"
                db.query(pageTx, [Address, Address, startIndex, countPerPage], (err, result) => {
                    console.log(result)
                    res.json(result)
                })
            })
        }

    } catch(error) {
        console.log(error)
    }
};

const dbAddressTxsNum = async(req, res) => {
    try { 
        const Address = req.body.address;

        const getAddressTxs = "SELECT * FROM transaction_data WHERE fromAddress = ? OR toAddress = ? ORDER BY time_stamp;";
        db.query(getAddressTxs, [Address, Address], (err, result) => {
            //console.log(err)
            let length = result.length
            let data = { accountTxsNum : length}
            res.json(data);
        });

    } catch(error) {
        console.log(error)
    }
};


const dbAddressCheck = async(req, res) => {
    try { 
        const Address = req.body.address;

        const getAddressCheck = "SELECT IF(EXISTS(SELECT * from contract_data  WHERE contractAddress = ? ), '1', '0' ) as RESULT;"
        
        db.query(getAddressCheck, [Address], (err, result) => {
            let string = JSON.stringify(result)
            let parse = JSON.parse(string)
            let checkContractAddress = parse[0].RESULT
            //console.log(checkContractAddress)
            res.json(checkContractAddress)
            //res.json(result);
        });
    } catch(error) {
        console.log(error)
    }
};

const dbInputDataDecode = (req, res) => {
    try { 
        const inputData = req.body.inputData
        
        const ERC20_ABI = [
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            }
        ]
        
        const Message_ABI = [
            {
            "constant": false,
            "inputs": [
            {
            "name": "to",
            "type": "address"
            },
            {
            "name": "data",
            "type": "string"
            },
            {
            "name": "isHashed",
            "type": "bool"
            }
            ],
            "name": "sendMessage2",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "constant": false,
            "inputs": [
            {
            "name": "key",
            "type": "string"
            }
            ],
            "name": "setPublicKey",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "anonymous": false,
            "inputs": [
            {
            "indexed": true,
            "name": "sender",
            "type": "address"
            },
            {
            "indexed": true,
            "name": "receiver",
            "type": "address"
            },
            {
            "indexed": false,
            "name": "time",
            "type": "uint256"
            },
            {
            "indexed": false,
            "name": "data",
            "type": "string"
            },
            {
            "indexed": false,
            "name": "isHashed",
            "type": "bool"
            }
            ],
            "name": "MessageSent",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
            {
            "indexed": true,
            "name": "sender",
            "type": "address"
            },
            {
            "indexed": false,
            "name": "key",
            "type": "string"
            }
            ],
            "name": "PublicKeyUpdated",
            "type": "event"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "name": "connectedAddressArray",
            "outputs": [
            {
            "name": "",
            "type": "address"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "",
            "type": "address"
            }
            ],
            "name": "connectedMap",
            "outputs": [
            {
            "name": "",
            "type": "bool"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "who",
            "type": "address"
            }
            ],
            "name": "getConnectedAddressArray",
            "outputs": [
            {
            "name": "",
            "type": "address[]"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "who",
            "type": "address"
            }
            ],
            "name": "getLastMessage",
            "outputs": [
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "string"
            },
            {
            "name": "",
            "type": "bool"
            },
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "from",
            "type": "address"
            },
            {
            "name": "to",
            "type": "address"
            }
            ],
            "name": "getLastMessage2",
            "outputs": [
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "string"
            },
            {
            "name": "",
            "type": "bool"
            },
            {
            "name": "",
            "type": "uint256"
            },
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "who",
            "type": "address"
            },
            {
            "name": "index",
            "type": "uint256"
            }
            ],
            "name": "getMessageByIndex",
            "outputs": [
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "string"
            },
            {
            "name": "",
            "type": "bool"
            },
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "from",
            "type": "address"
            },
            {
            "name": "to",
            "type": "address"
            },
            {
            "name": "index",
            "type": "uint256"
            }
            ],
            "name": "getMessageByIndex2",
            "outputs": [
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "address"
            },
            {
            "name": "",
            "type": "string"
            },
            {
            "name": "",
            "type": "bool"
            },
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "from",
            "type": "address"
            },
            {
            "name": "to",
            "type": "address"
            },
            {
            "name": "startIndex",
            "type": "uint256"
            },
            {
            "name": "endIndex",
            "type": "uint256"
            }
            ],
            "name": "getMessageByIndex3",
            "outputs": [
            {
            "components": [
            {
            "name": "from",
            "type": "address"
            },
            {
            "name": "to",
            "type": "address"
            },
            {
            "name": "data",
            "type": "string"
            },
            {
            "name": "isHashed",
            "type": "bool"
            },
            {
            "name": "time",
            "type": "uint256"
            }
            ],
            "name": "",
            "type": "tuple[]"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "who",
            "type": "address"
            }
            ],
            "name": "getPublicKey",
            "outputs": [
            {
            "name": "key",
            "type": "string"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "who",
            "type": "address"
            }
            ],
            "name": "lastIndex",
            "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            },
            {
            "constant": true,
            "inputs": [
            {
            "name": "from",
            "type": "address"
            },
            {
            "name": "to",
            "type": "address"
            }
            ],
            "name": "lastIndex2",
            "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
            }
            ]

        const Airdrop_ABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newManager",
                        "type": "address"
                    }
                ],
                "name": "changeManager",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Claim",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "claimAirdrop",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "oldManager",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newManager",
                        "type": "address"
                    }
                ],
                "name": "ManagerSet",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "recoverErc20",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "recoverToken",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [],
                "name": "getManager",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "isClaimed",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "manager",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "version",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            }
        ]

        const ERC721_SALE_ABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_mintAnimalTokenAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "animalTokenPrices",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_animalTokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getAnimalTokenPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getOnSaleAnimalTokenArrayLength",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "mintAnimalTokenAddress",
                "outputs": [
                    {
                        "internalType": "contract MintAnimalToken",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "onSaleAnimalTokenArray",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_animalTokenId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseAnimalToken",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_animalTokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    }
                ],
                "name": "setForSaleAnimalToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]

        abiDecoder.addABI(ERC20_ABI);
        abiDecoder.addABI(Message_ABI);
        abiDecoder.addABI(Airdrop_ABI);
        abiDecoder.addABI(ERC721_SALE_ABI);
        
        const decodedData = abiDecoder.decodeMethod(inputData);
        if(inputData != "0x" && inputData.length < 10000){
            res.json(decodedData)
        } else {
            res.json("")
        }

    } catch(error) {
        console.log(error)
    }
};

const chartAllTxsByDate = async(req, res) => {    
    try {
        const chartData = "SELECT DATE(`time_stamp`) AS 'day', COUNT(*) AS 'txLength' FROM `transaction_data`GROUP BY DATE(`time_stamp`);"
        db.query(chartData, (err, result) => {

            let string = JSON.stringify(result)
            let parse = JSON.parse(string)

            // 데이터 파싱한거 배열에 넣기 (+9시간해줌)
            let dbTransactionArr = []
            for(let i=0; i < parse.length; i++){

                let timeSource = parse[i].day
                const dateValue = moment(timeSource).format();

                //console.log(dateValue.substr(0, 10), parse[i].txLength)
                dbTransactionArr.push({
                    day : dateValue.substr(0, 10),
                    txLength : parse[i].txLength
                })
            }

            // 날짜 차이 계산 
            let now = new Date();

            let year = now.getFullYear();
            let month = now.getMonth()+1;
            let day = now.getDate();
            
            let stDate = new Date(2022, 08, 01);
            let endDate = new Date(year, month, day);
            
            let btMs = endDate.getTime() - stDate.getTime() ;
            let btDay = btMs / (1000*60*60*24) ;
            
            //console.log("일수 차이는?? " + btDay);

            let totalArr = [];
            for (let i=btDay; i>=0; i--) {
                totalArr.push({ 
                    day : moment().subtract(i, 'day').format("YYYY-MM-DD"),
                    txLength : 0
                });
            }

            // 날짜가 같으면 db에 있는 txLength를 대입
            for(let i=0; i < totalArr.length; i++){
                for(let j=0; j < dbTransactionArr.length; j++)
                    if(totalArr[i].day == dbTransactionArr[j].day){
                        //console.log(totalArr[i].day, dbTransactionArr[j].txLength)
                        totalArr[i].txLength = dbTransactionArr[j].txLength
                    }
            }
            
            res.json(totalArr)
        });
    } catch(error) {
        console.log(error)
    }
}

const chartMonthlyTxsByDate = async(req, res) => {    
    try {
        const chartData = "SELECT DATE(`time_stamp`) AS 'day', COUNT(*) AS 'txLength' FROM `transaction_data`GROUP BY DATE(`time_stamp`);"
        db.query(chartData, (err, result) => {

            let string = JSON.stringify(result)
            let parse = JSON.parse(string)

            // 데이터 파싱한거 배열에 넣기 (+9시간해줌)
            let dbTransactionArr = []
            for(let i=0; i < parse.length; i++){

                let timeSource = parse[i].day
                const dateValue = moment(timeSource).format();

                //console.log(dateValue.substr(0, 10), parse[i].txLength)
                dbTransactionArr.push({
                    day : dateValue.substr(0, 10),
                    txLength : parse[i].txLength
                })
            }
            //console.log(dbTransactionArr)
            // 날짜 차이 계산 
            let now = new Date();

            let year = now.getFullYear();
            let month = now.getMonth()+1;
            let day = now.getDate();
            
            let stDate = new Date(year, month - 1, day);
            let endDate = new Date(year, month, day);

            let btMs = endDate.getTime() - stDate.getTime() ;
            let btDay = btMs / (1000*60*60*24) ;
            
            let totalArr = [];
            for (let i=btDay; i>=0; i--) {
                totalArr.push({ 
                    day : moment().subtract(i, 'day').format("YYYY-MM-DD"),
                    txLength : 0
                });
            }

            // 날짜가 같으면 db에 있는 txLength를 대입
            for(let i=0; i < totalArr.length; i++){
                for(let j=0; j < dbTransactionArr.length; j++)
                    if(totalArr[i].day == dbTransactionArr[j].day){
                        //console.log(totalArr[i].day, dbTransactionArr[j].txLength)
                        totalArr[i].txLength = dbTransactionArr[j].txLength
                    }
            }

            res.json(totalArr)
        });
    } catch(error) {
        console.log(error)
    }
}

const chartWeeklyTxsByDate = async(req, res) => {    
    try {
        const chartData = "SELECT DATE(`time_stamp`) AS 'day', COUNT(*) AS 'txLength' FROM `transaction_data`GROUP BY DATE(`time_stamp`);"
        db.query(chartData, (err, result) => {

            let string = JSON.stringify(result)
            let parse = JSON.parse(string)

            // 데이터 파싱한거 배열에 넣기 (+9시간해줌)
            let dbTransactionArr = []
            for(let i=0; i < parse.length; i++){

                let timeSource = parse[i].day
                console.log("여기확인====",timeSource)
                const dateValue = moment(timeSource).format();

                console.log(dateValue.substr(0, 10), parse[i].txLength)
                dbTransactionArr.push({
                    day : dateValue.substr(0, 10),
                    txLength : parse[i].txLength
                })
            }
            console.log(dbTransactionArr)
            // 날짜 차이 계산 
            let now = new Date();

            let year = now.getFullYear();
            let month = now.getMonth()+1;
            let day = now.getDate();
            
            let stDate = new Date(year, month, day - 6);
            let endDate = new Date(year, month, day);

            let btMs = endDate.getTime() - stDate.getTime() ;
            let btDay = btMs / (1000*60*60*24) ;

            let totalArr = [];
            for (let i=btDay; i>=0; i--) {
                totalArr.push({ 
                    day : moment().subtract(i, 'day').format("YYYY-MM-DD"),
                    txLength : 0
                });
            }

            // 날짜가 같으면 db에 있는 txLength를 대입
            for(let i=0; i < totalArr.length; i++){
                for(let j=0; j < dbTransactionArr.length; j++)
                    if(totalArr[i].day == dbTransactionArr[j].day){
                        console.log(totalArr[i].day, dbTransactionArr[j].txLength)
                        totalArr[i].txLength = dbTransactionArr[j].txLength
                    }
            }
            console.log(totalArr)
            console.log(typeof(totalArr[0].day))
            res.json(totalArr)
        });
    } catch(error) {
        console.log(error)
    }
}


module.exports = { 
    root, 
    tokenData,
    dbChartData, 
    dbFromAddress,
    dbToAddress,
    dbTotalTxsNum,
    dbLatestTxs,
    dbLatestBlockData,
    dbAllBlocks,
    dbLatestTxs,
    dbAllTxs,
    dbBlockDetails,
    dbBlockTxs,
    dbTxDetails,
    dbAddressTxs,
    dbAddressTxsNum,
    dbAddressCheck,
    dbInputDataDecode,
    chartAllTxsByDate,
    chartMonthlyTxsByDate,
    chartWeeklyTxsByDate,
}
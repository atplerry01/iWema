var oracledb = require('oracledb');

var WemaTreasury = {
    user: 'inforpt',
    password: 'Trinfo123$',
    connectString:  '172.27.8.167:1521/FINTWEMA'
  };

 var configOracleDR = {
    user: 'selector',
    password: 'selector',
    connectString:  '172.27.8.156:1521/FINWEMA'
  };

 var configOracle = {
    user: 'selector',
    password: 'selector',
    connectString:  '172.27.8.156:1521/FINWEMA'
    // Default values shown below
    // events: false, // whether to handle Oracle Database FAN and RLB events
    // externalAuth: false, // whether connections should be established using External Authentication
    // poolAlias: 'myalias' // set an alias to allow access to the pool via a name.
    // poolIncrement: 1, // only grow the pool by one connection at a time
    // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
    // poolMin: 0, // start with no connections; let the pool shrink completely
    // poolPingInterval: 60, // check aliveness of connection if in the pool for 60 seconds
    // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
    // queueRequests: true, // let Node.js queue new getConnection() requests if all pool connections are in use
    // queueTimeout: 60000, // terminate getConnection() calls in the queue longer than 60000 milliseconds
    // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
  };


    // https://github.com/oracle/oracle-db-examples/tree/master/javascript/node-oracledb
    // https://oracle.github.io/node-oracledb/doc/api.html#connpooling

  
    function executeFinacleLiveQuery(query) {

        return new Promise((resolve, reject) => {

        oracledb.createPool(configOracle).then( pool => {
             
               pool.getConnection().then((connection) => {
                console.log("Connections open: " + pool.connectionsOpen);
                console.log("Connections in use: " + pool.connectionsInUse);

                connection.execute(query, {}, {
                    outFormat: oracledb.OBJECT
                }).then( function(result){

                    /* Release the connection back to the connection pool */
                    connection.close().then(() => {
                              console.info("Oracle connection closed successfully");
                        })
                        .catch((err) => {
                            console.error("Error closing connection: ", err);
                        });

                    return resolve(result.rows);

                }).catch((err) => {
                    connection.close()
                        .catch((_err) => {
                            console.error("Error closing connection: ", _err);
                        });

                    return reject(err);
                });
            }).catch((err) => {
                console.error("Error connecting to Oracle: ", err);
                return reject(err);
            });

        }).catch(function err(){
            console.log('pool connection error')
            return reject(err);
        })


        });

    }


   function executeFinacleDRQuery(query) {

        return new Promise((resolve, reject) => {

        oracledb.createPool(configOracleDR).then( pool => {
             
               pool.getConnection().then((connection) => {
                console.log("Connections open: " + pool.connectionsOpen);
                console.log("Connections in use: " + pool.connectionsInUse);

                connection.execute(query, {}, {
                    outFormat: oracledb.OBJECT
                }).then( function(result){

                    /* Release the connection back to the connection pool */
                    connection.close().then(() => {
                              console.info("Oracle connection closed successfully");
                        })
                        .catch((err) => {
                            console.error("Error closing connection: ", err);
                        });

                    return resolve(result.rows);

                }).catch((err) => {
                    connection.close()
                        .catch((_err) => {
                            console.error("Error closing connection: ", _err);
                        });

                    return reject(err);
                });
            }).catch((err) => {
                console.error("Error connecting to Oracle: ", err);
                return reject(err);
            });

        }).catch(function err(){
            console.log('pool connection error')
            return reject(err);
        })


        });

    }

    function executeWemaTreasuryQuery(query) {

        return new Promise((resolve, reject) => {

        oracledb.createPool(WemaTreasury).then( pool => {
             
               pool.getConnection().then((connection) => {
                // console.log("Connections open for WemaTreasury: " + pool.connectionsOpen);
                // console.log("Connections in use for WemaTreasury: " + pool.connectionsInUse);

                connection.execute(query, {}, {
                    outFormat: oracledb.OBJECT
                }).then( function(result){

                    /* Release the connection back to the connection pool */
                    connection.close().then(() => {
                              console.info("Oracle connection closed successfully for WemaTreasury");
                        })
                        .catch((err) => {
                            console.error("Error closing connection for WemaTreasury: ", err);
                        });

                    return resolve(result.rows);

                }).catch((err) => {
                    connection.close()
                        .catch((_err) => {
                            console.error("Error closing connection for WemaTreasury: ", _err);
                        });

                    return reject(err);
                });
            }).catch((err) => {
                console.error("Error connecting to Oracle for WemaTreasury: ", err);
                return reject(err);
            });

        }).catch(function err(){
            console.log('pool connection error for WemaTreasury');
            return reject(err);
        })


        });

    }


module.exports = {
    executeFinacleLiveQuery,
    executeFinacleDRQuery,
    executeWemaTreasuryQuery
}
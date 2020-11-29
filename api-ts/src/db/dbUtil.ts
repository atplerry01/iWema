// import * as oracledb from 'oracledb';
import * as mssql from 'mssql'; // https://www.npmjs.com/package/mssql  //http://www.tutorialsteacher.com/nodejs/access-sql-server-in-nodejs
import * as mysql from 'mysql'; // https://www.npmjs.com/package/mysql
import { postDR, postLiveDB, postTreasury } from '../httpService/htttpClient';
import * as config from '../util/config';
const mysql_pool = mysql.createPool(config.configMySQL);




export const executeFinacleLiveQuery = (dbquery) => {

    return new Promise(async (resolve, reject) => {

        try {
            const result = await postLiveDB({ dbquery });
            return resolve(result);
        } catch (err) {
            return reject(err);
        }

    });
};

export const executeFinacleDRQuery = (dbquery) => {

    return new Promise(async (resolve, reject) => {

        try {
            const result = await postDR({ dbquery });
            return resolve(result);
        } catch (err) {
            return reject(err);
        }

    });
};

export const executeTreasuryOracleQuery = (dbquery) => {

    return new Promise(async (resolve, reject) => {

        try {
            const result = await postTreasury({ dbquery });
            return resolve(result);
        } catch (err) {
            return reject(err);
        }

    });
};


export const executeMySQL = (query) => {

    return new Promise((resolve, reject) => {

        mysql_pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            } // not connected!

            connection.query(query, (_err, result, _fields) => {
                connection.release();

                if (_err) {
                    return reject(_err);
                }

                return resolve(result);
            });

        });

    });
};

export const mysqlSanitizeInput = (_variable) => {
    if (!_variable) {
        return _variable;
    }
    return mysql.escape(_variable);
};

export const executeSQLServer = async (sqlquery, userInput = {}, db = 'xceed') => {
    return new Promise(async (resolve, reject) => {

        let sqlconfig: any;
        switch (db) {
            case 'easymoment':
                sqlconfig = config.configSQLServer_MessagePRO;
                break;
            case 'wemacollect':
                sqlconfig = config.configSQLServer_WemaCollect;
                break;
            case 'BtsWeb':
                sqlconfig = config.configSQLServer_BtsWeb;
                break;
            case 'MobileBanking':
                sqlconfig = config.configSQLServer_MobileBanking;
                break;
            case 'PostilionOffice':
                sqlconfig = config.configSQLServer_PostilionOffice;
                break;
            case 'ALAT':
                sqlconfig = config.configSQLServer_ALAT;
                break;
            case 'Xceed365':
                sqlconfig = config.configSQLServer_Xceed365;
                break;
            // Xceed365
            default:
                sqlconfig = config.configSQLServer_Exceed;
        }

        const pool = new mssql.ConnectionPool(sqlconfig);
        pool.on('error', err => {
            // ... error handler
            console.log('sql pool error db.js', err);
            return reject(err);
        });

        try {

            await pool.connect();
            let result = pool.request();

            for (const key in userInput) {
                if (Array.isArray(userInput[key])) {
                    // input(field_name, dataType, value)
                    result = result.input(key, userInput[key][1], userInput[key][0]);
                } else {
                    // input(field_name, value)
                    result = result.input(key, userInput[key]);
                }
            }

            const finalResult = await result.query(sqlquery);

            return resolve(finalResult.recordset);

        } catch (err) {
            // stringify err to easily grab just the message
            const e = JSON.stringify(err, ["message", "arguments", "type", "name"]);

            return reject({ error: JSON.parse(e).message });
        } finally {
            pool.close(); // closing connection after request is finished.
        }

    });

};





      // https://github.com/oracle/oracle-db-examples/tree/master/javascript/node-oracledb
    // https://oracle.github.io/node-oracledb/doc/api.html#connpooling

    // executeFinacleLiveQuery(query) {

    //     return new Promise((resolve, reject) => {

    //         this.app.get('pool').getConnection().then((connection) => {
    //             // console.log("Connections open: " + this.app.pool.connectionsOpen);
    //             // console.log("Connections in use: " + this.app.pool.connectionsInUse);

    //             connection.execute(query, {}, {
    //                 outFormat: oracledb.OBJECT
    //             }).then((result) => {

    //                 /* Release the connection back to the connection pool */
    //                 connection.close().then(() => {
    //                         // console.info("Oracle connection closed successfully");
    //                     })
    //                     .catch((err) => {
    //                         console.error("Error closing connection: ", err);
    //                     });

    //                 return resolve(result.rows);

    //             }).catch((err) => {
    //                 connection.close()
    //                     .catch((_err) => {
    //                         console.error("Error closing connection: ", _err);
    //                     });

    //                 return reject(err);
    //             });
    //         }).catch((err) => {
    //             console.error("Error connecting to Oracle: ", err);
    //             return reject(err);
    //         });


    //     });

    // }

    // executeFinacleDRQuery(query) {

    //     return new Promise((resolve, reject) => {

    //         this.app.get('poolDR').getConnection().then((connection) => {
    //             // console.log("Connections open: " + this.app.pool.connectionsOpen);
    //             // console.log("Connections in use: " + this.app.pool.connectionsInUse);

    //             connection.execute(query, {}, {
    //                 outFormat: oracledb.OBJECT
    //             }).then((result) => {

    //                 /* Release the connection back to the connection pool */
    //                 connection.close().then(() => {
    //                         //  console.info("Oracle connection closed successfully");
    //                     })
    //                     .catch((err) => {
    //                         console.error("Error closing connection: ", err);
    //                     });

    //                 return resolve(result.rows);

    //             }).catch((err) => {
    //                 connection.close()
    //                     .catch((_err) => {
    //                         console.error("Error closing connection: ", _err);
    //                     });

    //                 return reject(err);
    //             });
    //         }).catch((err) => {
    //             console.error("Error connecting to Oracle: ", err);
    //             return reject(err);
    //         });


    //     });

    // }



    //     executeOralceQuery(query) {

    //         return new Promise((resolve, reject) => {

    //             const options = {
    //                 method: 'POST',
    //                 url: config.codeLibraryAPI.url + '/CodeLibrary/api/CodeLibrary/RunFinacleSelectQuery',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: { Query: query },
    //                 json: true
    //             };

    //             request(options, (error, response, body) => {
    //                 if (error) return reject(error);

    //                 return resolve(body);
    //             });

    //         });

    // }




    // executeMySQL(query) {

    //     return new Promise((resolve, reject) => {

    //         this.app.mysql.query(query, (err, result, fields) => {
    //             if (err) {
    //                 return reject(err);
    //             }

    //             return resolve(result);
    //         });

    //     });
    // }



    // getTodayBirthay_Staff() {

    //     return new Promise((resolve, reject) => {

    //         const q = this.qUser.getTodayBirthay_Staff_QUERY();

    //         this.app.xceedrequest.query(q, (err, result) => {
    //             return err ? reject(err) : resolve(result.recordset);
    //         });

    //     });
    // }




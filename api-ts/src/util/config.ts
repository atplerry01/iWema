// tslint:disable:max-line-length

export const enableAttestation = false;
export const allowedgrades = ['AA1', 'AA2', 'AA3', 'ABO', 'EA', 'EH', 'AA', 'ET', 'DRV1', 'DRV2', 'BO', 'SBO'];
export const bidopened = true;
export const ports = {
    port: process.env.NODE_ENV === "production" ? 8080 : 3001
};

export const codeLibraryAPI = {
    url: process.env.NODE_ENV === "production" ? process.env.codeLibraryAPI_PROD : process.env.codeLibraryAPI_UAT
};

// const attributes = {
// 	user: ['dn',
// 		'userPrincipalName', 'sAMAccountName', /*'objectSID',*/ 'mail',
// 		'lockoutTime', 'whenCreated', 'pwdLastSet', 'userAccountControl',
// 		'employeeID', 'sn', 'givenName', 'initials', 'cn', 'displayName',
// 		'comment', 'description', 'manager', 'department']
// }

// company = Staff ID, middleName=Manager, title=JobTitle, physicalDeliveryOfficeName=branch
const attributes = {
    user: ['dn', 'sAMAccountName', 'displayName', 'givenName', 'sn', 'title', 'department', 'streetAddress',
        'mail', 'mobile', 'middleName', 'physicalDeliveryOfficeName', 'company']
};

export const configAD = {
    url: process.env.configAD_URL,
    baseDN: process.env.configAD_BASEDN,
    username: process.env.configAD_USERNAME,
    password: process.env.configAD_PASSWORD,
    attributes
};

export const configMySQL = {
    connectionLimit: 20,
    host: process.env.configMySQL_HOST,
    user: process.env.configMySQL_USER,
    password: process.env.configMySQL_PASSWORD,
    database: process.env.NODE_ENV === "production" ? process.env.configMySQL_DB : process.env.configMySQL_DB_DEV
};

export const configSQLServer_Exceed = {
    user: process.env.configSQLServerExceed_USER,
    password: process.env.configSQLServerExceed_PASSWORD,
    server: process.env.SQLSERVER_wemaconsol1_IP + '\\' + process.env.SQLSERVER_wemaconsol1_INSTANCE, // '172.27.5.59\\wemaconsol1',  //"wmdb-2\\wemaconsol1", // You can use 'localhost\\instance' to connect to named instance
    port: process.env.SQLSERVER_wemaconsol1_PORT,
    database: process.env.configSQLServerExceed_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_MessagePRO = {
    user: process.env.configSQLServerMessagePRO_USER,
    password: process.env.configSQLServerMessagePRO_PASSWORD,
    server: process.env.SQLSERVER_wemaconsol2_IP + '\\' + process.env.SQLSERVER_wemaconsol2_INSTANCE, // '172.27.5.59\\wemaconsol1',  //"wmdb-2\\wemaconsol1", // You can use 'localhost\\instance' to connect to named instance
    port: process.env.SQLSERVER_wemaconsol1_PORT,
    database: process.env.configSQLServerMessagePRO_DB,
    options: {
        encrypt: false
    }
};

export const configSQLServer_WemaCollect = {
    user: process.env.configMSSQL_WEMAcollect_USER,
    password: process.env.configMSSQL_WEMAcollect_PASSWORD,
    server: process.env.configMSSQL_WEMAcollect_IP + '\\' + process.env.configMSSQL_WEMAcollect_INSTANCE,
    port: process.env.SQLSERVER_wemaconsol1_PORT,
    database: process.env.configMSSQL_WEMAcollect_DB,
    options: {
        encrypt: false
    }
};

export const configSQLServer_BtsWeb = {
    user: process.env.SQLSERVER_BtsWeb_USER,
    password: process.env.SQLSERVER_BtsWeb_PASSWORD,
    server: process.env.SQLSERVER_BtsWeb_IP + '\\' + process.env.SQLSERVER_BtsWeb_INSTANCE,
    // server: process.env.SQLSERVER_BtsWeb_IP, 
    port: process.env.SQLSERVER_BtsWeb_PORT,
    database: process.env.SQLSERVER_BtsWeb_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_MobileBanking = {

    user: process.env.SQLSERVER_MobileBanking_USER,
    password: process.env.SQLSERVER_MobileBanking_PASSWORD,
    server: process.env.SQLSERVER_MobileBanking_IP + '\\' + process.env.SQLSERVER_MobileBanking_INSTANCE,
    port: process.env.SQLSERVER_MobileBanking_PORT,
    database: process.env.SQLSERVER_MobileBanking_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_PostilionOffice = {
    user: process.env.SQLSERVER_PostilionOffice_USER,
    password: process.env.SQLSERVER_PostilionOffice_PASSWORD,
    server: process.env.SQLSERVER_PostilionOffice_IP,
    // port: process.env.SQLSERVER_PostilionOffice_PORT,
    database: process.env.SQLSERVER_PostilionOffice_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_ALAT = {
    user: process.env.SQLSERVER_ALAT_USER,
    password: process.env.SQLSERVER_ALAT_PASSWORD,
    server: process.env.SQLSERVER_ALAT_IP,
    // port: process.env.SQLSERVER_ALAT_PORT,
    database: process.env.SQLSERVER_ALAT_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

// configSQLServer_ALAT
export const configSQLServer_Xceed365 = {
    user: process.env.SQLSERVER_Xceed365_USER,
    password: process.env.SQLSERVER_Xceed365_PASSWORD,
    server: process.env.SQLSERVER_Xceed365_IP + '\\' + process.env.SQLSERVER_Xceed365_INSTANCE,
    port: process.env.SQLSERVER_Xceed365_PORT,
    database: process.env.SQLSERVER_Xceed365_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_revpay = {
    user: process.env.configMSSQL_revpay_USER,
    password: process.env.configMSSQL_revpay_PASSWORD,
    server:
        process.env.configMSSQL_revpay_IP +
        "\\" +
        process.env.configMSSQL_revpay_INSTANCE,
    port: process.env.SQLSERVER_revpay_PORT,
    database: process.env.configMSSQL_revpay_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

export const configSQLServer_ebills = {
    user: process.env.configMSSQL_ebills_USER,
    password: process.env.configMSSQL_ebills_PASSWORD,
    server:
        process.env.configMSSQL_ebills_IP +
        "\\" +
        process.env.configMSSQL_ebills_INSTANCE,
    port: process.env.SQLSERVER_ebills_PORT,
    database: process.env.configMSSQL_ebills_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};
export const configSQLServer_nipInbranch = {
    user: process.env.configMSSQL_nipInbranch_USER,
    password: process.env.configMSSQL_nipInbranch_PASSWORD,
    server: process.env.configMSSQL_nipInbranch_IP,
    port: process.env.SQLSERVER_nipInbranch_PORT,
    database: process.env.configMSSQL_nipInbranch_DB,
    options: {
        encrypt: false // Set to true if you're on Windows Azure
    }
};

// export const configOracleDR = {
    //     user: 'selector',
    //     password: 'selector',
    //     connectString:  process.env.NODE_ENV === "production" ? process.env.configOracle_DR : process.env.configOracle_UAT
    //   };

    // export const configOracle = {
    //     user: 'selector',
    //     password: 'selector',
    //     connectString:  process.env.NODE_ENV === "production" ? process.env.configOracle_PROD : process.env.configOracle_UAT
    //     // Default values shown below
    //     // events: false, // whether to handle Oracle Database FAN and RLB events
    //     // externalAuth: false, // whether connections should be established using External Authentication
    //     // poolAlias: 'myalias' // set an alias to allow access to the pool via a name.
    //     // poolIncrement: 1, // only grow the pool by one connection at a time
    //     // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
    //     // poolMin: 0, // start with no connections; let the pool shrink completely
    //     // poolPingInterval: 60, // check aliveness of connection if in the pool for 60 seconds
    //     // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
    //     // queueRequests: true, // let Node.js queue new getConnection() requests if all pool connections are in use
    //     // queueTimeout: 60000, // terminate getConnection() calls in the queue longer than 60000 milliseconds
    //     // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
    //   };


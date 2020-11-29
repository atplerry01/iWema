import * as AD from "activedirectory"; // https://www.npmjs.com/package/activedirectory#opts
import * as config from "../util/config";

export default class DBConnections {

// tslint:disable:indent

connectAD() {
return new Promise((resolve, reject) => {
			const ad = new AD(config.configAD);
			return !ad ? reject("Error connecting to AD") : resolve(ad);
		});
	}


	// FINACLE LIVE DB CONNECTION
	// finnacleConnect() {
	// 	return new Promise((resolve, reject) => {
	// 		oracledb.createPool(config.configOracle as any)
	// 			.then((pool) => {
	// 				return resolve(pool);
	// 			}).catch((err) => {
	// 				return reject(err.message);
	// 			});
	// 	});
	// }

	// finnacleConnectDR() {
	// 	return new Promise((resolve, reject) => {
	// 		oracledb.createPool(config.configOracleDR as any)
	// 			.then((pool) => {
	// 				return resolve(pool);
	// 			}).catch((err) => {
	// 				return reject(err.message);
	// 			});
	// 	});
	// }


}

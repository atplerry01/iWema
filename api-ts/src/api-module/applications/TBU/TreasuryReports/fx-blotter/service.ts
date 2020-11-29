import { getConnection } from "typeorm";
import { FxBlotter } from "./../../../../../entity/TBU/Reports/FxBlotter";

export const createFxLogService = async (RequestDate, OpenBalanceUsd, OpenBalanceNgn, NewRate) => {
    return await FxBlotter.create({
        RequestDate, OpenBalanceUsd, OpenBalanceNgn, NewRate
    }).save();
};

export const getOpeningBalanceSevices = async (RequestDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            // tslint:disable-next-line: max-line-length
            const openBal = await getConnection().query(`SELECT RequestDate, OpenBalanceUsd, OpenBalanceNgn, NewRate FROM wema360.fx_blotter_bal where RequestDate = (select max(RequestDate) from wema360.fx_blotter_bal where RequestDate<='${RequestDate}');`);
            return resolve(openBal);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};

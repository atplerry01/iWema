import { checkAccess } from "../../../util/utility";
import { getChannelMovement_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getChannelMovement = (accessLevels, redis: any) => {

    return new Promise(async (resolve, reject) => {

        checkAccess('Daily Movement Report', accessLevels).then(async level => {

            if (level !== 'G') {
                return reject({
                    err: null,
                    message: "Access Denied. Unauthorized User"
                });
            }

            const key = `dailymovement${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);
                return resolve(data);
            }

            const q = getChannelMovement_QUERY();

            executeMySQL(q).then(async (result: any[]) => {

                const formmatedResult: any[] = [];

                if (result.length > 0) {
                    const emptyObj = {
                        IChannel: '',
                        ITotalCount: '',
                        ITotalAmount: '',
                        ITranDate: '',
                        IRemarks: '',
                        OChannel: '',
                        OTotalCount: '',
                        OTotalAmount: '',
                        OTranDate: '',
                        ORemarks: ''
                    };

                    let obj = emptyObj;
                    let i = 0;

                    result.forEach(val => {
                        i++;

                        if (i % 2 === 0) {
                            // update
                            obj.OChannel = val.Channel;
                            obj.OTotalCount = val.TotalCount;
                            obj.OTotalAmount = val.TotalAmount;
                            obj.OTranDate = val.TranDate;
                            obj.ORemarks = val.Remarks;

                            formmatedResult.push(obj);

                            obj = emptyObj;

                        } else {
                            // insert
                            obj.IChannel = val.Channel;
                            obj.ITotalCount = val.TotalCount;
                            obj.ITotalAmount = val.TotalAmount;
                            obj.ITranDate = val.TranDate;
                            obj.IRemarks = val.Remarks;
                        }

                    });
                }

                let i2 = 0;
                const finalResult: any[] = [];
                const emptyObj2 = {
                    IChannel: '',
                    ITotalCount: '',
                    ITotalAmount: '',
                    ITranDate: '',
                    IRemarks: '',
                    OChannel: '',
                    OTotalCount: '',
                    OTotalAmount: '',
                    OTranDate: '',
                    ORemarks: '',
                    P_IChannel: '',
                    P_ITotalCount: '',
                    P_ITotalAmount: '',
                    P_ITranDate: '',
                    P_IRemarks: '',
                    P_OChannel: '',
                    P_OTotalCount: '',
                    P_OTotalAmount: '',
                    P_OTranDate: '',
                    P_ORemarks: ''
                };

                let obj2 = emptyObj2;

                formmatedResult.forEach(val => {

                    i2++;

                    if (i2 % 2 === 0) {
                        // update
                        obj2.IChannel = val.IChannel;
                        obj2.ITotalCount = val.ITotalCount;
                        obj2.ITotalAmount = val.ITotalAmount;
                        obj2.ITranDate = val.ITranDate;
                        obj2.IRemarks = val.IRemarks;
                        obj2.OChannel = val.OChannel;
                        obj2.OTotalCount = val.OTotalCount;
                        obj2.OTotalAmount = val.OTotalAmount;
                        obj2.OTranDate = val.OTranDate;
                        obj2.ORemarks = val.ORemarks;

                        finalResult.push(obj2);

                        obj2 = emptyObj2;

                    } else {
                        // insert
                        obj2.P_IChannel = val.IChannel;
                        obj2.P_ITotalCount = val.ITotalCount;
                        obj2.P_ITotalAmount = val.ITotalAmount;
                        obj2.P_ITranDate = val.ITranDate;
                        obj2.P_IRemarks = val.IRemarks;
                        obj2.P_OChannel = val.OChannel;
                        obj2.P_OTotalCount = val.OTotalCount;
                        obj2.P_OTotalAmount = val.OTotalAmount;
                        obj2.P_OTranDate = val.OTranDate;
                        obj2.P_ORemarks = val.ORemarks;
                    }


                });

                if (finalResult) {
                    try {
                        await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                        console.log('Redis Insert Okay');

                    } catch (error) {
                        console.log('Redis Insert failed:', error.message);
                    }
                }

                // console.log('finalResult:', finalResult)
                return resolve(finalResult);
            }).catch((err) => {
                return reject({
                    err: err,
                    message: "Report not available for this search criteria"
                });
            }); // end of execution

        }).catch(err => {
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });


    });
};

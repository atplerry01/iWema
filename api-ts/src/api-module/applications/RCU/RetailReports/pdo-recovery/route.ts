import * as _ from "lodash";
import * as workerFarm from "worker-farm"; // used for mult-threading
import { ErrorHandler } from './../../../../../util/errorHandler';
import { isAuthenticated } from './../../../../../util/isAuthenticated';

export const postPDORecoveryRoute = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {

            const startDate = _.get(req.query, "startDate");
            const endDate = _.get(req.query, "endDate");
            const dataparm = _.get(req.body, "data");

            try {

                const service = workerFarm(require.resolve('./service-worker'));

                service(dataparm, startDate, endDate, async (err, result) => {
                    if (err) {
                        console.log(err);
                        const handleErr = ErrorHandler(req, '', "createPANProcessor", 'Could not process the record.', err, true);
                        workerFarm.end(service);
                        return res.status(400).json(handleErr);
                    }

                    workerFarm.end(service);

                    return res.status(200).json({
                        data: result
                    });

                });
            } catch (err) {
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};
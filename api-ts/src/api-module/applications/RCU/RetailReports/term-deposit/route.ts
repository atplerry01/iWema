import * as _ from "lodash";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { Paginator } from './../../../../../util/utility';
import { getTermDepositService } from "./service";

export const getTermDepositRoute = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);
            const serviceType = _.get(req.query, "serviceType", 'all');
            const selectedBranch = _.get(req.query, "selectedBranch");
            const startDate = _.get(req.query, "startDate");
            const endDate = _.get(req.query, "endDate");
            // term-deposit/reports?serviceType=dateAndBranchOnly&selectedBranch=196
            // &startDate=2019-07-01&endDate=2019-07-12&page=1&per_page=15

            try {
                
                const entity = await getTermDepositService(serviceType, selectedBranch, startDate, endDate);
                const result = await Paginator(entity, page, per_page);

                return res.status(200).json({
                    data: result
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

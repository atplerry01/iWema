import * as _ from "lodash";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { Paginator } from './../../../../../util/utility';
import { getCollectionSevices } from './service';

export const getFacilityUltilizationCollections = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getCollectionSevices();
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

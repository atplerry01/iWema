
import * as _ from 'lodash';
import { getBranchListByZone } from './service';

export const getBranchListByZoneRouter = (req, res) => {

    const zonecode = _.get(req.params, 'zonecode');

   getBranchListByZone(zonecode).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(400).json({
            error: err
        });
    });
};

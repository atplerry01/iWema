
import * as _ from 'lodash';
import { getBranchListByRegion } from './service';

export const getBranchListByRegionRouter = (req, res) => {

    const regioncode = _.get(req.params, 'regioncode');

   getBranchListByRegion(regioncode).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(400).json({
            error: err
        });
    });
};

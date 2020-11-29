
import * as _ from 'lodash';
import { getZoneListByRegion } from './service';

export const getZoneListByRegionRouter = (req, res) => {

    const regioncode = _.get(req.params, 'regioncode');

   getZoneListByRegion(regioncode).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(400).json({
            error: err
        });
    });

};

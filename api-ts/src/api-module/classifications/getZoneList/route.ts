
import { getZoneList } from './service';

export const getZoneListRouter = (res) => {

    getZoneList().then((result) => {
         return res.status(200).json(result);
     }).catch(err => {
         return res.status(400).json({
             error: err
         });
     });

 };

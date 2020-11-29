
import { getRegionList } from './service';

export const getRegionListRouter = (res: any) => {

    getRegionList().then((result) => {
         return res.status(200).json(result);
     }).catch(err => {
         return res.status(400).json({
             error: err
         });
     });

 };


import { getBranchList } from './service';

export const getBranchListRouter = (res) => {

    getBranchList().then((result) => {
         return res.status(200).json(result);
     }).catch(err => {
         return res.status(400).json({
             error: err
         });
     });

 };

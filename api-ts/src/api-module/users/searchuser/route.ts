
import * as _ from 'lodash';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { searchEmployees } from './service';


export const searchuserRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then(_decoded_token => {
        const searchterm = _.get(req.query, 'searchterm');
        const regioncode = _.get(req.query, 'regioncode');
        const zonecode = _.get(req.query, 'zonecode');
        const branchcode = _.get(req.query, 'branchcode');

        // console.log('searchterm:', searchterm);
        // console.log('regioncode:', regioncode);
        // console.log('zonecode:', zonecode);
        // console.log('branchcode:', branchcode);

        //  console.log('decoded_token:', decoded_token);

        searchEmployees(searchterm, regioncode, zonecode, branchcode).then((user) => {
            return res.status(200).json(user);
        }).catch(err => {
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

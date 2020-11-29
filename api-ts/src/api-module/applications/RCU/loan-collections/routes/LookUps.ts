import { getAllLookupServices, getAllZones } from '../services/Lookup';
import { isAuthenticated } from './../../../../../util/isAuthenticated';

export const getLookUps = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {

            try {
                const entity = await getAllLookupServices();
                return res.status(200).json({
                    data: entity
                });
            } catch (err) {
                return false;
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

export const getAllZoneXs = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {

            try {
                const entity = await getAllZones();
                return res.status(200).json({
                    data: entity
                });
            } catch (err) {
                return false;
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

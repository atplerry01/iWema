
import { logMessage } from '../../../util/utility';
import { getTodayBirthay_Staff } from './service';

export const getTodayBirthay_StaffRouter = (req, res) => {
    getTodayBirthay_Staff().then((birthdays) => {
        return res.status(200).json(birthdays);
    }).catch(err => {

        logMessage(req, '', 'getTodayBirthay_Staff', '', JSON.stringify(err));

        return res.status(400).json({
            error: err
        });
    });

};

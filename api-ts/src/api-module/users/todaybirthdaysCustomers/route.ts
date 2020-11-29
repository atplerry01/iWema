
import { getTodayBirthay_Customers } from './service';

export const todaybirthdaysCustomersRouter = (_req, res) => {
   getTodayBirthay_Customers().then((birthdays) => {
        return res.status(200).json(birthdays);
    }).catch(err => {
        return res.status(400).json({
            error: err
        });
    });

};


import { getTotalEmpGrade } from './service';

export const totalgradeRouter = (res) => {
    getTotalEmpGrade().then((grades) => {
        return res.status(200).json(grades);
    }).catch(err => {
        return res.status(400).json({
            error: err
        });
    });

};

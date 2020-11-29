import { executeMySQL } from "../../../../db/dbUtil";
import { checkCodeOfConductDeclaration_QUERY, checkCodeOfSafePractice_QUERY, checkConfidentialityDeclaration_QUERY } from "./query";

export const checkConfidentialityDeclaration = (staffId) => {

    return new Promise((resolve, reject) => {

        const query = checkConfidentialityDeclaration_QUERY(staffId);

        executeMySQL(query).then(result => {
            return resolve(result[0].total);
        }).catch((err) => {
            return reject({ err: err, message: "Could not check staff confidentiality" });
        }); // end of execution

    });
};

export const checkCodeOfConductDeclaration = (staffId) => {

    return new Promise((resolve, reject) => {

        const query = checkCodeOfConductDeclaration_QUERY(staffId);

        executeMySQL(query).then(result => {
            return resolve(result[0].total);
        }).catch((err) => {
            return reject({ err: err, message: "Could not check staff confidentiality" });
        }); // end of execution

    });
};

// CodeOfSafePractice
export const checkCodeOfSafePractice = (staffId) => {

    return new Promise((resolve, reject) => {

        const query = checkCodeOfSafePractice_QUERY(staffId);

        executeMySQL(query).then(result => {
            return resolve(result[0].total);
        }).catch((err) => {
            return reject({ err: err, message: "Could not check staff confidentiality" });
        }); // end of execution

    });
};
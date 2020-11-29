import { executeMySQL } from "../../../../db/dbUtil";
import { acceptCodeOfConductDeclaration_QUERY, acceptCodeOfSafePractice_QUERY, acceptConfidentialityDeclaration_QUERY } from "./query";


export const acceptConfidentialityDeclaration = (empNo, email, empName, grade, department) => {

    return new Promise((resolve, reject) => {

        const query = acceptConfidentialityDeclaration_QUERY(empNo, email, empName, grade, department);

        executeMySQL(query).then((result: any) => {
            return resolve(result.affectedRows);
        }).catch((_err) => {
            // console.log(JSON.stringify(_err));
            if (_err.code === 'ER_DUP_ENTRY') {
                return resolve(1);
            }
        
            return reject({ err: _err, message:  'Could not accept staff confidentiality' });
        }); // end of execution

    });
};


export const acceptCodeOfConductDeclaration = (empNo, email, empName, grade, department) => {

    return new Promise((resolve, reject) => {

        const query = acceptCodeOfConductDeclaration_QUERY(empNo, email, empName, grade, department);

        executeMySQL(query).then((result: any) => {
            return resolve(result.affectedRows);
        }).catch((_err) => {
            // console.log(JSON.stringify(_err));
            if (_err.code === 'ER_DUP_ENTRY') {
                return resolve(1);
            }
        
            return reject({ err: _err, message:  'Could not accept staff confidentiality' });
        }); // end of execution

    });
};

// CodeOfSafePractice
export const acceptCodeOfSafePractice = (empNo, email, empName, grade, department) => {

    return new Promise((resolve, reject) => {

        const query = acceptCodeOfSafePractice_QUERY(empNo, email, empName, grade, department);

        executeMySQL(query).then((result: any) => {
            return resolve(result.affectedRows);
        }).catch((_err) => {
            // console.log(JSON.stringify(_err));
            if (_err.code === 'ER_DUP_ENTRY') {
                return resolve(1);
            }
        
            return reject({ err: _err, message:  'Could not accept staff Code Of Safe Practice' });
        }); // end of execution

    });
};

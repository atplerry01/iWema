
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { logMessage } from '../../../../util/utility';
import { acceptCodeOfConductDeclaration, acceptCodeOfSafePractice, acceptConfidentialityDeclaration } from './service';

export const acceptConfidentialityDeclarationRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const empNo = decoded_token.data.company;
        const email = decoded_token.data.mail;
        const empName = decoded_token.data.displayName;
        let grade = 'NIL';
        if (decoded_token.data.grade) {
            grade = decoded_token.data.grade;
        }
        let department = 'NIL';
        if (decoded_token.data.department) {
            department = decoded_token.data.department;
        }

        acceptConfidentialityDeclaration(empNo, email, empName, grade, department).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, empNo, 'acceptConfidentialityDeclaration', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

export const acceptCodeOfConductDeclarationRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const empNo = decoded_token.data.company;
        const email = decoded_token.data.mail;
        const empName = decoded_token.data.displayName;
        let grade = 'NIL';
        if (decoded_token.data.grade) {
            grade = decoded_token.data.grade;
        }
        let department = 'NIL';
        if (decoded_token.data.department) {
            department = decoded_token.data.department;
        }

        acceptCodeOfConductDeclaration(empNo, email, empName, grade, department).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, empNo, 'acceptCodeOfConductDeclaration', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

export const acceptCodeOfSafePracticeRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const empNo = decoded_token.data.company;
        const email = decoded_token.data.mail;
        const empName = decoded_token.data.displayName;
        let grade = 'NIL';
        if (decoded_token.data.grade) {
            grade = decoded_token.data.grade;
        }
        let department = 'NIL';
        if (decoded_token.data.department) {
            department = decoded_token.data.department;
        }

        acceptCodeOfSafePractice(empNo, email, empName, grade, department).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, empNo, 'acceptCodeOfSafePractice', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
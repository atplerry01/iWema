
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { logMessage } from '../../../../util/utility';
import { checkCodeOfConductDeclaration, checkCodeOfSafePractice, checkConfidentialityDeclaration } from './service';

export const checkConfidentialityDeclarationRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const staffId = decoded_token.data.company;

        checkConfidentialityDeclaration(staffId).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, staffId, 'checkConfidentialityDeclaration', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

export const checkCodeOfConductDeclarationRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const staffId = decoded_token.data.company;

        checkCodeOfConductDeclaration(staffId).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, staffId, 'checkCodeOfConductDeclaration', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

export const checkCodeOfSafePracticeRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        //  console.log('decoded_token:', decoded_token);
        const staffId = decoded_token.data.company;

        checkCodeOfSafePractice(staffId).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, staffId, 'checkCodeOfSafePractice', '', JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};

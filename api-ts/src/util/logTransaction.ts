import { TransactionLog } from "../entity/TransactionLogs";
import { logMessage } from "./utility";

export const LogTransaction = async(req: any, user: string, branchcode: string, appName: string, subject: string, 
    message: string, request: string,  response: string) => {

        try {
            
        
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(':')[0];
        const createdDate = new Date();

        await TransactionLog.create({
            user, branchcode, appName, subject, message, request, response, ip, createdDate
        }).save();

        } catch (error) {
            logMessage(req, user, subject, request, response);
        }

    
}
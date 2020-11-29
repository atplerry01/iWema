import { mysqlSanitizeInput } from "../../../../../db/dbUtil";

export const insert_absolete_car_bid_QUERY = (email: string,
    staffid: string,
    obsoleteCarId: string,
    amount: number, 
    staffname: string, 
    grade: string, 
    branchdept: string) => {

        email = mysqlSanitizeInput(email); 
        staffid  = mysqlSanitizeInput(staffid); 
        obsoleteCarId = mysqlSanitizeInput(obsoleteCarId); 
        amount = mysqlSanitizeInput(amount); 
        grade = mysqlSanitizeInput(grade); 
        staffname  = mysqlSanitizeInput(staffname); 
        
        branchdept = mysqlSanitizeInput(branchdept); 

        return `CALL add_bid(${email},
            ${staffid},
            ${obsoleteCarId},
            ${amount},
            ${staffname},
            ${grade},
            ${branchdept});`;


};

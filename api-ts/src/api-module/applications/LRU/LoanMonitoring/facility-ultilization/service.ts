import { createQueryBuilder } from "typeorm";
import { ICases, IFinacleLoans } from "../shared/interfaces";
import { getLoanCollectionsDetails } from "../shared/service";

export const getCollectionSevices = async () => {

    const query = createQueryBuilder("ReviewCase");

    const result = await query.getMany() as ICases[];
    const loanAccountList = result.map(r => r.LoanAccountNumber);

    const finalResult: any[] = [];

    try {
        const finResult = await getLoanCollectionsDetails(loanAccountList) as IFinacleLoans[];

        if (finResult && finResult.length) {
            result.map(r => {
                const indx = finResult.findIndex(fr => fr.LOAN_ACCOUNT_NO === r.LoanAccountNumber);
                if (indx !== -1) {
                    const mergedDate = { ...r, ...finResult[indx] };
                    finalResult.push(mergedDate);
                }
            });
        }
        return finalResult;
    } catch (e) {
        return e;
    }
};
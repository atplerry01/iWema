import * as _ from 'lodash';
import { getMyBranchList } from "../../../../util/branchList";



export const getAccountProfitability_QUERY = (staffId: string, searchterm, type, value, monthFrom: number, monthTo: number, level, scopeLevel) => {
       
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B
    // value => can be accountnumber or branchcode
    return new Promise((resolve, reject) => {

        let q = '';
      
        if (searchterm === '0') { // spool report for one Account number

            q = `SELECT FORACID AccountNo, ACCT_NAME AccountName, CIF_ID CustomerId, 
            SOL_ID BranchNo,  BRANCH Branch, SCHM_CODE ProductCode, SCHEMEDESC Product, SCHM_TYPE Type, 
             OUTSTANDING_BALANCE Balance, TURNOVER_DEBIT TurnoverDebit,  TURNOVER_CREDIT TurnoverCredit,
               AVG_BALANCE_DR AvgBalanceDr,AVG_BALANCE_CR AvgBalanceCr, INTERESTRATE IntRate,LIQUIDITY_RATIO LiquidityRatio,
               CASH_RESERVE CashReserve, POOL_SOURCE PoolSource,INCOME_ON_LIQUIDITY IncomeOnLiquidity,
               POOL_CREDIT PoolCredit,INTEREST_INCOME IntIncome,INTEREST_EXPENSE IntExpense,
               NRFF,ACCT_MAINTENACE AccMaintFee,FEE_INCOME FeeIncome,TOTAL_INCOME TotalIncome,
               EFFECTIVE_YIELD EffectiveYield,TRANSFER_PRICE TransferPrice, 
               ACCOUNTOFFICER AccountMgrId,ACCOUNTOFFICERNAME AccountMgr,concat(MONTH_ROA,'-',YEAR_ROA) as Period 
            FROM account_profitability 
            WHERE CIF_ID = (SELECT CIF_ID FROM account_profitability WHERE FORACID='${value}' LIMIT 1)
             AND MONTH BETWEEN ${monthFrom} AND ${monthTo}`;

            if (level === 'B') {
                q = ` ${q} AND SOL_ID ='${scopeLevel.branchcode}'`;
            } else  if (level === 'S') {
                q = ` ${q} AND ACCOUNTOFFICER ='${staffId}'`; 
            }

        } else if (searchterm === '1' && type === 'a') { // spool asset report by branchcode

            q = `SELECT FORACID AccountNo, ACCT_NAME AccountName, CIF_ID CustomerId, 
            SOL_ID BranchNo,  BRANCH Branch, SCHM_CODE ProductCode, SCHEMEDESC Product, SCHM_TYPE Type, 
             OUTSTANDING_BALANCE Balance, TURNOVER_DEBIT TurnoverDebit, TURNOVER_CREDIT TurnoverCredit,
               AVG_BALANCE_DR AvgBalanceDr,AVG_BALANCE_CR AvgBalanceCr,INTERESTRATE IntRate,INTEREST_INCOME IntIncome, 
               POOL_CREDIT PoolCharge, NRFF,
               ACCT_MAINTENACE AccMaintFee, FEE_INCOME FeeIncome, TOTAL_INCOME TotalIncome, 
               EFFECTIVE_YIELD EffectiveYield,TRANSFER_PRICE TransferPrice,ACCOUNTOFFICER AccountMgrId,
               ACCOUNTOFFICERNAME AccountMgr,concat(MONTH_ROA,'-',YEAR_ROA) as Period  
               FROM account_profitability
            WHERE AVG_BALANCE_DR != 0 
            AND SCHM_TYPE IN('LAA', 'ODA')
            AND MONTH BETWEEN ${monthFrom} AND ${monthTo}`;

            if (level === 'B') {
                q = ` ${q} AND SOL_ID='${scopeLevel.branchcode}'`;
            } else  if (level === 'S') {
              
                q = ` ${q} AND ACCOUNTOFFICER ='${staffId}'`; 
            } else {
                q = ` ${q} AND SOL_ID ='${value}'`;
            }
         
        } else if (searchterm === '1' && type === 'l') { // spool liability report by branchcode

            q = `SELECT FORACID AccountNo, ACCT_NAME AccountName, CIF_ID CustomerId, 
                    SOL_ID BranchNo,  BRANCH Branch, SCHM_CODE ProductCode, SCHEMEDESC Product, SCHM_TYPE Type, 
                    OUTSTANDING_BALANCE Balance, TURNOVER_DEBIT TurnoverDebit,  TURNOVER_CREDIT TurnoverCredit,
                    AVG_BALANCE_DR AvgBalanceDr,AVG_BALANCE_CR AvgBalanceCr,INTERESTRATE IntRate,LIQUIDITY_RATIO LiquidityRatio,
                    CASH_RESERVE CashReserve,POOL_CONTRIBUTION PoolContribution, INCOME_ON_LIQUIDITY IncomeOnLiquidity,
                    POOL_CREDIT PoolCredit,FLOAT_INCOME FloatIncome, INTEREST_EXPENSE IntExpense,NRFF,
                    ACCT_MAINTENACE AccMaintFee,FEE_INCOME FeeIncome,TOTAL_INCOME TotalIncome, 
                    ACCOUNTOFFICER AccountMgrId, ACCOUNTOFFICERNAME AccountMgr,
                    concat(MONTH_ROA,'-',YEAR_ROA) as Period 
                    FROM account_profitability
                    WHERE SCHM_TYPE IN('SBA','ODA', 'TUA', 'CAA', 'TDA') AND MONTH BETWEEN ${monthFrom} AND ${monthTo}`;

            if (level === 'B') {
                q = ` ${q} AND SOL_ID='${scopeLevel.branchcode}'`;
            }  else  if (level === 'S') {
                q = ` ${q} AND ACCOUNTOFFICER ='${staffId}'`; 
            } else {
                q = ` ${q} AND SOL_ID ='${value}'`;
            }
           
        } else if (searchterm === '2') { // consolidated (top 50 customers and lowest 50 customers)
            q = ` ${q} `;
        }

        if (level === 'R' || level === 'Z') {
            getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    const aq = type === 'a' ? ' ORDER BY AVG_BALANCE_DR' : ' ORDER BY TOTAL_INCOME DESC';

                    q = ` ${q} and SOL_ID in(${mybranchlist.toString()}) ${aq}`;
                   
                    return resolve(q);
                } else {
                    return reject({
                        err: null,
                        message: "No branches found for you!"
                    });
                }

            }).catch((err) => {
                return reject({
                    err: err,
                    message: "No branches found for you!"
                });
            });
        } else {
           
           // console.log('q:', q);
           const aq = type === 'a' ? ' ORDER BY AVG_BALANCE_DR' : ' ORDER BY TOTAL_INCOME DESC';
            return resolve(q + aq);
        }

    });
};

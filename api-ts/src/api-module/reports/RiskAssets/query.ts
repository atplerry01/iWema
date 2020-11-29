export const getRiskAssets_QUERY = (bankcode, classification, level, scopeLevel) => {

    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    let q = `SELECT a.account_number account_number,a.accountname account_name,
    Ucase(DATE_FORMAT(STR_TO_DATE(a.date_of_loan, '%d/%m/%Y'), '%d-%b-%Y')) as loan_date, a.loan_amount loan_amount,
    a.outstanding_balance outstanding_balance,ifnull(a.overdue_amount,0) as overdue_amount ,
        a.loan_type loan_type,a.loan_classification loan_classification, b.* FROM LoanProvisioning a
        left join Branches b on a.branch=b.branchcode 
        left join Zones z on z.ZoneCode=b.ZoneCode 
        WHERE b.Status='Y' `;

    if (bankcode !== '0' || level === 'B') {
        if (level === 'B') {
            q = `${q} AND b.branchcode=${scopeLevel.branchcode}`;
        } else {
            q = `${q} AND b.branchcode=${bankcode}`;
        }
    }

    switch (level) {
        case 'R':
            q = ` ${q} AND z.RegionCode='${scopeLevel.regioncode}'`;
            break;
        case 'Z':
            q = ` ${q} AND b.ZoneCode='${scopeLevel.zonecode}'`;
            break;
    }


    if (classification !== 'ALL') {
        q = `${q} AND a.loan_classification='${classification}'`;
    }

    // console.log('q:', q);
    return q;
};

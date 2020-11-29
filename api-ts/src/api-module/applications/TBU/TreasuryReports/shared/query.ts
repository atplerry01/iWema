
export const getTopDepositorsQuery = (amount) => {
    return `select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
    from (select case schm_type when 'ODA' then 'Current Account' end as ProductType,  sol_desc branch,
    foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency,cif_id customerId, custom.getbvn(foracid) bvn
    from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'ODA'
    and clr_bal_amt >=${amount} order by clr_bal_amt desc)
    union all
select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
    from (select case schm_type when 'SBA' then 'Savings Account' end as ProductType,  sol_desc branch,
    foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
    from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'SBA'
    and clr_bal_amt >=${amount} order by clr_bal_amt desc)
    union all
select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
    from (select case schm_type when 'TUA' then 'Term Deposits' end as ProductType,  sol_desc branch,
    foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
    from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type in ('TUA', 'TDA')
    and clr_bal_amt >=${amount} order by clr_bal_amt desc)
    union all
select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
    from (select case schm_type when 'CAA' then 'Call Deposits' end as ProductType,  sol_desc branch,
    foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
    from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'CAA'
    and clr_bal_amt >=${amount} order by clr_bal_amt desc)`;
};

export const getUnrealizedTransactionQuery = () => {
    return `select  buy_deal_num as BuyDealNumber, sell_deal_num as SellDealNumber, trantime as TransactionDate, date_to_realize as DateToRealise, Realized_Qty As QuantityRealized, Holding_Deal_Num As HoldingNumber, ROUND(B.Buy_Price,2) As BuyPrice, ROUND(C.Sell_Price,2) As SellPrice From  D10105.Tt_Sec_Realize_Entry A,(Select Deal_Num, Price Buy_Price From D10105.Tt_Sec_Bs Where Buy_Or_Sell='B') B, (select deal_num,price sell_price from D10105.tt_sec_bs where buy_or_sell='S') c Where Is_Processed = 'N' And A.Buy_Deal_Num=B.Deal_Num and trantime between '01-jan-2019' and '21-jun-2019' order by trantime desc;`;
};

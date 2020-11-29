
 // oracle
 export const getPartLiquidatedFixedDeposit_DrillDown_QUERY = (entityId, startDate, endDate) => {
   
    return `select 
    a.foracid ACCOUNTNO, 
    b.entity_id ENTITYID,
    b.start_date STARTDATE,
    b.cust_cr_pref_pcnt RATE
    from tbaadm.gam a, tbaadm.itc b where a.acid = '${entityId}' 
    and b.cust_cr_pref_pcnt > 0 and b.id_cr_pref_pcnt > 0 
    and b.start_date between '${startDate}' and '${endDate}'`;        
};

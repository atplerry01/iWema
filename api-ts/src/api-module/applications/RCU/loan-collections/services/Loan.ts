import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';

export const getLoanDetailService = async (acc): Promise<any> => {

    try {
        let q = `select gam.CIF_ID CIF_ID,gam.foracid foracid,gam.acct_name ACCT_NAME,gam.sol_id SOL_ID,sol.sol_desc SOL_DESC,
        (select ref_desc from tbaadm.rct where ref_rec_type ='01' and ref_code = sol.CITY_CODE) CITY_DESC,
        (select ref_desc from tbaadm.rct where ref_rec_type='02' and ref_code = sol.STATE_CODE) state,
        gam.ACCT_MGR_USER_ID MANAGER_ID,
        (select emp_name from tbaadm.get where emp_id =(select user_id from tbaadm.upr where user_id=gam.acct_mgr_user_id)) MANAGER_NAME,
        (select ref_desc from tbaadm.rct where ref_rec_type='22' and ref_code =gac.SECTOR_CODE) SECTOR_DESC,
        (select ref_desc from tbaadm.rct where ref_rec_type='23' and ref_code =gac.SUB_SECTOR_CODE) INDUSTRY_DESC,gam.schm_code SCHEME_CODE,
        (select schm_desc from tbaadm.gsp where schm_code =gam.schm_code) SCHEME_DESC,decode(substr(cif_id,1,1),'R','Retail','Corporate') CUST_TYPE,gam.sanct_lim SANCT_LIMIT,gam.DRWNG_POWER DRAW_POWER,
        (select sum(tran_amt) from tbaadm.acpart where b2k_id = gam.acid and b2k_type = 'ACCNT' ) INT_IN_SUSP,LHT.LIM_SANCT_DATE APPROV_DATE,
        LAM.REP_PERD_MTHS TENOR_MONTHS,
        LAM.REP_PERD_DAYS TENOR_DAYS,LHT.LIM_EXP_DATE  EXPIRY_DATE,
        (Select Tran_Date_Bal From Tbaadm.Eab Where Acid=gam.Acid And Eod_Date <='30-jun-2020' And End_Eod_Date >='30-jun-2020')  CLSIN_BAL,
        (select NRML_INTEREST_AMOUNT_DR from tbaadm.eit where entity_id=lam.acid) TOT_INT_AMT,
        (select COLLECTED_CHRGE_AMT from tbaadm.aptt where PTT_EVENT_ID='LAMGTF' and acid = gam.acid) MGT_FEES,
        (select COLLECTED_CHRGE_AMT from tbaadm.aptt where PTT_EVENT_ID='LAPROSF' and acid = gam.acid) PROC_FEES,
        (select PENAL_INT_PCNT from tbaadm.lavs where INT_TBL_CODE = itc.INT_TBL_CODE and rownum=1) PENAL_INT,
        (itc.COMPOUND_INT_PCNT)  PLR,
        (itc.NRML_PCNT_DR - itc.COMPOUND_INT_PCNT) NORMAL_INT,
        (itc.ID_DR_PREF_PCNT) ACCT_PREF_INT,
        (itc.NRML_PCNT_DR + itc.ID_DR_PREF_PCNT ) INTEREST_RATE,
        (select ref_desc from tbaadm.rct where ref_code =lht.SANCT_AUTH_CODE and ref_rec_type='11') SANCT_AUTH_DESC,
        (select min(NEXT_DMD_DATE) from tbaadm.lrs where lrs.acid = gam.acid ) NEXT_DMD_DATE,
        (select sum(flow_amt) from tbaadm.lrs where acid = gam.acid ) REPAYMNT_AMOUNT,
        (select foracid from tbaadm.gam where acid = lam.OP_ACID) REPAYMNT_ACCT,
        (select clr_bal_amt from tbaadm.gam where acid=lam.op_acid) REPAY_ACCT_BAL,
        (select min(dmd_eff_date)from tbaadm.ldt where acid = gam.acid and DMD_FLOW_ID ='PRDEM' and dmd_amt<>tot_adj_amt)PAST_DUE_DATE,
        (select NVL(sum(dmd_amt-tot_adj_amt),0) from tbaadm.ldt where acid = gam.acid and dmd_flow_id ='BCDEM') INSUR_PAST_DUE,
        (select NVL(sum(dmd_amt-tot_adj_amt),0) from tbaadm.ldt where acid = gam.acid and dmd_flow_id ='PRDEM') PRI_PAST_DUE,
        (select NVL(sum(dmd_amt-tot_adj_amt),0) from tbaadm.ldt where acid = gam.acid and dmd_flow_id ='INDEM') INT_PAST_DUE,
        (select NVL(sum(dmd_amt-tot_adj_amt),0) from tbaadm.ldt where acid = gam.acid and dmd_flow_id ='PNDEM') PENAL_PAST_DUE,
        (select NVL((to_number(trunc((sysdate-min(DMD_EFF_DATE)),0))),0) from tbaadm.ldt where acid = gam.acid and DMD_FLOW_ID ='PRDEM' and dmd_amt<>tot_adj_amt) pd,
        (select max(tran_date) from tbaadm.ltd where acid=gam.acid and flow_id='COLL2' and entity_cre_flg='Y' and del_flg='N') CREDIT_TRAN_DATE,
        (select sum(flow_amt) from tbaadm.ltd where acid=gam.acid and flow_id='COLL2' and entity_cre_flg='Y' and del_flg='N'
        and tran_date=(select max(tran_date) from tbaadm.ltd where acid=gam.acid and flow_id='COLL2' and entity_cre_flg='Y' and del_flg='N')) LAST_CR_AMT,
        (select ref_desc from tbaadm.rct where ref_code = acd.MAIN_CLASSIFICATION_SYSTEM and ref_rec_type='BG') MAIN_CLASS_DESC,
        (select ref_desc from tbaadm.rct where ref_code = acd.SUB_CLASSIFICATION_SYSTEM and ref_rec_type='92') SUB_CLASS_DESC
        from tbaadm.gam ,tbaadm.sol ,tbaadm.lht ,tbaadm.gac ,tbaadm.lam,tbaadm.itc,tbaadm.acd
        where gam.acid = gac.acid
        and schm_type in ('LAA')
        and gam.sol_id = sol.sol_id
        and gam.acid = lam.acid
        and lht.status ='A'
        and lht.entity_cre_flg='Y'
        and gam.acid = lht.acid
        and itc.INT_TBL_CODE_SRL_NUM = (select max(INT_TBL_CODE_SRL_NUM) from tbaadm.itc where entity_id = gam.acid)
        and acd.B2K_ID = gam.acid
        and itc.ENTITY_ID = gam.acid
        and GAM.SOL_ID in (select sol_id from tbaadm.sst where set_id = upper('ALL'))
        and lht.sol_id = sol.sol_id
        and lam.acid = lht.acid
        and gam.del_flg='N'
        and gam.entity_cre_flg='Y'
        and acct_cls_flg='N' 
        and schm_code in ('AG007','SF007','SF006','FT009','MC001','FT006','FT004','FT012','FT005','HS002','AL001','FT011','WA005','FT008','TI001','SF015','SF009','SF014')
        and foracid = '${acc}'
        `;
        const result = await executeFinacleLiveQuery(q);

        return result as any;
    } catch (e) {
        return e;
    }
};

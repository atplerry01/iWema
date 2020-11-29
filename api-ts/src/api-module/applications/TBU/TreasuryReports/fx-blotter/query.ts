

export const getCalculateBalQuery = () => {
    // tslint:disable-next-line: max-line-length
    return `select  sum(decode(fx_buy_sell, 'B', -abs(ccy_one_amount_value),'S', abs(ccy_one_amount_value))) total_usd, sum(decode(fx_buy_sell, 'B', -abs(ccy_two_amount_value),'S', abs(ccy_two_amount_value)))  total_ngn from d10105.tt_fx t,d10105.sd_cpty sy,d10105.sd_subtype se where t.cpty_fbo_id_num=sy.fbo_id_num and t.subtype_fbo_id_num=se.fbo_id_num and deal_date >= '01-Sep-2019' and deal_date<'30-Sep-2019' and deal_state <> 'DLTD'`;
};


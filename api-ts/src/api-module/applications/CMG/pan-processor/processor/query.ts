
export const getFINPanQuery = (accountNos: string[]) => {
    return `select g.foracid,p.phoneno, p.email, p.phoneoremail from crmuser.phoneemail p,tbaadm.gam g
    where p.orgkey = g.cif_id and PREFERREDFLAG = 'Y'
    and g.foracid in (${accountNos.map(acc => `'${acc}'`).join(',')})
    ORDER by g.foracid`;
};

import * as _ from 'lodash';
import { getMyBranchList } from "../../../util/branchList";

    // oracle
    export const getCallOver_QUERY = (staffId, selectedDate, branchCode, level, scopeLevel) => {
        // scopeLevel contains object of branchCode, RegionCode and ZoneCode
        // level contains either G, R, Z or B

        // branchCode=0 => display all (consolidated)
        // console.log('branchCode:', branchCode);
        return new Promise((resolve, reject) => {

            let q1 = `select g.foracid,h.tran_type,g.acct_name,h.tran_id,part_tran_srl_num,decode(h.part_tran_type,'C',1,0) * h.tran_amt Credit,
            decode(h.part_tran_type,'D',1,0) * h.tran_amt Debit ,tran_particular narration,h.tran_date,h.value_date,init_sol_id,
            h.entry_user_id,h.pstd_user_id, h.VFD_USER_ID,h.part_tran_type,
            h.tran_sub_type, h.tran_particular_2 from tbaadm.gam g,tbaadm.dtd h, tbaadm.dth s where g.acid=h.acid and h.tran_date=s.tran_date 
            and h.tran_id=s.tran_id 
            and h.pstd_flg='Y' 
            and h.del_flg='N'  and h.entry_user_id <>'CDCI'  
            and  h.tran_date = '${selectedDate}'`;

            if (level !== 'B' || level === 'S') {
                if (!branchCode) {
                    return reject({
                        err: null,
                        message: "Branch is required!"
                    });
                }

                q1 = `${q1} and s.init_sol_id= '${branchCode}' `;
            }

            let q2 = `  select g.foracid,h.tran_type,g.acct_name,h.tran_id,part_tran_srl_num,
                decode(h.part_tran_type,'C',1,0) * h.tran_amt Credit,decode(h.part_tran_type,'D',1,0) * h.tran_amt Debit,
                tran_particular narration,h.tran_date,h.value_date,init_sol_id,h.entry_user_id,h.pstd_user_id, h.VFD_USER_ID,
                h.part_tran_type,
                h.tran_sub_type,h.tran_particular_2   
                from tbaadm.gam g,tbaadm.htd h ,tbaadm.hth s
                where g.acid=h.acid
                and h.tran_date=s.tran_date
                and h.tran_id=s.tran_id  and h.entry_user_id <>'CDCI'
                and h.del_flg='N'  and h.pstd_flg='Y' 
                and  h.tran_date = '${selectedDate}' `;

            if (level !== 'B' || level === 'S') {
                q2 = `${q2} and s.init_sol_id= '${branchCode}' `;
            }

            // console.log('level:', level);                                 
            if (level === 'G') {
                q2 = `${q2}  order by entry_user_id,tran_date,tran_id`;
                const q = `${q1} union ${q2}`;
                return resolve(q);
            } else if (level === 'R' || level === 'Z') {
                getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                    if (branches.length) {
                        const mybranchlist: any[] = [];
                        _.each(branches, (val, _key) => {
                            mybranchlist.push(val.branchcode);
                        });

                        q1 = ` ${q1} and s.init_sol_id in(${mybranchlist.toString()})`;
                        q2 = ` ${q2} and s.init_sol_id in(${mybranchlist.toString()}) order by entry_user_id,tran_date,tran_id`;
                        const q = `${q1} union ${q2}`;
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

            } else if (level === 'B') {
                q1 = ` ${q1} and s.init_sol_id ='${scopeLevel.branchcode}'`;
                q2 = ` ${q2} and s.init_sol_id ='${scopeLevel.branchcode}' order by entry_user_id,tran_date,tran_id`;

                const q = `${q1} union ${q2}`;
                return resolve(q);
            } else if (level === 'S') {
                q1 = ` ${q1} and h.entry_user_id=upper('${staffId}')`;
                q2 = ` ${q2} and h.entry_user_id=upper('${staffId}')  order by entry_user_id,tran_date,tran_id`;

                const q = `${q1} union ${q2}`;
                return resolve(q);
            } else {
                return reject('Invalid request');
            }


        });
    };

// import { Like } from 'typeorm';
import { executeSQLServer } from './../../../../../db/dbUtil';
import { Archive } from './../../../../../entity/HCM/Archive';
// import { EmployeeMaster } from './../../../../../entity/iWEMA/EmployeeMaster';


export const getFileManagerSevices = async (searchText) => {
    // name: Like(`%${firstName}%`)
    let q: any = `
    SELECT [id] ,[employee_id] ,[employee_number] ,[employee_surname] ,[employee_midname],[employee_firstname], 
    [employment_date], [mobile_phone], [email],[isActive] 
    FROM [X365Integration].[dbo].[ads_sync_employee_information_current]
    WHERE employee_number like '%${searchText}%' OR employee_surname like '%${searchText}%' OR employee_firstname like '%${searchText}%'
    `;
    
    let sqlResult: any = [];
    sqlResult = await executeSQLServer(q, {}, 'Xceed365');

    const archiveData = await Archive.find();
    const finalResult: any[] = [];

    sqlResult.forEach(e => {
        const indx = archiveData.findIndex(ar => ar.EmpNo === e.employee_number);
        if (indx !== -1) {
            const mergedDate = { ...e, ...archiveData[indx], fullname: e.employee_surname + ' ' + e.employee_firstname };
            finalResult.push(mergedDate);
        }
    });

    return finalResult;
};

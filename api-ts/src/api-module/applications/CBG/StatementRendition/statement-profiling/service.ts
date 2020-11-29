import { getConnection } from 'typeorm';
import { SRCifAccount } from './../../../../../entity/CBG/StatementRendition/SRCifAccount';
import { SRCustomerProfile } from './../../../../../entity/CBG/StatementRendition/SRCustomerProfile';

export const createStatementRendition = async (
  cifAccount: any,
  accountName: any,
  primaryEmail: any,
  docFormat: any,
  frequency: any,
  ccEmail: any,
  bccEmail: any,
  setupBy,
  branch: any,
  month: any,
  day: any,
  weekday: any,
  accountList: string[]
) => {

  if (accountList.length < 1) {
    return false;
  }
 
  const saveEntity = await SRCustomerProfile.create({
    cifAccount,
    accountName,
    primaryEmail,
    docFormat,
    frequency,
    status: "pending",
    ccEmail,
    bccEmail,
    setupBy,
    branch,
    month,
    day,
    weekday,
    scheduleTime: new Date().toDateString(),
    setupDate: new Date()
  }).save();

  if (saveEntity) {
    // this is the list
    const recordlists: any = [];
    accountList.forEach((accountNumber) => {
      recordlists.push({
        profileId: saveEntity.id,
        cifAccount,
        accountNumber
      });
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(SRCifAccount)
      .values(recordlists)
      .execute();
    return true;
  } else {
    return false;
  }

};


export const getProfiledAccounts = async (cifAccount: string, docFormat: string, frequency: string) => {

  return getConnection().query(
    `SELECT a.accountNumber FROM SRCifAccount a JOIN SRCustomerProfile f ON a.profileId = f.id 
    WHERE a.cifAccount='${cifAccount}' AND f.frequency='${frequency}' AND f.docFormat='${docFormat}'`);
};

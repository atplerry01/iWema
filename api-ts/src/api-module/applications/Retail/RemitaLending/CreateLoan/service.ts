import { RemitaLending } from '../../../../../entity/Retail/RemitaLending';

export const CreateLoan = async (
  customerId: string,
  customerName: string,
  phoneNumber: string,
  accountNumber: string,
  bankCode: string,
  authCode: string,
  bvn: string,
  loanAmount: number,
  collectionAmount: number,
  numberOfRepayments: number,
  dateOfCollection: string,
  totalCollectionAmount: number,
  makerId: string,
  intRate: number

) => {


  return RemitaLending.create({
    customerId,
    customerName,
    phoneNumber,
    accountNumber,
    bankCode,
    authCode,
    bvn,
    loanAmount,
    collectionAmount,
    intRate,
    numberOfRepayments,
    dateOfCollection,
    totalCollectionAmount,
    status: 'p',
    makerId,
    makerDate: new Date()
  }).save();

};


// export const getProfiledAccounts = async (cifAccount: string, docFormat: string, frequency: string) => {

//   return getConnection().query(
//     `SELECT a.accountNumber FROM SRCifAccount a JOIN SRCustomerProfile f ON a.profileId = f.id 
//     WHERE a.cifAccount='${cifAccount}' AND f.frequency='${frequency}' AND f.docFormat='${docFormat}'`);
// };

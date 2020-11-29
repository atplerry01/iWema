import * as moment from 'moment';
import { RemitaLending } from '../../../../../entity/Retail/RemitaLending';

export const UpdateRemitaLending = async (
    id: number,
    mandateReference: string,
  checkerId: string
) => {

const result = await RemitaLending.findOne(id);

if (!result) {
    return null;
}

const dt = new Date();
result. mandateReference = mandateReference;
result.dateOfDisbursement = moment(dt).format('DD-MM-YYYY') + ' 00:00:00',
result.checkerId = checkerId;
result.checkerDate = dt;
result.status = 'a';

 return result.save();

};

// export const getProfiledAccounts = async (cifAccount: string, docFormat: string, frequency: string) => {

//   return getConnection().query(
//     `SELECT a.accountNumber FROM SRCifAccount a JOIN SRCustomerProfile f ON a.profileId = f.id 
//     WHERE a.cifAccount='${cifAccount}' AND f.frequency='${frequency}' AND f.docFormat='${docFormat}'`);
// };

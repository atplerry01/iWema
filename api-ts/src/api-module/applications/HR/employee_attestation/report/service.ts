import { EmployeeAttestation } from "../../../../../entity/EmployeeAttestation";
import { Paginator, checkAccess } from "../../../../../util/utility";


export const AttestateReport = async (accessLevels, _export = 0, page = 1, per_page = 50) => {

  return new Promise( async(res, rej) => {

     checkAccess('Employee Attestation Report', accessLevels).then(async() => {

      const result = await EmployeeAttestation.find({ 
        order: {
            date_accepted: "ASC"
        }
    });

    if (_export === 1) {
      return res(result);
    }

    return res(Paginator(result, page, per_page));

     }).catch(err => {
        return rej({ err, message: "Access Denied. Unauthorized User" });
     });

  });


  };


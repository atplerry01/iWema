import * as rp from "request-promise";

    const options = {
      withCredentials: false,
      jar: rp.jar(),
      headers: {
        'x-access-token': 'xxxxxxxxxxxxxxxxx'
    },
      json: true
    };
  

  export const postGetsalarypaymentHistory = async(body: object) => {
    return rp.post(process.env.RemitaLendingBaseUrl + '/GetsalarypaymentHistory', {
      ...options,
      body
    });
  };

  export const postLoanDisbursementNot = async (body: object) => {
    return rp.post(process.env.RemitaLendingBaseUrl + '/LoanDisbursementNot', {
      ...options,
      body
    });
  };

  export const postStopLoanCollectionService = async (body: object) => {
    return rp.post(process.env.RemitaLendingBaseUrl + '/StopLoanCollectionService', {
      ...options,
      body
    });
  };


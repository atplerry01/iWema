import * as rp from "request-promise";

    const options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true
    };
  

  export const postLiveDB = async(body: object) => {
    return rp.post(process.env.iwemaOracleConnector_BaseUrl + '/livedb', {
      ...options,
      body
    });
  };

  export const postDR = async (body: object) => {
    return rp.post(process.env.iwemaOracleConnector_BaseUrl + '/drdb', {
      ...options,
      body
    });
  };

  export const postTreasury = async (body: object) => {
    return rp.post(process.env.iwemaOracleConnector_BaseUrl + '/treasurydb', {
      ...options,
      body
    });
  };



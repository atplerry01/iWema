
  export interface IAccountPhoneEmail {
    FORACID: string;
    PHONENO?: string;
    EMAIL?: string;
    PHONEOREMAIL: string;
  }

  export interface IDownloadable {
    ACTION: string;
    PAN: string;
    MOBILENUMBER: string;
    EMAIL?: string;
    SEGMENTATIONINDICATOR: string;
    ACCOUNTNO?: string;
  }

  export interface IParam{
    pan: string;
    accno: string;
  }

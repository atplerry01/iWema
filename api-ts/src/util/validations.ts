

 export const isEmail = (emaill) => {
    // tslint:disable-next-line:max-line-length
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(emaill);
  };

  export const isValidAccountNo = (accNo) => {
    
    if (!accNo || isNaN(Number(accNo)) || accNo.length !== 10) {
      return false;
    }

    return true;
  };

  export const isValidBranchCode = (branchcode) => {
    
    if (!branchcode || isNaN(Number(branchcode)) || branchcode.length !== 3) {
      return false;
    }

    return true;
  };

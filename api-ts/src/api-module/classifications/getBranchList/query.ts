export const getBranchList_QUERY = () => {
    return `SELECT BranchCode branchcode, BranchName branch, ZoneCode zonecode FROM Branches 
                        WHERE status='Y'  ORDER BY BranchName`;
  };

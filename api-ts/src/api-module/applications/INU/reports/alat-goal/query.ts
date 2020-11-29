// MandateByBranchWith
// MandateByProduct

export const getAlatGoalQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select d.CIF,AccountName, GoalName,GoalTypeId,c.Name,a.DateCreated,DebitAccount,goalstatus,b.Status,AmountSaved
  from SavingGoal a, GoalStatus b, GoalType c,Registration d,CustomerAccount e
  where a.GoalStatus = b.Id
  and a.GoalTypeId = c.Id
  and a.CustomerId = d.CustomerProfileId
  and a.DebitAccount =e.AccountNumber`;
}; //

// MandateByBranchWith
// MandateByProduct

export const getAlatDocQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select CIF,AccountNumber,AccountName, b.Name,c.Status, a.DateCreated
  from CustomerDocumentation a, DocumentType b,  DocumentUploadStatus c, CustomerAccount d,Registration e
  where a.DocumentTypeId = b.Id and a.CustomerProfileId = e.CustomerProfileId
  and a.Status = c.Id and b.Name in ('Signature','Identity','Passport','ResidentPermit','Utility','Residential Address')
  and a.CustomerProfileId = d.CustomerId and AccountType not in ('Piggy Account','ALAT Loan')`;
}; //

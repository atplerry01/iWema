import { EmployeeAttestation } from "../../../../../entity/EmployeeAttestation";


export const Attestate = async(email: string, staffId: string, name: string) => {
    const count = await EmployeeAttestation.count({ where: { email: { email } } });
    if (count < 1) {
     return EmployeeAttestation.create({email, staffId, name}).save();
    }
    return null;
  };


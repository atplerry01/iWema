import { RemitaLending } from '../../../../../entity/Retail/RemitaLending';

export const StopRemitaLendingLoan = async (
    id: number,
    stoppedby: string
) => {

const result = await RemitaLending.findOne(id);

if (!result) {
    return null;
}

result.stoppedDate = new Date();
result.stoppedby = stoppedby;
result.status = 's';

 return result.save();

};

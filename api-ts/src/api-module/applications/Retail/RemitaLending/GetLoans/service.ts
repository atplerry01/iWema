import { getRepository } from 'typeorm';
import { RemitaLending } from '../../../../../entity/Retail/RemitaLending';

export const getLoanId = id => {
  return RemitaLending.findOne(id);
};

export const getLoans = (
  type?: string,
  start?: string,
  end?: string,
  phoneNumber?: string
) => {

   let query = getRepository(RemitaLending)
    .createQueryBuilder('p');

    if (type) {
      query = query.andWhere('p.status = :type', { type });
    }


    if (phoneNumber) {
      query = query.andWhere('p.phoneNumber = :phoneNumber', { phoneNumber });
    }

    if (start && end) {
      query = query.andWhere('DATE(p.makerDate) >= :start and DATE(p.makerDate) <= :end', { start, end });
    } else if (start) {
    query = query.andWhere('DATE(p.makerDate) = :start', { start });
    } else if (end) {
      query = query.andWhere('DATE(p.makerDate) = :end', { end });
      }

    return query.getMany();
};

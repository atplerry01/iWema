import { getRepository } from 'typeorm';
import { SRCustomerProfile } from './../../../../../entity/CBG/StatementRendition/SRCustomerProfile';

export const getStatementRenditionById = id => {
  return SRCustomerProfile.findOne(id);
};

export const getStatementRenditions = (
  type?: string,
  branch?: string,
  start?: string,
  end?: string,
  cif?: string
) => {

   let query = getRepository(SRCustomerProfile)
    .createQueryBuilder('p');

    if (type) {
      query = query.andWhere('p.status = :type', { type });
    }

    if (branch) {
      query = query.andWhere('p.Branch = :branch', { branch });
    }

    if (cif) {
      query = query.andWhere('p.cifAccount = :cif', { cif });
    }

    if (start && end) {
      query = query.andWhere('DATE(p.setupDate) >= :start and DATE(p.setupDate) <= :end', { start, end });
    } else if (start) {
    query = query.andWhere('DATE(p.setupDate) = :start', { start });
    } else if (end) {
      query = query.andWhere('DATE(p.setupDate) = :end', { end });
      }

    return query.getMany();
};

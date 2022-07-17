import { isBoolean } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';

export function filterByDate({
  fromDate,
  toDate,
  sqlTable,
  query,
}: {
  fromDate: Date;
  toDate: Date;
  sqlTable: string;
  query: SelectQueryBuilder<any>;
}) {
  if (fromDate && toDate) {
    return query.andWhere(`${sqlTable}.date BETWEEN :fromDate AND :toDate`, {
      fromDate,
      toDate,
    });
  }
}
export function filterByName({
  name,
  query,
  type,
}: {
  name: string;
  query: SelectQueryBuilder<any>;
  type: string;
}) {
  // total: boolean = false,
  if (name) {
    // if (total) {
    //   query.leftJoinAndSelect(`${sqlTable}.${type}`, type);
    // }
    return query.andWhere(`${type}.name = :name`, { name });
  }
}

export function filterByApproved({
  approved,
  sqlTable,
  query,
}: {
  approved: boolean;
  sqlTable: string;
  query: SelectQueryBuilder<any>;
}) {
  if (isBoolean(approved)) {
    return query.andWhere(`${sqlTable}.approved = :approved`, { approved });
  }
}

export function filterByExactDate({
  date,
  sqlTable,
  query,
}: {
  date: Date;
  sqlTable: string;
  query: SelectQueryBuilder<any>;
}) {
  if (date) {
    return query.andWhere(`${sqlTable}.date = :date`, { date });
  }
}

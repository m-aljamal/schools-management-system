import { AbsentArgs } from 'src/shared/absentArgs';
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
  if (name) {
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

export function findAllAbsent({
  sqlTable,
  query,
  args,
  type,
}: {
  sqlTable: string;
  query: SelectQueryBuilder<any>;
  args: AbsentArgs;
  type: string;
}) {
  query.leftJoinAndSelect(`${sqlTable}.${type}`, type);
  query.leftJoinAndSelect(`${sqlTable}.archive`, 'archive');
  query.leftJoinAndSelect(`${type}.levels`, 'level');
  if (args.levelId) {
    query.andWhere('level.id = :levelId', { levelId: args.levelId });
  }
  query.andWhere('archive.id = :archiveId', { archiveId: args.archiveId });
  filterByExactDate({
    date: args.date,
    query,
    sqlTable,
  });
  filterByApproved({
    approved: args.approved,
    query,
    sqlTable,
  });
  filterByName({
    name: args.name,
    query: query,
    type,
  });
  filterByDate({
    fromDate: args.fromDate,
    toDate: args.toDate,
    query,
    sqlTable,
  });
  return query;
}

export function findTotalAbsent({
  sqlTable,
  query,
  args,
  type,
}: {
  sqlTable: string;
  query: SelectQueryBuilder<any>;
  args: AbsentArgs;
  type: string;
}) {
  query.select(`${type}.id`, 'id');
  query.addSelect(`${type}.name`, 'name');
  query.addSelect('COUNT(*)', 'count');
  query.innerJoin(`${sqlTable}.${type}`, type);
  query.groupBy(`${type}.id`);
  query.leftJoinAndSelect(`${sqlTable}.archive`, 'archive');
  query.andWhere('archive.id = :archiveId', { archiveId: args.archiveId });
  query.addGroupBy('archive.id');
  if (args.semesterId) {
    query.andWhere(`${sqlTable}.semesterId = :semesterId`, {
      semesterId: args.semesterId,
    });
  }
  filterByExactDate({
    date: args.date,
    query,
    sqlTable,
  });
  filterByApproved({
    approved: args.approved,
    query,
    sqlTable,
  });
  filterByName({
    name: args.name,
    query,
    type,
  });
  filterByDate({
    fromDate: args.fromDate,
    toDate: args.toDate,
    query,
    sqlTable,
  });
  return query;
}

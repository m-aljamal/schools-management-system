import { FindLevelArgs } from 'src/level/dto/FindLevel.args';
import { SelectQueryBuilder } from 'typeorm';

export function findLevels(
  args: FindLevelArgs,
  query: SelectQueryBuilder<any>,
) {
  query.where('archive.projectId = :projectId', {
    projectId: args.projectId,
  });
  query.andWhere('archive.name = :archiveName', {
    archiveName: args.archiveName,
  });
  query.leftJoinAndSelect('level.archive', 'archive');
  query.leftJoinAndSelect('level.divisions', 'division');
  return query;
}

import { FindLevelArgs } from 'src/level/dto/FindLevel.args';
import { SelectQueryBuilder } from 'typeorm';

export function findLevels(
  args: FindLevelArgs,
  query: SelectQueryBuilder<any>,
) {
  query.where('archive.projectId = :projectId', {
    projectId: args.projectId,
  });
  query.andWhere('archive.id = :archiveId', {
    archiveId: args.archiveId,
  });
  query.leftJoinAndSelect('level.archive', 'archive');
  query.leftJoinAndSelect('level.divisions', 'division');
  return query;
}

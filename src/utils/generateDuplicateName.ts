import { Repository } from 'typeorm';

export async function generateDuplicateName(
  repository: Repository<any>,
  baseName: string,
  field: string,
  whereClause: Record<string, any> = {},
): Promise<string> {
  const qb = repository
    .createQueryBuilder('entity')
    .where(`entity.${field} LIKE :name`, { name: `${baseName} (복사본%)` });

  // whereClause가 있을 경우 수동으로 andWhere 추가
  Object.entries(whereClause).forEach(([key, value]) => {
    qb.andWhere(`entity.${key} = :${key}`, { [key]: value });
  });

  const existing = await qb.getMany();

  const numbers = existing
    .map((e: any) => {
      const match = e[field]?.match?.(/\(복사본(?: (\d+))?\)$/);
      return match ? parseInt(match[1] || '1', 10) : 1;
    })
    .filter((n) => !isNaN(n));

  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = maxNum + 1;
  return `${baseName} (복사본${nextNum > 1 ? ' ' + nextNum : ' '})`;
}

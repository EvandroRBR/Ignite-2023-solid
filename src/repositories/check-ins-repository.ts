import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserIds(userId: string): Promise<number>;
  findById(id: string): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}

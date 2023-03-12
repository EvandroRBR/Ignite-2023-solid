import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

import { CheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOdTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOdTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async countByUserIds(userId: string) {
    const numberOfCheckIns = this.items.filter(
      (item) => item.user_id === userId,
    ).length;

    return numberOfCheckIns;
  }
}

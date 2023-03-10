import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseRespose {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseRespose> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}

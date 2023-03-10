import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, beforeEach, expect, it } from 'vitest';
import { CheckInUseCase } from '../check-in';

let checkInsRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});

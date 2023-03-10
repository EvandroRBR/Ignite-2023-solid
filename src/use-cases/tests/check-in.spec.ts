import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, beforeEach, expect, it, vi, afterEach } from 'vitest';
import { CheckInUseCase } from '../check-in';

let checkInsRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 3, 10, 9, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    console.log('checkIn: ', checkIn);
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 10, 11, 15, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it.only('should be able to check in twice in tbut in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 9, 11, 15, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    vi.setSystemTime(new Date(2023, 3, 10, 11, 15, 0));

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).resolves.toBeTruthy();
  });
});

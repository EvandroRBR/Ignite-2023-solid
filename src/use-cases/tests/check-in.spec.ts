import { describe, beforeEach, expect, it, vi, afterEach } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CheckInUseCase } from '../check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

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
      userLatitude: -23.189333,
      userLongitude: -45.9330525,
    });

    console.log('checkIn: ', checkIn);
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 10, 11, 15, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.189333,
      userLongitude: -45.9330525,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.189333,
        userLongitude: -45.9330525,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it.only('should be able to check in twice in tbut in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 9, 11, 15, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.189333,
      userLongitude: -45.9330525,
    });

    vi.setSystemTime(new Date(2023, 3, 10, 11, 15, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.189333,
      userLongitude: -45.9330525,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '../create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('Shoud be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Title',
      description: null,
      phone: null,
      latitude: -23.1715332,
      longitude: -45.7995071,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});

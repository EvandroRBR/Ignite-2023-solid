import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from '../search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('Should be able to search for', async () => {
    await gymsRepository.create({
      title: 'gym-js',
      description: null,
      phone: null,
      latitude: -23.1715332,
      longitude: -45.7995071,
    });

    await gymsRepository.create({
      title: 'gym-ts',
      description: null,
      phone: null,
      latitude: -23.0715332,
      longitude: -45.6995071,
    });

    const { gyms } = await sut.execute({
      query: 'gym-js',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect.objectContaining({ title: 'gym-js' });
  });

  it('Should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript-${i}`,
        description: null,
        phone: null,
        latitude: -23.1715332,
        longitude: -45.7995071,
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect.objectContaining({ title: 'JavaScript-21' });
    expect.objectContaining({ title: 'JavaScript-22' });
  });
});

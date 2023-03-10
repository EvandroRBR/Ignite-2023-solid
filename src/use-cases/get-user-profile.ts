import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUsersProfileUseCaseRequest {
  userId: string;
}

interface GetUsersProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
  }: GetUsersProfileUseCaseRequest): Promise<GetUsersProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}

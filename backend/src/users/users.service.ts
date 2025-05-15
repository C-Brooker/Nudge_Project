import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ConflictException(
        existingUser.username === username
          ? 'Username is Taken'
          : 'Email is Taken',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToAdd = this.usersRepository.create({
      username: username,
      email: email,
      password: hashedPassword,
      profile: this.profilesRepository.create(),
    });
    return await this.usersRepository.save(userToAdd);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User #${username} not found`);
    }
    return user;
  }

  async findOneByID(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}

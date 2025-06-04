import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const mockUser = {
    _id: '123',
    name: 'João',
    email: 'joao@example.com',
    age: 25,
  };

  const mockUserArray = [mockUser];

  const mockUserModel = {
    find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUserArray) }),
    findOne: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) }),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Object.assign(
            function MockUserModel(dto) {
              return {
                ...dto,
                save: jest.fn().mockResolvedValue(mockUser),
              };
            },
            mockUserModel
          ),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('deve retornar todos os usuários (get)', async () => {
    const result = await service.get();
    expect(result).toEqual(mockUserArray);
  });

  it('deve retornar o usuário pelo ID (find)', async () => {
    const result = await service.find('123');
    expect(result).toEqual(mockUser);
  });

  it('deve criar um novo usuário (create)', async () => {
    const result = await service.create({
      name: 'João',
      email: 'joao@example.com',
      age: 25,
    });

    expect(result).toEqual(mockUser);
  });

  it('deve atualizar os dados do usuário (update)', async () => {
    mockUserModel.findByIdAndUpdate.mockResolvedValue(mockUser);

    const result = await service.update('123', { name: 'Joãozinho' });
    expect(result).toEqual(mockUser);
  });

  it('deve lançar erro se usuário se não encontrar o usuário (update)', async () => {
    mockUserModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(service.update('999', { name: 'Não Existe' })).rejects.toThrow(NotFoundException);
  });

  it('deve deletar o usuário pelo ID (delete)', async () => {
    mockUserModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await service.delete('123');
    expect(result).toEqual({ deleted: true });
  });
});
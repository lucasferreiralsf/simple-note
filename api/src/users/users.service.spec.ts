import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUser } from './users.schema';
import { Model } from 'mongoose';
import { UsersModule } from './users.module';

fdescribe('UsersService', () => {
  let service: UsersService;
  let model;
  beforeEach(() => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [UsersModule],
    //   // providers: [
    //   //   UsersService,
    //   //   {
    //   //     provide: mongoose.Model,
    //   //     useValue: {
    //   //       create: () => {},
    //   //       findOneAndUpdate: () => {},
    //   //       findOne: () => {
    //   //         const select = () => {};
    //   //       },
    //   //     },
    //   //   },
    //   // ],
    // })
    // .overrideProvider(mongoose.Model)
    // .useValue({
    //   create: () => {},
    //   findOneAndUpdate: () => {},
    //   findOne: () => {
    //     const select = () => {};
    //   },
    // })
    // .compile();

    jest.mock('Model');
    model = {
      create: () => {},
      findOneAndUpdate: () => {},
      findOne: () => {
        return { select: () => {} };
      },
    };
    service = new UsersService(new Model());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be store a user', async () => {
    const user = {
      firstName: 'Test',
      lastName: 'Last Name',
      email: 'test@test.com',
      primaryPhoneNumber: 123456,
      password: '123',
    };
    jest.spyOn(Model, 'create').mockReturnValue(Promise.resolve(user) as any);
    expect(await service.store(user as any)).toBe(user);
  });

  it('should be update a user', async () => {
    const user = {
      firstName: 'Test',
      lastName: 'Last Name',
      email: 'test@test.com',
      primaryPhoneNumber: 123456,
      password: '123',
    };
    jest.spyOn(Model, 'update').mockReturnValue(Promise.resolve(user) as any);
    expect(await service.update(user as any)).toBe(user);
  });

  it('should be find a user by email', async () => {
    const user = {
      firstName: 'Test',
      lastName: 'Last Name',
      email: 'test@test.com',
      primaryPhoneNumber: 123456,
      password: '123',
    };
    jest.spyOn(Model, 'findOne').mockReturnValue(Promise.resolve(user) as any);
    expect(await service.findByEmail('test@test.com')).toBe(user);
  });
});

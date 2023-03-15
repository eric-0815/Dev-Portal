import User from '../../models/User.model';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, UserRegistration } from '../users.service';

jest.mock('../../models/User.model');
jest.mock('gravatar');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('createUser function', () => {
  const mockUser = new User({
    name: 'Test User',
    email: 'testuser@example.com',
    avatar: '',
    password: 'testpassword'
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and return a token', async () => {
    const mockGravatarUrl = 'https://www.gravatar.com/avatar/testavatar.jpg';
    const mockHashedPassword = 'hashedpassword';
    const mockToken = 'mocktoken';

    const userRegistration: UserRegistration = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword',
      avatar: ''
    };

    (User as any).findOne.mockResolvedValue(null);
    (gravatar.url as any).mockReturnValue(mockGravatarUrl);
    (bcrypt.hash as any).mockResolvedValue(mockHashedPassword);
    (jwt.sign as any).mockReturnValue(mockToken);

    const result = await createUser(userRegistration);
    // @ts-ignore
    expect(result.token).toEqual(mockToken);
    expect(User as any).toHaveBeenCalledTimes(1);
    expect(User as any).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'testuser@example.com',
      avatar: 'https://www.gravatar.com/avatar/testavatar.jpg',
      password: 'testpassword'
    });
    expect(mockUser.save).toHaveBeenCalledTimes(1);
    expect(jwt.sign as any).toHaveBeenCalledTimes(1);
  });

  it('should return an error message if the user already exists', async () => {
    const userRegistration: UserRegistration = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword',
      avatar: ''
    };

    (User as any).findOne.mockResolvedValue(mockUser);

    const result = await createUser(userRegistration);

    expect(result.errors).toBeDefined();
    expect(User as any).toHaveBeenCalledTimes(0);
    expect(mockUser.save).not.toHaveBeenCalled();
    expect(jwt.sign as any).not.toHaveBeenCalled();
  });

});

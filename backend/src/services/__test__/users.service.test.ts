import User from '../../models/User.model';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkPassword, checkIfUserExists, createUser, getUserByEmail, UserRegistration, createAvatar } from '../users.service';

jest.mock('../../models/User.model');
jest.mock('gravatar');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('user service', () => {
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

  describe('checkIfUserExists', () => {
    it('should return true if a user with the given email exists', async () => {
      const User = require("../../models/User.model").default;
      User.findOne.mockResolvedValueOnce({ email: 'test@example.com' });

      const result = await checkIfUserExists('test@example.com');

      expect(result).toBe(true);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should return false if a user with the given email does not exist', async () => {
      const User = require("../../models/User.model").default;
      User.findOne.mockResolvedValueOnce(null);

      const result = await checkIfUserExists('test@example.com');

      expect(result).toBe(false);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('getUserByEmail', () => {
    it('should return the user with the given email if they exist', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };

      const User = require("../../models/User.model").default;
      User.findOne.mockResolvedValueOnce(mockUser);

      const result = await getUserByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should return null if a user with the given email does not exist', async () => {
      const User = require("../../models/User.model").default;
      User.findOne.mockResolvedValueOnce(null);

      const result = await getUserByEmail('test@example.com');

      expect(result).toBeNull();
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });


  // describe('checkPassword', () => {
  //   it('should return true if passwords match', async () => {
  //     (bcrypt.compare as any).mockResolvedValueOnce(true);

  //     const result = await checkPassword('password', 'hashedPassword');

  //     expect(result).toBe(true);
  //     expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
  //   });

  //   it('should return false if passwords do not match', async () => {
  //     (bcrypt.compare as any).mockResolvedValueOnce(false);

  //     const result = await checkPassword('password', 'hashedPassword');

  //     expect(result).toBe(false);
  //     expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
  //   });
  // });

  // describe('createAvatar', () => {
  //   it('should return the avatar url for the given email', () => {
  //     (gravatar.url as any).mockReturnValueOnce('https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50');

  //     const result = createAvatar('test@example.com');

  //     expect(result).toBe('https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50');
  //     expect(gravatar.url).toHaveBeenCalledWith('test@example.com', {
  //       s: '200',
  //       r: 'pg',
  //       d: 'mm',
  //     });
  //   });
  // });
});

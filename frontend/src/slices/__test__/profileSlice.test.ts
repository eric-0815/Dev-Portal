import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getProfileAsync,
  getProfilesAsync,
  getGithubReposAsync,
  createOrUpdateProfileAsync,
  addExperienceAsync,
  addEducationAsync,
  deleteExperienceAsync,
  deleteEducationAsync,
  deleteAccountAsync,
  profileSlice,
} from '../profileSlice';
import agent from '../../api/agent';

jest.mock('../../api/agent');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('profileSlice', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getProfileAsync', () => {
    it('should dispatch the correct actions on success', async () => {
      const mockResult = { profile: { name: 'John Doe' } };
      (agent.Profile.getProfile as jest.Mock).mockResolvedValue(mockResult);
      const store = mockStore({});

      //@ts-ignore
      await store.dispatch(getProfileAsync('123'));
      const actions = store.getActions();

      expect(actions).toContainEqual({ type: 'profile/clearProfile' });
      expect(actions).toContainEqual({
        type: 'profile/getProfileSuccess',
        payload: mockResult,
      });
      expect(actions[0].type).toEqual('profile/getProfileAsync/pending');
      expect(actions[1].type).toEqual('profile/clearProfile');
      expect(actions[2].type).toEqual('profile/getProfileSuccess');
      expect(actions[2].payload).toEqual(mockResult);
      expect(actions[3].type).toEqual('profile/getProfileAsync/fulfilled');
    });

    it('should dispatch the correct actions on failure', async () => {
      const error = new Error('Something went wrong');
      (agent.Profile.getProfile as jest.Mock).mockRejectedValue(error);
      const store = mockStore({});

      //@ts-ignore
      await store.dispatch(getProfileAsync('123'));
      const actions = store.getActions();

      expect(actions[0].type).toEqual('profile/getProfileAsync/pending');
      expect(actions[1].type).toEqual('profile/clearProfile');
      expect(actions[2].type).toEqual('profile/getProfileAsync/fulfilled');
      //expect(actions[2].payload.msg).toEqual(error.message);
      //expect(actions[2].payload.alertType).toEqual('error');
      //expect(actions[3].type).toEqual('profile/getProfileAsync/rejected');
    });
  });

  describe('getProfilesAsync', () => {
    it('should dispatch the correct actions on success', async () => {
      const mockResult = [{ name: 'John Doe' }];
      (agent.Profile.getProfiles as jest.Mock).mockResolvedValue(mockResult);
      const store = mockStore({});

      //@ts-ignore
      await store.dispatch(getProfilesAsync());
      const actions = store.getActions();

      expect(actions).toContainEqual({
        type: 'profile/getProfilesSuccess',
        payload: mockResult,
      });
      expect(actions[0].type).toEqual('profile/getProfilesAsync/pending');
      expect(actions[1].type).toEqual('profile/getProfilesSuccess');
      expect(actions[1].payload).toEqual(mockResult);
      expect(actions[2].type).toEqual('profile/getProfilesAsync/fulfilled');
    });

    it.only('should dispatch the correct actions on failure', async () => {
      const error = new Error('Something went wrong');
      (agent.Profile.getProfiles as jest.Mock).mockRejectedValue(error);
      const store = mockStore({});

      //@ts-ignore
      await store.dispatch(getProfilesAsync());
      const actions = store.getActions();

      expect(actions[0].type).toEqual('profile/getProfilesAsync/pending');
      expect(actions[1].type).toEqual('profile/getProfilesAsync/fulfilled');
      // expect(actions[1].payload.msg).toEqual(error.message);
    });
  });
})

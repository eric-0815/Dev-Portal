import React, {useEffect} from 'react'
import { getCurrentProfileAsync } from '../../slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const authenticationState = useAppSelector((state) => state.authenticationState);
  
  const userId = authenticationState.user?._id

  
  useEffect(()=> {
    dispatch(getCurrentProfileAsync(userId));
  }, [dispatch, userId])

  return <div>Dashboard</div>
}

export default Dashboard

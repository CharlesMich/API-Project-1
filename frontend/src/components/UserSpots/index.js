 import { fetchUserSpots } from '../../store/SpotsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function SpotsofUser(){
    const spots = useSelector((state)=>  state.spots)

    const dispatch = useDispatch();
        console.log('from component', spots)
    useEffect(()=> {
        dispatch(fetchUserSpots())
    }, [dispatch])

} 

export default SpotsofUser;
import {useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';


function DemoUser(){
    let dispatch = useDispatch();
    
    const onSubmit =(e)=> {
        e.preventDefault();

        const credential = "demo@user.io";
        const password = "password"

        return dispatch(sessionActions.login({ credential, password }))
    }

    return <button onClick={onSubmit}>Demo user</button>
}

export default DemoUser;
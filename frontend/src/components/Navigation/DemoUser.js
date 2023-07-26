import {useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from "../../context/Modal";


function DemoUser(){
    let dispatch = useDispatch();

    const {closeModal} = useModal();
    
    const onSubmit =(e)=> {
        e.preventDefault();

        const credential = "demo@user.io";
        const password = "password";

      

        return dispatch(sessionActions.login({ credential, password })).then(closeModal)
        
    }


    return <button onClick={onSubmit}>Demo user</button>
}

export default DemoUser;
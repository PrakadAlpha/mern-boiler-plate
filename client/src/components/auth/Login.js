import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/_actions/authAction';
import {Link} from 'react-router-dom'
import {setAlert} from '../../redux/_actions/alertAction'
import {CLEAR_ERRORS} from '../../redux/types';

const Login = ({history}) => {

  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();
    
  useEffect(() => {
    if(state.isAuthenticated){
      history.push('/home');
    }
    if(state.error === 'Invalid Creds..'){
      dispatch(setAlert(state.error, 'danger'));
      dispatch({type: CLEAR_ERRORS});
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated, state.error]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if(email === '' || password === ''){
      dispatch(setAlert('Please enter all the fields.', 'danger'));
    }else{
      dispatch(login(email, password));
    }    
  }

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <p>Register to login <Link to="/register">Register</Link></p>
        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  )
}

export default Login

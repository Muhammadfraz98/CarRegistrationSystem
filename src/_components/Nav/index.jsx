import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style.css'

import { authActions } from '_store';

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!authUser) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark" style={{background: 'rgba(0,0,0,0.7)'}}>
            <div className="navbar-nav">
                <div>
                    <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                </div>
                <div className='nav-user-info'>
                    <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                </div>
            </div>
        </nav>
    );
}
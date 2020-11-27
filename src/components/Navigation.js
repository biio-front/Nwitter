import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/' replace >Home</Link>
                </li>
                <li>
                    <Link to='/profile' replace >{userObj.displayName}'s Profile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
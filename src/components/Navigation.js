import Reat from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>MyProfile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
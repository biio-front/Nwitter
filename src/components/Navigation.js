import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import 'css/Nav.css';

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul className="nav">
                <li>
                    <Link to='/' replace className="nav__home" >
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link to='/profile' replace className="nav__profile">
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span className="nav__profileStr">
                            {userObj.displayName
                                ? `${userObj.displayName}의 Profile`
                                : "Profile"}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
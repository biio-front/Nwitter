import { authService, dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [newPhoto, setNewPhoto] = useState(userObj.photoURL);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }
    const onChangeName = e => {
        const { target: { value } } = e;
        setNewDisplayName(value);
    }
    const onChangePhoto = e => {
        const { target: { files } } = e;
        const photo = files[0];
        const reader = new FileReader();
        reader.onload = finishedEvent => {
            const { currentTarget: { result } } = finishedEvent;
            setNewPhoto(result);
        }
        reader.readAsDataURL(photo);
    }
    const onClearPhoto = () => setNewPhoto(userObj.photoURL);
    const getMyNweets = async () => {
        const nweets = await dbService.collection('nweets')
            .where('creatorId', '==', userObj.uid)
            .orderBy('createAt')
            .get();
        console.log(nweets.docs.map(doc => doc.data()));
    };
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async e => {
        e.preventDefault();
        let photoURL = userObj.photoURL;
        if (newPhoto !== userObj.photoURL) {
            const photoRef = storageService.ref().child(`${userObj.uid}/profile/photo`);
            const responce = await photoRef.putString(newPhoto, "data_url");
            photoURL = await responce.ref.getDownloadURL();
        }
        if (userObj.displayName !== newDisplayName || userObj.photoURL !== newPhoto) {
            await userObj.updateProfile({
                displayName: newDisplayName,
                photoURL
            });
            setNewPhoto(photoURL);
            refreshUser();
        }
    }
    return <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <div className="profilePhoto">
                {newPhoto === userObj.photoURL ?
                    <>
                        <img src={userObj.photoURL} alt="profile" />
                        <label for="attach-photo" className="profileForm__label">
                            <span className="profile__helper">Add photos</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                        <input type="file" accept="image/*"
                            id="attach-photo" className="profileForm__attach"
                            onChange={onChangePhoto}
                        />
                    </> :
                    <>
                        <img src={newPhoto} alt="profile" />
                        <button className="profile__helper" onClick={onClearPhoto}>Cancle</button>
                    </>
                }
            </div>
            <input type="text" autoFocus placeholder="Display name"
                value={newDisplayName} className="profileForm__name"
                onChange={onChangeName}
            />
            <input type="submit" value="Update Profile" className="profileForm__submit" />
        </form>
        <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
    </div>
}

export default Profile;
import { authService, dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    const onClearPhoto = () => setNewPhoto('');
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
    return <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" value={newDisplayName}
                onChange={onChangeName}
            />
            <div className="profilePhoto" width="150px">
                {newPhoto === userObj.photoURL ?
                    <>
                        <img src={userObj.photoURL} alt="profile" width="150px" />
                    </> :
                    <>
                        <img src={newPhoto} alt="avatar" width="150px" />
                        <button onClick={onClearPhoto}>Clear</button>
                    </>
                }
            </div>
            <input type="file" accept="image/*" onChange={onChangePhoto} />
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}

export default Profile;
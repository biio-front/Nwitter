import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);


    useEffect(() => {
        dbService.collection('nweets').onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, []);
    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    }
    const onSubmit = async e => {
        e.preventDefault();
        await dbService.collection('nweets').add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet('');
    }
    return <>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="what's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map(nweet => {
                return (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={userObj.uid === nweet.creatorId}
                    />
                );
            })}
        </div>
    </>
}

export default Home;
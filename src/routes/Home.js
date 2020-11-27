import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        dbService.collection('nweets').orderBy('createAt')
            .onSnapshot(snapshot => {
                const nweetArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNweets(nweetArray);
            });
    }, []);
    return <>
        <div>
            <NweetFactory userObj={userObj} />
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
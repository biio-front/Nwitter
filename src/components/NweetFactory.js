import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onChange = (e) => {
    const { target: { value } } = e;
    setNweet(value);
  }
  const onFileChange = e => {
    const { target: { files } } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = finishedEvent => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment('');
  const onSubmit = async e => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
      const responce = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await responce.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachment('');
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="what's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment &&
        <div>
          <img src={attachment} alt={attachment} width="150px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      }
    </form>
  );
};
export default NweetFactory
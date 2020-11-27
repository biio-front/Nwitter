import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import 'css/NwitterFactory.css';

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
    if (nweet === '') {
      return;
    }
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="→" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input id="attach-file" className="factoryInput__attachment"
        type="file" accept="image/*"
        onChange={onFileChange}
      />
      {attachment &&
        <div className="factoryForm__attachment">
          <img src={attachment} alt={attachment}
            style={{ backgroundImage: attachment }}
          />
          <button className="factoryForm__clear" onClick={onClearAttachment}>
            Remove
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      }
    </form>
  );
};
export default NweetFactory
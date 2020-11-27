import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import 'css/Nweet.css';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      if (nweetObj.attachmentUrl) {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  }
  const onSubmit = async e => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    });
    setEditing(false);
  }
  const onChange = e => {
    const { target: { value } } = e;
    setNewNweet(value);
  }
  const toggleEditing = () => setEditing(prev => !prev);
  return (
    <div className="nweet">
      {editing
        ? <>
          <form onSubmit={onSubmit} className="container nweetEdit">>
            <input type="text" autoFocus placeholder="Edit your nweet"
              value={newNweet} required
              onChange={onChange}
            />
            <input type="submit" value="Update" className="formBtn nweetEdit__submit" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn" >Cancle</button>
        </>
        : <>
          {nweetObj.attachmentUrl &&
            <img src={nweetObj.attachmentUrl} />
          }
          <h4>{nweetObj.text}</h4>
          {isOwner &&
            <div class="nweet__actions">
              <button onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></button>
              <button onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></button>
            </div>
          }
        </>
      }
    </div>
  );
}

export default Nweet;
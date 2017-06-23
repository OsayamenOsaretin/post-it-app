import { EventEmitter } from 'events';
import MessageList from '../models/groupList';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold message list
let messages = new MessageList();


// add new messages to map of messages
const addNewMessageGroup = (newMessageGroup) => {
  console.log(newMessageGroup);

  messages = messages.merge(newMessageGroup);
};

/**
 * PostItMessageStore holds store logic for messages
 * @return {void}
 */
class PostItMessageStore extends EventEmitter {

  /**
   * addChangeListener
   * @memberof PostItMessageStore
   * @param {*} callback
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
  * removeChangeListener
  * @memberof PostItMessageStore
  * @param {*} callback
  * @return {void}
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * GetMessage
   * @memberof PostItMessageStore
   * @param {*} id
   * @return {void}
   */
  getMessage(id) {
    console.log('gets the message of the group');
    console.log(id);
    console.log(messages.get(id));
    return messages.get(id);
  }
}

const messageStore = new PostItMessageStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.RECIEVE_MESSAGE_RESPONSE: {
    console.log('recieves message response');
    const groupId = action.Id;
    const messageResponse = action.messages;

    const messageMap = new Map();
    messageMap.set(groupId, new MessageList(messageResponse));
    console.log(messageMap);
    addNewMessageGroup(messageMap);
    console.log('these are the messages right now');
    console.log(messages);
    messageStore.emit(CHANGE_EVENT);
    break;
  }
  default: {
    return true;
  }
  }
});

module.exports = messageStore;

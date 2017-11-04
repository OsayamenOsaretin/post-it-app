import { EventEmitter } from 'events';
import ImmutableMap from '../models/groupList';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold message list
let messages = new ImmutableMap();

const notificationMap = new Map();

let groupWithNewMessageId;

// add new messages to map of messages
const addNewMessageGroup = (newMessageGroup) => {
  messages = messages.merge(newMessageGroup);
};


/**
 * MessageStoreClass holds store logic for messages
 * @return {void}
 */
class MessageStoreClass extends EventEmitter {
  /**
   * addChangeListener
   * @memberof MessageStoreClass
   * @param {Function} callback
   * 
   * @param {String} CHANGE_EVENT_ID
   * 
   * @return {void}
   */
  addChangeListener(callback, CHANGE_EVENT_ID) {
    this.on(CHANGE_EVENT_ID, callback);
  }

  /**
  * removeChangeListener
  * @memberof MessageStoreClass
  *
  * @param {Function} callback
  * @param {String} CHANGE_EVENT_ID
  *
  * @return {void}
  */
  removeChangeListener(callback, CHANGE_EVENT_ID) {
    this.removeListener(CHANGE_EVENT_ID, callback);
  }

  /** add listener for notification changes
   * @param {Function} callback
   * 
   * @return {void}
   */
  addNotificationChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /** remove notification change event listener
   * @param {Function} callback
   * 
   * @return {void}
   */
  removeNotificationChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * GetMessage
   * @memberof MessageStoreClass
   * 
   * @param {String} id
   * 
   * @return {Map} messages.get(id)
   */
  getMessage(id) {
    return messages.get(id);
  }

  /**
   * Get the notification properties of the groups
   * @return {Object} groupNotificationDetatls
   */
  getGroupNotificationDetails() {
    return {
      Id: groupWithNewMessageId,
      status: notificationMap
    };
  }
}

const MessageStore = new MessageStoreClass();

Dispatcher.register((payload) => {
  const action = payload.action;
  let groupId;
  let messageResponse;
  let notify;
  let groupMessages;
  let Id;

  switch (action.type) {
  case ActionTypes.RECIEVE_MESSAGE_RESPONSE:
    groupId = action.Id;
    messageResponse = action.messages;
    messageResponse = new Map([...messageResponse.entries()].sort());
    notify = action.notify;

    groupWithNewMessageId = groupId;
    if (notify) {
      notificationMap.set(groupId, true);
      MessageStore.emit(CHANGE_EVENT);
    }

    groupMessages = messages.get(groupId);

    if (groupMessages) {
      groupMessages = new ImmutableMap(messageResponse);
      const newMessageMap = new Map();
      newMessageMap.set(groupId, groupMessages);
      addNewMessageGroup(newMessageMap);
    } else {
      const messageMap = new Map();
      messageMap.set(groupId,
        new ImmutableMap(messageResponse));
      addNewMessageGroup(messageMap);
    }
    MessageStore.emit(groupId);
    break;


  case ActionTypes.READ_MESSAGE:
    Id = action.Id;

    groupWithNewMessageId = Id;
    notificationMap.set(Id, false);
    MessageStore.emit(CHANGE_EVENT);
    break;


  case ActionTypes.CLEAR_MESSAGES_STORE:
    messages = new ImmutableMap();
    break;


  default:
    return true;
  }
});

export default MessageStore;

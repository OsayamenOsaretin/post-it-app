import { EventEmitter } from 'events';
import MessageList from '../models/groupList';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold message list
let messages = new MessageList();

const notificationMap = new Map();

let groupWithNewMessageId;
// add new messages to map of messages
const addNewMessageGroup = (newMessageGroup) => {
  messages = messages.merge(newMessageGroup);
};

/**
 * MessageStore holds store logic for messages
 * @return {void}
 */
class MessageStore extends EventEmitter {

  /**
   * addChangeListener
   * @memberof MessageStore
   * @param {*} callback
   * @param {*} CHANGE_EVENT_ID
   * @return {void}
   */
  addChangeListener(callback, CHANGE_EVENT_ID) {
    this.on(CHANGE_EVENT_ID, callback);
  }

  /**
  * removeChangeListener
  * @memberof MessageStore
  * @param {*} callback
  * @param {*} CHANGE_EVENT_ID
  * @return {void}
  */
  removeChangeListener(callback, CHANGE_EVENT_ID) {
    this.removeListener(CHANGE_EVENT_ID, callback);
  }

  /** add listener for notification changes
   * @return {void}
   * @param {*} callback
   */
  addNotificationChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /** remove notification change event listener
   * @return {void}
   * @param {*} callback
   */
  removeNotificationChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * GetMessage
   * @memberof MessageStore
   * @param {*} id
   * @return {*} messages.get(id)
   */
  getMessage(id) {
    return messages.get(id);
  }

  /**
   * Get the notification properties of the groups
   * @return {*} groupNotificationDetatls
   */
  getGroupNotificationDetails() {
    return {
      Id: groupWithNewMessageId,
      status: notificationMap
    };
  }
}

const messageStore = new MessageStore();

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
    notify = action.notify;

    groupWithNewMessageId = groupId;
    if (notify) {
      notificationMap.set(groupId, true);
      messageStore.emit(CHANGE_EVENT);
    }

    groupMessages = messages.get(groupId);

    if (groupMessages) {
      groupMessages = new MessageList(messageResponse);
      const newMessageMap = new Map();
      newMessageMap.set(groupId, groupMessages);
      addNewMessageGroup(newMessageMap);
    } else {
      const messageMap = new Map();
      messageMap.set(groupId, new MessageList(messageResponse));
      addNewMessageGroup(messageMap);
    }
    messageStore.emit(groupId);
    break;


  case ActionTypes.READ_MESSAGE:
    Id = action.Id;

    groupWithNewMessageId = Id;
    notificationMap.set(Id, false);
    messageStore.emit(CHANGE_EVENT);
    break;


  case ActionTypes.CLEAR_MESSAGES_STORE:
    messages = new MessageList();
    break;


  default:
    return true;
  }
});

export default messageStore;

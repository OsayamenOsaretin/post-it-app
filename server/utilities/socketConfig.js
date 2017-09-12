let io;
/**
 * retrieves an instance of a socket connection
 * passes connection to dependent modules
 * @return {void} 
 * @param {*} instance 
 */
const socketConfig = {
  socketInstance(instance) {
    io = instance;
  },
  on(changeToListenFor, callback) {
    io.on(changeToListenFor, callback);
  },
  emit(changeToListenFor, callback) {
    io.emit(changeToListenFor, callback);
  }
};
export default socketConfig;

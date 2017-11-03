import { Dispatcher as FluxDispatcher } from 'flux';

/**
 * DispatcherClass(singleton) extends flux Dispatcher module
 * @class DispatcherClass
 * @extends Dispatcher
 */
class DispatcherClass extends FluxDispatcher {
/**
 * handles view actions
 * @return {void}
 * @param {Object} action
 */
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    });
  }

  /**
   * handles server actions
   * @return {void}
   * @param {Object} action
   */
  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action
    });
  }
}
const Dispatcher = new DispatcherClass();

export default Dispatcher;


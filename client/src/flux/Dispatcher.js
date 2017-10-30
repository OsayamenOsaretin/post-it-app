import { Dispatcher } from 'flux';

/**
 * DispatcherClass(singleton) extends flux Dispatcher module
 * @class DispatcherClass
 * @extends Dispatcher
 */
class DispatcherClass extends Dispatcher {
/**
 * handles view actions
 * @return {void}
 * @param {Object} act
 */
  handleViewAction(act) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: act
    });
  }

  /**
   * handles server actions
   * @return {void}
   * @param {Object} act
   */
  handleServerAction(act) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: act
    });
  }
}

export default new DispatcherClass();


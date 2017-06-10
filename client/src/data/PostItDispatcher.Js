import { Dispatcher } from 'flux';

/**
 * DispatcherClass(singleton) extends flux Dispatcher module
 *
 */
class DispatcherClass extends Dispatcher {

}
const PostItDispatcher = new DispatcherClass();
module.exports = PostItDispatcher;

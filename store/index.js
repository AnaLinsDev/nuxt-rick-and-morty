
import user from './modules/user'
import characters from './modules/characters'
import dashboard from './modules/dashboard'
import treeView from './modules/tree-view'


export default {
	namespaced: true,
	modules:{ user, characters, dashboard, treeView }
}
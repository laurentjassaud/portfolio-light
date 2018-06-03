import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'accueil',
			components: {
				main: resolve => require(['./components/Cover.vue'], resolve)
				}
		},
		{
			path: '/about',
			name: 'about',
			components: {
				main: resolve => require(['./components/About-left.vue'], resolve)
			},
		},
		{
			path: '/work/:slug',
			name: 'work',
			components: {
				main: resolve => require(['./components/Work.vue'], resolve)
			}
		},
		{
			path: '/sommaire',
			name: 'sommaire',
			components: {
				main: resolve => require(['./components/Sommaire.vue'], resolve)
			}
		}
	]
})

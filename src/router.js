import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next()
    }
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) {
        return next('/login')
    }
    next()
})
export default router
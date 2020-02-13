
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/dashboard', meta: {requiredAuth: true}, name: 'dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/reservation', meta: {requiredAuth: true}, name: 'reservation', component: () => import('pages/reservation.vue') },  
      { path: '/walkinreserve', meta: {requiredAuth: true}, name: 'walkinreserve', component: () => import('pages/walkinreserve.vue') },
      { path: '/partytrayordering', meta: {requiredAuth: true}, name: 'partytrayordering', component: () => import('pages/partytrayordering.vue') },
      { path: '/foodmanage', meta: {requiredAuth: true}, name: 'foodmanage', component: () => import('pages/foodmanage.vue') },
      { path: '/partytraymanage', meta: {requiredAuth: true}, name: 'partytraymanage', component: () => import('pages/partytraymanage.vue') },
      { path: '/package', meta: {requiredAuth: true}, name: 'package', component: () => import('pages/package.vue') },
      { path: '/otherManage', meta: {requiredAuth: true}, name: 'otherManage', component: () => import('pages/otherManage.vue') },
      { path: '/users', meta: {requiredAuth: true}, name: 'users', component: () => import('pages/users.vue') },
    ]
  },
  { path: '/', component: () => import('pages/login.vue') },
  { path: '/signup', component: () => import('pages/signup.vue') },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

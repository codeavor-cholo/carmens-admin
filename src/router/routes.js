
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
      { path: '/calendar', meta: {requiredAuth: true}, name: 'calendar', component: () => import('pages/calendar.vue') },
      { path: '/partytrayreserve', meta: {requiredAuth: true}, name: 'partytrayreserve', component: () => import('pages/partytrayreserve.vue') },
      { path: '/customReservation/:id', meta: {requiredAuth: true}, name: 'customReservation', component: () => import('pages/customReservation.vue') },
      { path: '/viewdetails/:id', meta: {requiredAuth: true}, name: 'viewdetails', component: () => import('pages/monitor.vue') },
      { path: '/status/:id', meta: {requiredAuth: true}, name: 'status', component: () => import('pages/status.vue') },
      { path: '/statusupdate', meta: {requiredAuth: true}, name: 'statusupdate', component: () => import('pages/statusupdate.vue') },
      { path: '/cancelled', meta: {requiredAuth: true}, name: 'cancelled', component: () => import('pages/cancelled.vue') },
      { path: '/staffscheduling', meta: {requiredAuth: true}, name: 'staffscheduling', component: () => import('pages/staffScheduling.vue') },
      { path: '/staffdashboard', meta: {requiredAuth: true}, name: 'staffdashboard', component: () => import('pages/staffDashboard.vue') },
      { path: '/reservationdetails/:id', meta: {requiredAuth: true}, name: 'mobreservation', component: () => import('pages/mobreservation.vue') },
      { path: '/notification', meta: {requiredAuth: true}, name: 'notification', component: () => import('pages/notification.vue') },
      { path: '/salesReport', meta: {requiredAuth: true}, name: 'salesReport', component: () => import('pages/salesReport.vue') },
      { path: '/topChoices', meta: {requiredAuth: true}, name: 'topChoices', component: () => import('pages/topChoices.vue') },
      { path: '/traySalesReport', meta: {requiredAuth: true}, name: 'traySalesReport', component: () => import('pages/traySalesReport.vue') },
      { path: '/paymentRecords', meta: {requiredAuth: true}, name: 'paymentRecords', component: () => import('pages/paymentRecords.vue') },
      // { path: '/finishreserve', meta: {requiredAuth: true}, name: 'finishreserve', component: () => import('pages/finishreserve.vue') },
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

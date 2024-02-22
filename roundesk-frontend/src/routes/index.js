import * as reviews from '../views';

const routData = [
    {

        path: '/login',
        component: reviews.Login,
        requiresAuth: true,
    },
    {

        path: '/registration',
        component: reviews.Registration,
        requiresAuth: true,
    },
    {

        path: '/dashboard',
        component: reviews.DashBoard,
        requiresAuth: true,
    }
]

export default routData;

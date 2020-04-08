import index from './pages/index/index.vue';
import SQ from './pages/index/SQ.vue';
import Add from './pages/index/add.vue';
import SQDetail from './pages/index/sqdetail.vue';
import Draft from './pages/index/draft.vue';
import SH from './pages/index/SH.vue';
import SHDetail from './pages/index/shdetail.vue';
export default {
    routes: [
        {
            path: '/',
            name:"Index",
            component: index
        },
        {
            path: '/SQ',
            name:"SQ",
            component: SQ
        },
        {
            path: '/Add',
            name:"Add",
            component: Add
        },
        {
            path: '/sqdetail',
            name:"SQDetail",
            component: SQDetail
        },
        {
            path: '/draft',
            name:"Draft",
            component: Draft
        },
        {
            path: '/SH',
            name:"SH",
            component: SH
        },
        {
            path: '/shdetail',
            name:"SHDetail",
            component: SHDetail
        }
    ]
};
import Vue from 'vue'
import store from './store/store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import VueResource from 'vue-resource';
Vue.use(VueResource);
import GridLoader from 'vue-spinner/src/GridLoader.vue';
Vue.component('grid-loader', GridLoader)
Vue.use(GridLoader);


import vueCalendar from 'vue2-simple-calendar'
import fullCalendar from 'vue-fullcalendar'
Vue.component('vue-calendar', fullCalendar);
Vue.use(fullCalendar);

Vue.use(require('vue-moment'));
import DatePicker from 'vue2-datepicker'
Vue.component('date-picker', DatePicker);

import { Typeahead } from 'uiv';

Vue.component('typeahead', Typeahead);

import App from './App.vue';
Vue.use(App);



const AllPto = require('./assets/js/components/all-pto.vue');
const CreatePto = require('./assets/js/components/create-pto.vue');
const EditPto = require('./assets/js/components/edit-pto.vue');
const PtoCalendar = require('./assets/js/components/calendar.vue');
const Approval = require('./assets/js/components/approval.vue');
const Report = require('./assets/js/components/report.vue');


const routes = [
    {
        name: 'all_pto',
        path: '/',
        component: AllPto
    },
    {
        name: 'create_pto',
        path: '/pto/create',
        component: CreatePto
    },
    {
        name: 'edit_pto',
        path: '/pto/edit/:id',
        component: EditPto
    },
    {
        name: 'view_calendar',
        path: '/calendar',
        component: PtoCalendar,
    },
    {
        name: 'approval',
        path: '/approval',
        component: Approval,
    },
    {
        name: 'report',
        path: '/report',
        component: Report,
    }
];



var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
//new Vue({router, store, render: h => h(App)}).$mount('#app');

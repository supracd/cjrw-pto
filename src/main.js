import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import myDatepicker from 'vue-datepicker'

Vue.component('date-picker', myDatepicker);
import App from './App.vue'
import vueCalendar from 'vue2-simple-calendar'

Vue.component('vue-calendar', vueCalendar);

Vue.use(require('vue-moment'));
import DatePicker from 'vue2-datepicker'
Vue.component('date-picker', DatePicker);

const AllPto = require('./assets/js/components/all-pto.vue');
const CreatePto = require('./assets/js/components/create-pto.vue');
const EditPto = require('./assets/js/components/edit-pto.vue');
const DeletePto = require('./assets/js/components/delete-pto.vue');
const PtoCalendar = require('./assets/js/components/calendar.vue');

if (process.env.NODE_ENV === 'production') {
    window.port = process.env.PORT;
} else {
    window.port = '3000';
}


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
        name: 'delete_pto',
        path: '/pto/delete/:id',
        component: DeletePto
    },
    {
        name: 'view_calendar',
        path: '/calendar',
        component: PtoCalendar,
    }
];

export default (context) => {

  // access drupalBaseUrl from our templates


}
var router = new VueRouter({ routes: routes, mode: 'history' });
var v = new Vue(Vue.util.extend({ router }, App)).$mount('#app');
v.http.options.port = process.env.PORT;

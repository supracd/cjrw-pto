import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import myDatepicker from 'vue-datepicker'

Vue.component('date-picker', myDatepicker);

import vueCalendar from 'vue2-simple-calendar'

Vue.component('vue-calendar', vueCalendar);

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
    }
];



var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');

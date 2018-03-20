

<template>
<div id="all-pto">
    <h1>{{pageName}}</h1>

    <div class="form-group"> <input type="text" name="search" v-model="ptoSearch" placeholder="Search.." class="form-control" v-on:keyup="searchPto"> </div>
    <ul class="list-group" v-for="(ptos, key) in ptos" v-bind:key="key">
        <li class="list-group-item">
        <table class="table table-hover">
            <thead>
                <tr><td colspan="3">{{key}}</td></tr>
                <tr><td>Starting</td><td>Ending</td><td>Hour Total</td></tr>
            </thead>
        <tbody is="transition-group" mode="out-in" name="bounce" appear>
        <tr v-for="pto in ptos" v-bind:key="pto._id"   v-bind:class="[pto.approved ? 'table-success' : '']">
            <td class="pto pto-start">{{pto.date_start | moment("MMM D, hh:mmA YYYY")}}</td>
            <td class="pto pto-end">{{pto.date_end | moment("MMM D, hh:mmA YYYY")}}</td>
            <td class="pto pto-hours">{{pto.totalHours}} Hours</td>
        </tr>
        </tbody>

        </table>
        </li>
    </ul>
</div>
</template>

<script>
import Notification from './notifications.vue';

export default {
    name: 'report',

    data() {
        return {
            ptoSearch: '',
            pageName: 'PTO Report'
        }
    },
    computed: {
        ptos() {
            return this.$store.getters.ptosByName;
        },
        originalPtos() {
            return this.$store.state.originalPtos;
        },
        notifications() {
            return this.$store.state.notifications;
        }
    },
    created: function() {
        this.$store.dispatch('clearNotifications');
        this.fetchPtoData();

    },

    methods: {
        fetchPtoData: async function() {
            this.$store.dispatch('fetchPtoData');
        },
        searchPto: function() {
            this.$store.dispatch('searchPto', this.ptoSearch);
        }
    }
}
</script>

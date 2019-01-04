

<template>
<div id="all-pto">
    <h1>{{pageName}}</h1>
<!--
    <div class="form-group"> <input type="text" name="search" v-model="ptoSearch" placeholder="Search.." class="form-control" v-on:keyup="searchPto"> </div>-->
    <h2>Date From:</h2>
    <date-picker v-on:change="fetchPtoData"   id="date_start" format="MM-dd-yyyy" type="date" lang="en"
      :shortcuts="shortcuts"
      v-model="dateFrom" :first-day-of-week="1" ></date-picker>
      <h2>Date To:</h2>
      <date-picker  v-on:change="fetchPtoData"    id="date_end" format="MM-dd-yyyy" type="date" lang="en"
        :shortcuts="shortcuts"
        v-model="dateTo" :first-day-of-week="1" ></date-picker>
    <ul class="list-group" v-for="(ptohours, name) in this.ptos ">
        <li class="list-group-item pto"  v-for="o in sortPtos(name)" v-bind:key="name + o['date']">
            <div class="pto pto-name">
                {{name}}
            </div>
            <div class="pto pto-start">
                {{o['reason']}}
            </div>
            <div class="pto pto-start">
                {{o['date'] | moment("M/D/YYYY")}}
            </div>
            <div class="pto pto-hours">
                {{o['hours']}}
            </div>

        </li>
        <li  class="list-group-item pto">
            <div class="pto hour-total">
                <h2>Employee Total:</h2>&nbsp;{{ptoTotal(name)}}
            </div>
        </li>

    </ul>
</div>
</template>



<script>
import Notification from './notifications.vue';
import moment from 'moment';
export default {
    name: 'report',

    data() {
        return {
            ptoSearch: '',
            pageName: 'PTO Report',
            dateFrom: '',
            dateTo: ''
        }
    },
    computed: {
        ptos() {
            return this.$store.state.ptosByName;
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

        fetchPtoData: function() {
            this.$store.dispatch('fetchPtoData');
        },
        searchPto: function() {
            this.$store.dispatch('searchPto', this.ptoSearch);
        },
        sortPtos: function(name){

            this.ptos[name].sort((a, b) => {
                return new Date(a['date']) - new Date(b['date'])
            })
            return this.ptos[name];
        },
        filterPtos: function(pto){
            return pto['date'] < this.toDate && pto['date'] > this.fromDate;
        },
        ptoTotal: function(name){
            var total = 0.0;

             for(var v in this.ptos[name]){
                 total += parseFloat(this.ptos[name][v]['hours']);
             }
            return total;
        }
    }
}
</script>

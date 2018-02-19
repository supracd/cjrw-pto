

<template>
<div id="all-pto">
    <h1>{{pageName}}</h1>
    <div class="form-group"> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#createPto">Create PTO</button>
        <create-pto id="createPto" class="form-control collapse"></create-pto>
    </div>
    <div class="form-group"> <input type="text" name="search" v-model="ptoSearch" placeholder="Search.." class="form-control" v-on:keyup="searchPto"> </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <td>Name</td>
                <td>Date Starting</td>
                <td>Date Ending</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody is="transition-group" mode="out-in" name="bounce" appear>
            <tr v-for="pto in ptos" v-bind:key="pto._id" v-bind:class="[pto.approved ? 'table-success' : '']">
                <td>{{ pto.name }}</td>
                <td>{{ pto.date_start | moment("dddd, MMMM Do YYYY")}}</td>
                <td>{{ pto.date_end | moment("dddd, MMMM Do YYYY")}}</td>
                <td>
                    <router-link :to="{name: 'edit_pto', params: { id: pto._id }}" class="btn btn-primary">Edit</router-link> <button data-loading-text="Processing Order" id="DeleteButton" type="button" name="delete" v-on:click="deletePto(pto)" class="btn btn-primary btn-danger" value="Delete">Delete</button> </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import Notification from './notifications.vue';
import CreatePto from './create-pto.vue';

export default {
    name: 'all-pto',
    components: {
        CreatePto,
    },
    data() {
        return {
            ptoSearch: '',
            pageName: 'All PTO'
        }
    },
    computed: {
        ptos() {
            return this.$store.state.ptos;
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
        deletePto: function(pto) {
            this.$store.dispatch('deletePto', pto);
            this.fetchPtoData();
        },
        searchPto: function() {
            this.$store.dispatch('searchPto', this.ptoSearch);
        }
    }
}
</script>

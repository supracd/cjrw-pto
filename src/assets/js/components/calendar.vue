

<template>

<div id="pto-calendar">
    <notification v-bind:notifications="notifications"></notification>

    <vue-calendar :first-day="1" :events="events" @eventClicked="eventClicked"></vue-calendar>

</div>

</template>

<script>

import Notification from './notifications.vue';

export default {
    name: 'pto-calendar',
    data() {
        return {
            pageName: 'Calendar',
        }
    },
    computed: {
        events() {
            return this.$store.state.events;
        },
        notifications() {
            return this.$store.state.notifications;
        }
    },
    created: function() {
        this.$store.dispatch('clearNotifications');
        this.fetchCalendarEvents();
    },

    methods: {

        fetchCalendarEvents: function() {
            this.$store.dispatch('fetchCalendar');

        },
        eventClicked: function(event, jsEvent, pos) {
            console.log(event);
            this.$router.push({
                name: 'edit_pto',
                params: {
                    'id': event['id']
                }
            })
        }
    }
}

</script>

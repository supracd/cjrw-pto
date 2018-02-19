<template>
    <div id="update-pto">




        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editPto">


            <div class="form-group">
                <label name="pto_name">Name</label>
                <input type="text" class="form-control" v-model="pto.name" id="pto_name" required>
            </div>

            <div class="form-group">
                <label name="pto_date_start">Date Starting</label>
                <date-picker id="pto_date_start" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en" :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts" v-model="pto.date_start" :first-day-of-week="1" confirm></date-picker>





            </div>
            <div class="form-group">
                <label name="pto_date_end">Date Ending</label>
                <date-picker id="pto_date_end" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en" :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts" v-model="pto.date_end"  :first-day-of-week="1" confirm></date-picker>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        name: 'edit-pto',
        data(){
            return{
                pto: {},
                date: new Date(),
                startTime: {
                    time: ''
                },
                endTime: {
                    time: ''
                },
                pageName: 'Edit PTO',
            }
        },
        computed: {
            notifications() {
                return this.$store.state.notifications;
            }
        },
        created: function(){
            this.$store.dispatch('clearNotifications');
            this.getPto();
        },

        methods: {
            getPto: function()
            {
                this.$http.get(`/api/pto/${this.$route.params.id}/`).then((response) => {
                    this.pto = response.body;

                }, (response) => {

                });
            },

            editPto: function()
            {
                this.$store.dispatch('editPto', this.pto);
                this.$store.dispatch('fetchPtoData');
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

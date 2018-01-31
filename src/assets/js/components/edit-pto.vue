<template>
    <div id="update-pto">
        <h1>Update PTO</h1>

        <p><router-link :to="{ name: 'all_pto' }">Return to pto list</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editPto">
    <!--        <div class="form-group">
                <label name="pto_id">ID</label>
                <input type="text" class="form-control" disabled v-model="pto.id" id="pto_id">
            </div>-->

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
        data(){
            return{
                pto:this.getPto(),
                notifications:[],
                date: new Date(),
                startTime: {
                    time: ''
                },
                endTime: {
                    time: ''
                }
            }
        },

        created: function(){
            this.getPto();
        },

        methods: {
            getPto: function()
            {
                this.$http.get('http://localhost:3000/api/pto/' + this.$route.params.id).then((response) => {
                    this.pto = response.body;
                    console.log(response.body);
                }, (response) => {

                });
                return this.pto;
            },

            editPto: function()
            {
                var date_start = this.pto.date_start;
                var date_end = this.pto.date_end;
                if(!date_start || !date_end)
                {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Incorrect Date Format'
                    });
                    return false;
                } else {
                    this.pto.date_start = date_start;
                    this.pto.date_end = date_end;
                }
                this.$http.patch('http://localhost:3000/api/pto/edit/' + this.$route.params.id, this.pto, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Pto updated successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Pto not updated'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

<template>

    <div id="create-pto">
        <h1>Create PTO Request</h1>

        <p><router-link :to="{ name: 'all_pto' }">Return to PTO Requests</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addPto">
            <div class="form-group">
                <label name="pto_id">ID</label>
                <input type="text" class="form-control" disabled v-model="pto.id" id="pto_id">
            </div>
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
                <date-picker id="pto_date_end" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en" :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts" v-model="pto.date_end" :first-day-of-week="1" confirm></date-picker>
            </div>



            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>

</template>


<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                pto:{},
                notifications:[],
                date: new Date(),
                time1: '',
                time2: '',
                shortcuts: [
                  {
                    text: 'Today',
                    start: new Date(),
                    end: new Date(),
                    lang: "en"
                  }
                ]
            }
        },

        methods: {
            addPto: function()
            {
                // Validation

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

                this.$http.post(`https://localhost:${window.port}/api/pto/create`, this.pto, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'PTO request created successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'PTO request not created'
                    });
                });
            }
        },

        components: {
            'notification' : Notification

        }
    }
</script>

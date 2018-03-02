<template>
    <div id="update-pto">

        <h1>{{pageName}}</h1>


        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editPto">

            <div class="form-group">
              <label for="pto_name"  >Name</label>
              <input ref="pto_name" id="pto_name" v-model="pto.name" autocomplete="off" class="form-control form-control-lg" type="text" placeholder="Name" required>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label name="pto_date_start">Date Starting</label>
                  <date-picker   id="pto_date_start" format="MM-dd-yyyy HH:mm" type="datetime" lang="en"
                    :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
                    v-model="pto.date_start" :first-day-of-week="1" ></date-picker>
                </div>
                <div class="col">
                  <label name="pto_date_end">Date Ending</label>
                  <date-picker :not-before="pto.date_start"  id="pto_date_end" format="MM-dd-yyyy HH:mm" type="datetime" lang="en"
                    :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
                    v-model="pto.date_end" :first-day-of-week="1" ></date-picker>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="pto_reason"  >Reason</label>
              <textarea ref="pto_reason" id="pto_reason" v-model="pto.reason" autocomplete="off" class="form-control form-control-lg" type="text" placeholder="Reason"></textarea>
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
        props: ['pageName', 'ptoId'],
        data(){
            return{
                pto: false,
                date: new Date(),
                startTime: {
                    time: ''
                },
                endTime: {
                    time: ''
                },

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
                let id = null;
                if(this.ptoId){
                    id = this.ptoId;
                }else{
                    id = this.$route.params.id;
                }
                this.$http.get(`/api/pto/${id}/`).then((response) => {
                    this.pto = response.body;
                }, (response) => {

                });
            },

            editPto: async function()
            {
                let id = null;
                if(this.ptoId){
                    id = this.ptoId;
                }else{
                    id = this.$route.params.id;
                }
                this.$http.get(`/api/pto/${id}/`).then((response) => {

                    let prevPto = response.body;

                    this.$store.dispatch('clearNotifications');

                    this.$store.dispatch('editPto', {'pto': this.pto, 'prevPto': prevPto});
                    this.$store.dispatch('fetchPtoData');
                    this.getPto();
                }, (response) => {

                });



            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

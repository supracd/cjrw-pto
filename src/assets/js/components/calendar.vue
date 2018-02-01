<template>
    <div id="pto-calendar">
        <p><router-link :to="{ name: 'all_pto' }" class="btn btn-primary">All PTO</router-link>
        <router-link :to="{ name: 'create_pto' }" class="btn btn-primary">Create PTO</router-link></p>
        <vue-calendar

 :first-day="1" :events="events"></vue-calendar>
    </div>
</template>

<script>



    export default{
        data(){
            return{
                events: []
            }
        },


        created: function()
        {

            this.fetchPtoData();
        },

        methods: {
            showAll(events) {
              // Do something...
            },
            dayClicked(day) {
              // Do something...
              console.log(day);
            },
            eventClicked(event) {
              // Do something...
              console.log(event);
            },
            monthChanged(start, end) {
              // Do something...
          },
            fetchPtoData: function()
            {
                console.log(this);
                this.$http.get(`/api/pto/calendar`).then((response) => {
                    this.events = response.body;

                }, (response) => {

                });
            },
        }
    }
</script>

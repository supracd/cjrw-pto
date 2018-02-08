<template>
    <div id="pto-calendar">
            <h1>{{pageName}}</h1>

        <vue-calendar

 :first-day="1" :events="events"></vue-calendar>
    </div>
</template>

<script>



    export default{
        data(){
            return{
                events: [],
                pageName: 'Calendar',
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

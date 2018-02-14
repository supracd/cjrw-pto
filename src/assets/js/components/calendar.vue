<template>
    <div id="pto-calendar">
            <h1>{{pageName}}</h1>

        <vue-calendar

 :first-day="1" :events="events" @dayClicked="dayClicked"
      @eventClicked="eventClicked"></vue-calendar>
      <div id="ModalHolder"></div>
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

            fetchPtoData: function()
            {

                this.$http.get(`/api/pto/calendar`).then((response) => {
                    this.events = response.body;

                }, (response) => {

                });
            },
            dayClicked: function(day){

            },
            eventClicked: function(event){
            //    const start = event.start.toLocaleString('en-US');
            //    const end = event.end.toLocaleString('en-US');
                this.$router.push({name: 'edit_pto', params: {'id': event['id']}})
            }
        }
    }
</script>

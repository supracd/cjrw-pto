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

            fetchPtoData: function()
            {

                this.$http.get(`/api/pto/calendar`).then((response) => {
                    this.events = response.body;
                    console.log(response.body);
                }, (response) => {

                });
            },
        }
    }
</script>

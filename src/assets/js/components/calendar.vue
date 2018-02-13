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
                const start = event.start.toLocaleString('en-US');
                const end = event.end.toLocaleString('en-US');
                const card = `
                <div class="modal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">${event.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>${start} - ${end}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                `
                $('#ModalHolder').html(card);
            }
        }
    }
</script>

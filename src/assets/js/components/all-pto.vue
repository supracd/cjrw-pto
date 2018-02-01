<template>
    <div id="all-pto">
        <h1>All PTO</h1>

        <p><router-link :to="{ name: 'create_pto' }" class="btn btn-primary">Create PTO</router-link>
        <router-link :to="{ name: 'view_calendar' }" class="btn btn-primary">View Calendar</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="ptoSearch" placeholder="Search pto" class="form-control" v-on:keyup="searchPto">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>

                <td>Name</td>
                <td>Date Starting</td>
                <td>Date Ending</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="pto in ptos">

                    <td>{{ pto.name }}</td>
                    <td>{{ pto.date_start | moment("dddd, MMMM Do YYYY")}}</td>
                    <td>{{ pto.date_end | moment("dddd, MMMM Do YYYY")}}</td>
                    <td>
                        <router-link :to="{name: 'edit_pto', params: { id: pto._id }}" class="btn btn-primary">Edit</router-link>
                <!--        <router-link :to="{name: 'delete_pto', params: { id: pto._id }}" class="btn btn-danger">Delete</router-link>-->
                        <input type="button" name="delete" v-on:click="deletePto(pto)" class="btn btn-danger" value="Delete"></input>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                ptos: [],
                originalPtos: [],
                ptoSearch: ''
            }
        },

        created: function()
        {
            this.fetchPtoData();

        },

        methods: {
            fetchPtoData: function()
            {

                //console.log(`http://localhost/api/pto/`);
                this.$http.get(`/api/pto/`).then((response) => {
                    this.ptos = response.body;
                    this.originalPtos = this.ptos;
                }, (response) => {

                });
            },
            deletePto: function(pto)
            {
                this.$http.delete(`http://localhost:${window.port}/api/pto/delete/${pto._id}/`, pto, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                //    this.$router.push({name: 'all_pto'})
                   this.fetchPtoData();
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Pto could not deleted'
                    });
                });
            },
            searchPto: function()
            {
                if(this.ptoSearch == '')
                {
                    this.ptos = this.originalPtos;
                    return;
                }

                var searchedPtos = [];
                for(var i = 0; i < this.originalPtos.length; i++)
                {
                    var ptoName = this.originalPtos[i]['name'].toLowerCase();
                    if(ptoName.indexOf(this.ptoSearch.toLowerCase()) >= 0)
                    {
                        searchedPtos.push(this.originalPtos[i]);
                    }
                }

                this.ptos = searchedPtos;
            }
        }
    }
</script>

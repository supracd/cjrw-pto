<template>



    <div id="all-pto">

<h1>{{pageName}}</h1>


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

                <tr v-for="(pto, index) in ptos" v-on:remove="ptos.splice(index, 1)" v-bind:key="pto.id" v-bind:class="[pto.approved ? 'table-success' : '']">

                    <td>{{ pto.name }}</td>
                    <td>{{ pto.date_start | moment("dddd, MMMM Do YYYY")}}</td>
                    <td>{{ pto.date_end | moment("dddd, MMMM Do YYYY")}}</td>
                    <td>
                        <router-link :to="{name: 'edit_pto', params: { id: pto._id }}" class="btn btn-primary">Edit</router-link>

                        <input type="button" name="delete" v-on:click="deletePto(pto)" class="btn btn-danger" value="Delete"></input>
                        <input v-if="!pto.approved" type="button" name="approve" v-on:click="approvePto(index, pto)" class="btn btn-warning" value="Approve"></input>
                        <input v-if="pto.approved" type="button" name="disapprove" v-on:click="disapprovePto(index, pto)" class="btn btn-warning" value="Disapprove"></input>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ptos: [],
            originalPtos: [],
            ptoSearch: '',
            pageName: 'Approve PTO'
        }
    },
    created: function() {
        this.fetchPtoData();
    },
    methods: {
        fetchPtoData: function() {
            this.$http.get(`/api/pto/`).then((response) => {
                this.ptos = response.body;
                this.originalPtos = this.ptos;
            }, (response) => {
                this.notifications.push({
                    type: 'danger',
                    message: 'Problem Fetching PTOs ' + response
                });
            });
        },
        deletePto: function(pto) {
            this.$http.delete(`/api/pto/delete/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.ptos.splice(this.ptos.indexOf(pto), 1);
            }, (response) => {
                this.notifications.push({
                    type: 'danger',
                    message: 'Pto could not deleted'
                });
            });
        },
        approvePto: function(index, pto) {
            this.$http.patch(`/api/pto/approve/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                //Vue.set(this.ptos[index], 'approved', true);
                this.ptos[index].approved = true;
                this.fetchPtoData();
            }, (response) => {
                this.notifications.push({
                    type: 'danger',
                    message: 'Pto could not be approved ' + response
                });
            });
        },
        disapprovePto: function(index, pto) {
            this.$http.patch(`/api/pto/disapprove/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                //Vue.set(this.ptos[index], 'approved', true);
                this.ptos[index].approved = false;
                this.fetchPtoData();
            }, (response) => {
                this.notifications.push({
                    type: 'danger',
                    message: 'Pto could not be disapproved ' + response
                });
            });
        },
        searchPto: function() {
            if (this.ptoSearch == '') {
                this.ptos = this.originalPtos;
                return;
            }
            var searchedPtos = [];
            for (var i = 0; i < this.originalPtos.length; i++) {
                var ptoName = this.originalPtos[i]['name'].toLowerCase();
                if (ptoName.indexOf(this.ptoSearch.toLowerCase()) >= 0) {
                    searchedPtos.push(this.originalPtos[i]);
                }
            }
            this.ptos = searchedPtos;
        }
    }
}
</script>

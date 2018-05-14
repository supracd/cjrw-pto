<template>

    <div id="all-pto">

        <h1>{{pageName}}</h1>
        <div v-if="!authenticated">
            <input type="text" v-model="password"  />
            <input type="button" class="btn" value="Login" v-on:click="authenticate()" />
        </div>
        <div v-if="authenticated">
            <div class="form-group">
                <input type="text" name="search" v-model="ptoSearch" placeholder="Search pto" class="form-control" v-on:keyup="searchPto">

            </div>

            <table class="table table-hover">
                <thead>
                    <tr>

                        <td>Name</td>
                        <td>Date Starting</td>
                        <td>Date Ending</td>
                        <td>Reason</td>
                        <td>Actions</td>
                    </tr>
                </thead>

                <tbody is="transition-group" mode="out-in" name="bounce" appear="appear">

                    <tr v-for="(pto, index) in ptos" v-on:remove="ptos.splice(index, 1)" v-bind:key="pto._id" v-bind:class="[pto.approved ? 'table-success' : '']">

                        <td>{{ pto.name }}</td>
                        <td>{{ pto.date_start | moment("hh:mmA dddd, MMMM Do YYYY")}}</td>
                        <td>{{ pto.date_end | moment("hh:mmA dddd, MMMM Do YYYY")}}</td>
                        <td>{{ pto.reason }}</td>
                        <td>
                            <router-link :to="{name: 'edit_pto', params: { id: pto._id }}" class="btn btn-primary">Edit</router-link>

                            <input type="button" name="delete" v-on:click="deletePto(pto)" class="btn btn-danger" value="Delete"></input>
                            <input v-if="!pto.approved" type="button" name="approve" v-on:click="approvePto(pto)" class="btn btn-warning" value="Approve"></input>
                            <input v-if="pto.approved" type="button" name="disapprove" v-on:click="disapprovePto(pto)" class="btn btn-warning" value="Disapprove"></input>

                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </div>

</template>

<script>
    import GridLoader from 'vue-spinner/src/GridLoader.vue';
    export default {
        name: 'pto-approval',
        components: {
            'GridLoader': GridLoader
        },
        data() {
            return {ptoSearch: '', pageName: 'Approve PTO', color: '#CDEED3', size: '20px', password: ''}
        },

        computed: {
            ptos() {
                return this.$store.getters.sortedPtos;
            },
            originalPtos() {
                return this.$store.state.originalPtos;
            },
            notifications() {
                return this.$store.state.notifications;
            },
            authenticated() {
                return this.$store.state.authenticated;
            }
        },
        created: function () {
            this.$store.dispatch('clearNotifications');
            this.fetchPtoData();
        },
        methods: {
            fetchPtoData: async function () {
                this.$store.dispatch('fetchPtoData');
            },
            setLoading: function () {
                this.loading = !this.loading;
            },
            authenticate: function(){

                this.$store.dispatch('authenticate', this.password);
            },
            approvePto: async function (pto) {
                this.$store.dispatch('approvePto', pto);
                this.fetchPtoData();
            },
            disapprovePto: async function (pto) {
                this.$store.dispatch('disapprovePto', pto);
                this.fetchPtoData();
            },
            deletePto: async function (pto) {
                this.$store.dispatch('deletePto', pto);
                this.fetchPtoData();
            },
            searchPto: function () {
                this.$store.dispatch('searchPto', this.ptoSearch);
            }
        }
    }
</script>

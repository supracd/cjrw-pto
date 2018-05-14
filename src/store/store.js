import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        ptos: [],
        originalPtos: [],
        notifications: [],
        events: [],
        authenticated: false,
    },
    actions: {
        fetchPtoData ({ commit }) {
            commit('fetchPtoData')
        },
        addPto ({ commit }, pto) {
            commit('addPto', pto)
        },
        deletePto ({ commit }, pto) {
            commit('deletePto', pto)
        },
        approvePto ({ commit }, pto) {
            commit('approvePto', pto)
        },
        disapprovePto ({ commit }, pto) {
            commit('disapprovePto', pto)
        },
        searchPto ({ commit }, ptoSearch) {
            commit('searchPto', ptoSearch)
        },
        editPto ({ commit }, ptos) {
            commit('editPto', ptos)
        },
        fetchCalendar ({ commit }) {
            commit('fetchCalendar')
        },
        clearNotifications ({ commit }) {
            commit('clearNotifications')
        },
        authenticate ({ commit }, password){
            commit('authenticate', password)
        }
    },
    getters: {
        sortedPtos: function(state){

            return state.ptos.sort(function(a, b){
                            return a.date_start < b.date_start;
                        }).filter(function(pto){
                            var d = new Date();
                            d.setDate(d.getDate() - 1)
                            return new Date(pto.date_start) >= d;
                        });
        },
        ptosByName: function(state){

            function getBusinessHours(pto){
                var current = new Date(pto.date_start);
                var end = new Date(pto.date_end);
                var hours = 0;
                while(current <= end){
                    current.setTime(current.getTime() + 1000 * 3600);
                    if(current.getHours() > 8 && current.getHours() < 17 && current.getDay() != 0 && current.getDay() != 6){
                        hours += 1;
                    }

                }
                return hours;
            }
            var ret = {};
            state.ptos.forEach(function(pto){
                if(!ret.hasOwnProperty(pto.name)){
                    ret[pto.name] = [];
                }
                pto.totalHours = getBusinessHours(pto);
                ret[pto.name].push(pto);
            });

            return ret;
        }
    },
    mutations: {
        clearNotifications: function(state){
                state.notifications = [];
        },
        fetchPtoData: function(state) {
            Vue.http.get(`/api/pto/`).then((response) => {

                state.ptos = [];
                for(var i = 0; i < response.body.length; i++){
                    state.ptos.push(response.body[i])
                }
                state.originalPtos = state.ptos;
            }, (response) => {});

        },
        deletePto: function(state, pto) {
            Vue.http.delete(`/api/pto/delete/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {}, (response) => {
                state.notifications.push({type: 'danger', message: 'PTO could not be deleted'});

            });
        },
        approvePto: function(state, pto) {
            Vue.http.patch(`/api/pto/approve/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {}, (response) => {
                state.notifications.push({type: 'danger', message: 'PTO could not be approved'});

            });
        },
        disapprovePto: function(state, pto) {
            Vue.http.patch(`/api/pto/disapprove/${pto._id}/`, pto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {}, (response) => {
                state.notifications.push({type: 'danger', message: 'PTO could not be disapproved'});

            });
        },
        fetchCalendar: function(state){
            Vue.http.get(`/api/pto/calendar`).then((response) => {
                state.events = response.body;

            }).then((response) => {

            }, (response) => {
                state.notifications.push({
                    type: 'danger',
                    message: 'PTO List Could Not Be Fetched'
                });
            });
        },
        searchPto: function(state, ptoSearch) {
            if (ptoSearch == '') {
                state.ptos = state.originalPtos;
                return;
            }

            let searchedPtos = [];
            for (let i = 0; i < state.originalPtos.length; i++) {
                let ptoName = state.originalPtos[i]['name'].toLowerCase();
                if (ptoName.indexOf(ptoSearch.toLowerCase()) >= 0) {
                    searchedPtos.push(state.originalPtos[i]);
                }
            }

            state.ptos = searchedPtos;
        },
        editPto: function(state, ptos) {
            let pto = ptos.pto;
            let prevPto = ptos.prevPto;
            var date_start = pto.date_start;
            var date_end = pto.date_end;
            if(!date_start || !date_end)
            {
                state.notifications.push({
                    type: 'danger',
                    message: 'Incorrect Date Format'
                });
                return false;
            } else {
                pto.date_start = date_start;
                pto.date_end = date_end;
            }
            Vue.http.patch(`/api/pto/edit/${pto._id}/`, pto, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then((response) => {
                state.notifications.push({
                    type: 'success',
                    message: 'Pto updated successfully'
                });
                Vue.http.post('/api/log/create/', {'changed_from': prevPto, 'changed_to': pto, 'pto': pto._id}, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }, (response) => {
                state.notifications.push({
                    type: 'error',
                    message: 'PTO not updated'
                });
            });

        },
        addPto: function(state, pto) {
            var date_start = pto.date_start;
            var date_end = pto.date_end;
            if (!date_start || !date_end) {
              state.notifications.push({
                type: 'danger',
                message: 'Incorrect Date Format'
              });
              return false;
            } else {
              pto.date_start = date_start;
              pto.date_end = date_end;
            }

            Vue.http.post(`/api/pto/create`, pto, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) => {
              state.notifications.push({
                type: 'success',
                message: 'PTO request created successfully'
              });
            }, (response) => {
              state.notifications.push({
                type: 'danger',
                message: 'PTO request not created'
              });
            });
        },
        authenticate: function(state, password){
            if(password == 'password1'){
                state.authenticated = true;
            }else{
                state.authenticated = false;
            }
        }
    }
});
setInterval(() => {
    store.commit('fetchPtoData');
}, 10000)
export default store;

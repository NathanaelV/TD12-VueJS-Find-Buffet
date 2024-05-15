const app = Vue.createApp ({
    data() {
        return {
            buffets: [],
            buffet: {},
            buffet_events: [],
            searchText: '',
            event: {},
            showBuffetDetails: false,
            showEventDetails: false,
            order: {
                event_date: '',
                people: 0
            },
            response: {}
        }
    },

    computed: {
        listResult() {

            if (this.searchText) {

                return this.buffets.filter(buffet => {

                    return buffet.brandName.toLowerCase().includes(this.searchText.toLowerCase());

                });
            } else {

                return this.buffets;

            }
        }
    },

    async mounted() {
        this.listResult = await this.getBuffets();
    },

    methods: {
        async getBuffets() {
            let response = await fetch('http://localhost:3000/api/v1/buffets');

            let data = await response.json();

            this.buffets = [];

            data.forEach(element => {
                var buffet = new Object();

                buffet.id = element.id;
                buffet.brandName = element.brand_name;
                buffet.city = element.city;
                buffet.state = element.state;

                this.buffets.push(buffet);
            });

            this.everyThingFalse();
        },

        async getbuffetDetails(buffetId) {
            let response = await fetch('http://localhost:3000/api/v1/buffets/' + buffetId);

            let data = await response.json();

            this.buffets = [];

            this.buffet = {};

            this.buffet.id = data.id;
            this.buffet.brandName = data.brand_name;
            this.buffet.phone = data.phone;
            this.buffet.email = data.email;
            this.buffet.address = data.address;
            this.buffet.city = data.city;
            this.buffet.state = data.state;
            this.buffet.zipCode = data.zip_code;
            this.buffet.description = data.description;
            this.buffet.payment = data.payment;

            this.getEvents(buffetId);

            this.everyThingFalse();
            this.showBuffetDetails = true;
        },

        async getEvents(buffetId) {
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffetId}/events`);

            let data = await response.json();

            this.buffet_events = [];

            data.forEach(element => {
                buffet_event = {};

                buffet_event.id = element.id;
                buffet_event.name = element.name;
                buffet_event.description = element.description;

                this.buffet_events.push(buffet_event)
            })
        },

        async getEventDetails(buffetId, eventId) {
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffetId}/events/${eventId}`);
            
            this.event = await response.json();

            this.everyThingFalse();
            this.showEventDetails = true;
        },

        everyThingFalse() {
            this.showBuffetDetails = false;
            this.showEventDetails = false;
        },

        async submitProposal(buffetId, eventId) {
            var today = new Date();
            var formDate = new Date(this.order.event_date + 'GMT-0300');

            if (formDate < today || formDate == 'Invalid Date') {
                alert('Selecionar uma data Válida ou Futura.')
                return
            }

            if (this.order.people < 1) {
                alert('Número de pessoas precisa ser maior que Zero.')
                return
            }

            await fetch(
                `http://localhost:3000/api/v1/buffets/${buffetId}/events/${eventId}/orders`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.order)
                },
            ).then(response => response.json())
            .then(data => {
                this.response = data
            })
            .catch(error => console.error('Erro: ', error));
        },
    }
})

app.mount('#app');

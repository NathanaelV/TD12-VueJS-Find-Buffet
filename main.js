const app = Vue.createApp ({
    data() {
        return {
            buffets: [],
            buffet: {}
        }
    },

    // conputed: {
    //     listResult() {
    //         return this.buffet;
    //     }
    // },

    mounted() {
        this.getBuffets();
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
        },

        async buffetDetails(buffetId) {
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
        }
    }
})

app.mount('#app');

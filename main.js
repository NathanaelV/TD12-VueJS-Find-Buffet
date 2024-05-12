const app = Vue.createApp ({
    data() {
        return {
            buffets: []
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
        async getBuffets(){
            console.log('Method Start')
            let response = await fetch('http://localhost:3000/api/v1/buffets');

            let data = await response.json();

            this.buffets = [];

            data.forEach(element => {
                var buffet = new Object();

                buffet.brandName = element.brand_name;
                buffet.city = element.city;
                buffet.state = element.state;

                this.buffets.push(buffet);
            });
        }
    }
})

app.mount('#app');

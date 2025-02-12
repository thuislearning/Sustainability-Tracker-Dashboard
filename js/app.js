const app = Vue.createApp({
    data() {
        return {
            dropdowns: [
                { selected: 'Select Year', options: ['2025', '2024', '2023'], show: false },
                { selected: 'Select Place', options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'], show: false }
            ]
        };
    },
    methods: {
        selectOption(index, option) {
            this.dropdowns[index].selected = option;
        }
    }
});
app.mount("#app");
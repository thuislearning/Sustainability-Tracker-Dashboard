const app = Vue.createApp({
    data() {
        return {
            dropdowns: [
                { selected: 'Select Year', options: ['2025', '2024', '2023'], show: false },
                { selected: 'Select Place', options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'], show: false }
            ],
            charts: [
                { title: "Factor 1", type: "bar", data: [10, 20, 30, 40] },
                { title: "Factor 2", type: "line", data: [15, 25, 35, 45] },
                { title: "Factor 3", type: "doughnut", data: [5, 15, 25, 35] },
                { title: "Factor 4", type: "pie", data: [8, 18, 28, 38] }
            ]
        };
    },
    // Lifecycle Hook (mounted()) -> runs renderCharts() after Vue loads to initialize the charts
    mounted() {
        this.renderCharts();
    },
    methods: {
        selectOption(index, option) {
            this.dropdowns[index].selected = option;
        },
        // Chart.js Rendering (renderCharts()) -> uses Chart.js to create bar charts dynamically based on the data
        renderCharts() {
            this.charts.forEach((chart, index) => {
                const ctx = document.getElementById(`chart-${index}`).getContext('2d');
                new Chart(ctx, {
                    type: chart.type,
                    data: {
                        labels: ['A', 'B', 'C', 'D'],
                        datasets: [{
                            label: chart.title,
                            data: chart.data,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            });
        }
    }
});
app.mount("#app");
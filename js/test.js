const test = Vue.createApp({
    data() {
        return {
            rawData: [
                { year: 2021, place: "USA", value: 100 },
                { year: 2021, place: "Canada", value: 120 },
                { year: 2022, place: "USA", value: 130 },
                { year: 2022, place: "Canada", value: 110 },
                { year: 2023, place: "USA", value: 90 },
                { year: 2023, place: "Canada", value: 140 }
            ],
            selectedYear: "",
            selectedPlace: "",
            chartInstance: null
        };
    },
    computed: {
        uniqueYears() {
            return [...new Set(this.rawData.map(item => item.year))];
        },
        uniquePlaces() {
            return [...new Set(this.rawData.map(item => item.place))];
        },
        filteredData() {
            return this.rawData.filter(item => 
                (this.selectedYear === "" || item.year == this.selectedYear) &&
                (this.selectedPlace === "" || item.place == this.selectedPlace)
            );
        },
        chartLabels() {
            if (this.selectedPlace) {
                // Show years when filtering by place
                return this.filteredData.map(item => item.year);
            } else {
                // Show places when filtering by year or all data
                return [...new Set(this.filteredData.map(item => item.place))];
            }
        },
        chartData() {
            if (this.selectedPlace) {
                return this.chartLabels.map(year => {
                    const item = this.filteredData.find(d => d.year == year);
                    return item ? item.value : 0;
                });
            } else {
                return this.chartLabels.map(place => {
                    const item = this.filteredData.find(d => d.place == place);
                    return item ? item.value : 0;
                });
            }
        }
    },
    watch: {
        selectedYear() {
            this.updateChart();
        },
        selectedPlace() {
            this.updateChart();
        }
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = document.getElementById("myChart").getContext("2d");
            this.chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: this.chartLabels,
                    datasets: [{
                        label: "Values",
                        data: this.chartData,
                        backgroundColor: "rgba(75, 192, 192, 0.5)"
                    }]
                },
                options: { responsive: true }
            });
        },
        updateChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy(); // Destroy old instance before updating
            }
            this.createChart();
        }
    }
});

// MOUNT THE APP
test.mount("#test");

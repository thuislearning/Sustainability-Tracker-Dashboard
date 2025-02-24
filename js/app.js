const app = Vue.createApp({
    data() {
        return {
            // dropdowns: [
            //     { selected: 'Select Year', options: ['2025', '2024', '2023'], show: false },
            //     { selected: 'Select Place', options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'], show: false }
            // ],
            // charts: [
            //     { title: "Factor 1", type: "bar", data: [10, 20, 30, 40] },
            //     { title: "Factor 2", type: "line", data: [15, 25, 35, 45] },
            //     { title: "Factor 3", type: "doughnut", data: [5, 15, 25, 35] },
            //     { title: "Factor 4", type: "pie", data: [8, 18, 28, 38] }
            // ],
            rawData: [
                { place: "USA", year: 2021, value: 100 },
                { place: "USA", year: 2022, value: 105  },
                { place: "USA", year: 2023, value: 150  },
                { place: "USA", year: 2024, value: 155  },
                { place: "Canada", year: 2021, value: 90 },
                { place: "Canada", year: 2022, value: 85  },
                { place: "Canada", year: 2023, value: 95  },
                { place: "Canada", year: 2024, value: 90  },
            ],
            selectedYear: "",
            selectedPlace: "",
            chartInstance: null,         
            columns: [
                { label: "Name", field: "name" },
                { label: "Email", field: "email" },
                { label: "Company", field: "company", transform: company => company.name }, // Access nested object
            ],
            tableData: [], // Initially empty, will be filled with API data
            searchQuery: "",
            sortedColumn: null,
            sortOrder: 'asc',
            loading: true, // Show loading indicator
        };
    },
    // Lifecycle Hook (mounted()) -> runs renderCharts() after Vue loads to initialize the charts
    mounted() {
        // this.renderCharts();
        this.createChart();

        // fetch("http://localhost:3000/data")
        // .then(res => res.json())
        // .then(data => (this.tableData = data));
        this.fetchTableData();
    },
    computed: {
        filteredData() {
          return this.tableData
            .filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
        uniqueYears() {
            return [...new Set(this.rawData.map(item => item.year))].sort();
        },
        uniquePlaces() {
            return [...new Set(this.rawData.map(item => item.place))];
        },
        filteredChartData() {
            return this.rawData.filter(item => 
                (this.selectedYear === "" || item.year == this.selectedYear) &&
                (this.selectedPlace === "" || item.place == this.selectedPlace)
            );
        },
        chartLabels() {
            if (this.selectedPlace) {
                // Show years when filtering by place
                return this.filteredChartData.map(item => item.year);
            } else {
                // Show places when filtering by year or all data
                return [...new Set(this.filteredChartData.map(item => item.place))];
            }
        },
        chartData() {
            if (this.selectedPlace) {
                return this.chartLabels.map(year => {
                    const item = this.filteredChartData.find(d => d.year == year);
                    return item ? item.value : 0;
                });
            } else {
                return this.chartLabels.map(place => {
                    const item = this.filteredChartData.find(d => d.place == place);
                    return item ? item.value : 0;
                });
            }
        }
        // groupedData() {
        //     let dataByYear = {};
        //     this.rawData.forEach(entry => {
        //         if (!dataByYear[entry.year]) {
        //             dataByYear[entry.year] = {};
        //         }
        //         dataByYear[entry.year][entry.place] = entry.value;
        //     });
        //     return dataByYear;
        // }
    },
    watch: {
        selectedYear() {
            this.updateChart();
        },
        selectedPlace() {
            this.updateChart();
        }
    },
    methods: {
        selectOption(index, option) {
            this.dropdowns[index].selected = option;
        },
        // Chart.js Rendering (renderCharts()) -> uses Chart.js to create bar charts dynamically based on the data
        // renderCharts() {
        //     this.charts.forEach((chart, index) => {
        //         const ctx = document.getElementById(`chart-${index}`).getContext('2d');
        //         new Chart(ctx, {
        //             type: chart.type,
        //             data: {
        //                 labels: ['A', 'B', 'C', 'D'],
        //                 datasets: [{
        //                     label: chart.title,
        //                     data: chart.data,
        //                     backgroundColor: '#FFB4A2'
        //                 }]
        //             },
        //             options: {
        //                 responsive: true,
        //                 maintainAspectRatio: false
        //             }
        //         });
        //     });
        // },
        createChart() {
            const ctx = document.getElementById("myChart").getContext("2d");

            const years = this.uniqueYears; 
            const places = this.uniquePlaces;

            // const datasets = places.map((place, index) => ({
            //     label: place,
            //     data: years.map(year => this.groupedData[year]?.[place] || 0),
            //     borderColor: this.getRandomColor(index),
            //     fill: false
            // }));

            this.chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: this.chartLabels,
                    datasets: [{
                        label: "CO₂ emissions",
                        data: this.chartData,
                        backgroundColor: "#FFCDB2"
                    }]
                },
                // data: {
                //     labels: years,
                //     datasets: datasets
                // },
                options: { 
                    responsive: true,
                    maintainAspectRatio: true 
                }
                // options: {
                //     responsive: true,
                //     plugins: {
                //         legend: { display: true }
                //     },
                //     scales: {
                //         y: {
                //             title: { display: true, text: "CO₂ Emission (billion tonnes)" }
                //         },
                //         x: {
                //             title: { display: true, text: "Year" }
                //         }
                //     }
                // }
            });
        },
        // getRandomColor(index) {
        //     const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];
        //     return colors[index % colors.length];
        // },
        updateChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy(); // Destroy old instance before updating
            }
            this.createChart();
        },
        async fetchTableData() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                this.tableData = data;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                this.loading = false; // Hide loading indicator
            }
        },
        sortTable(field) {
            if (this.sortedColumn === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortedColumn = field;
                this.sortOrder = 'asc';
            }

            this.tableData.sort((a, b) => {
                let modifier = this.sortOrder === 'asc' ? 1 : -1;
                if (a[field] < b[field]) return -1 * modifier;
                if (a[field] > b[field]) return 1 * modifier;
                return 0;
            });
        },
        updateQuery(event) {
            this.searchQuery = event.target.value;
        }
    }   
});

app.mount("#app");
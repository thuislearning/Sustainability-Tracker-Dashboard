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
            ],
            columns: [
                { label: "Name", field: "name" },
                { label: "Category", field: "category" },
                { label: "Value", field: "value" },
            ],
            tableData: [
                { id: 1, name: "Item A", category: "Energy", value: 50 },
                { id: 2, name: "Item B", category: "Water", value: 30 },
                { id: 3, name: "Item C", category: "Waste", value: 20 },
            ],
            searchQuery: "",
            sortedColumn: null,
            sortOrder: 'asc',
        };
    },
    // Lifecycle Hook (mounted()) -> runs renderCharts() after Vue loads to initialize the charts
    mounted() {
        this.renderCharts();

        fetch("http://localhost:3000/data")
        .then(res => res.json())
        .then(data => (this.tableData = data));
    },
    computed: {
        filteredData() {
          return this.tableData
            .filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            .sort((a, b) => {
              if (!this.sortKey) return 0;
              return this.sortOrder * (a[this.sortKey] > b[this.sortKey] ? 1 : -1);
            });
        }
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
                            backgroundColor: '#FFB4A2'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            });
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
        }
    }
});

app.mount("#app");
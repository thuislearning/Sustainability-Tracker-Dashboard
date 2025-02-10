const app = Vue.createApp({
    data() {
        return {
            years: [2025, 2024, 2023], // Dropdown options
            selectedYear: null, // Stores selected year
            places: ["Ho Chi Minh City", "Hanoi", "Da Nang"],
            selectedPlace: null,
            isDropdownOpen: false // Controls dropdown visibility
        };
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown
        },
        selectYear(year) {
            this.selectedYear = year; // Update selected year
            this.isDropdownOpen = false; // Close dropdown
        },
        selectPlace(place) {
            this.selectedPlace = place;
            this.isDropdownOpen = false;
        }
    }
});
app.mount("#app");
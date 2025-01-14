# Sustainability-Tracker-Dashboard
A responsive web application that displays sustainability metrics (e.g., carbon emissions, energy usage, recycling rates) using data fetched from a mock REST API.

The features include:
- Dashboard interface
- Responsive design
- Dynamic data integration (using Vue.js framework for REST API and creating simple API with JSON Server)
- Interface elements (filter, search bar, sort)
- Modern UI/UX
- Reusable components
- Version control

After this project, I learn to:
- Use HTML5 and CSS3 for structure and styling
- Use Vue.js for core interactivity and API integration
- Use Chart.js for visualization
- Create a simple mock API

## Running the project with Docker
1. Build the Docker image:
   '''bash
   docker build -t <image-name> .
2. Run the container
   docker run -p 3000:3000 <image-name>
3. Access the app at http://localhost:3000

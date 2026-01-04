# VectorShift Pipeline Builder

A web-based visual pipeline builder using React and FastAPI.

## Features

- Drag and drop node creation (Input, Number, Boolean, LLM, Text, Math, API, Delay, Output)
- Connect nodes with edges to build complex pipelines
- Dynamic text node with variable detection and auto-sizing
- Real-time pipeline statistics (node/edge count)
- Undo/Redo functionality for pipeline editing
- Save and load pipelines to local storage
- Clear pipeline functionality
- Node deletion with Delete key
- Categorized node toolbar for better organization
- Pipeline validation and DAG checking
- Basic execution simulation with text templating
- Modern, responsive UI with professional styling

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Python 3.8+ (for backend)
- pip

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```
   cd backend
   pip install fastapi uvicorn
   ```

### Running the Application

1. Start the backend:
   ```
   cd backend
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Usage

- Drag nodes from the categorized toolbar to the canvas
- Connect nodes by dragging from output handles (right) to input handles (left)
- Enter data in input nodes and configure processing nodes
- Use variables in text nodes with {{variableName}} syntax - handles will appear automatically
- Click Undo/Redo for history management
- Click Save to store your pipeline locally, Load to restore it
- Press Delete key to remove selected nodes
- Click Submit to validate and execute the pipeline
- View real-time statistics in the header

## API

## Future Enhancements

### Phase 1: Enhanced Functionality (1-2 weeks)
- **Real LLM Integration**: Connect to OpenAI, Anthropic, or other LLM APIs for actual text generation
- **Advanced Node Types**:
  - File upload/download nodes
  - Database query nodes
  - Email/SMS notification nodes
  - Conditional logic nodes (if/else)
  - Loop/iteration nodes
- **Pipeline Execution Engine**: Implement proper data flow between connected nodes
- **Node Validation**: Real-time validation of node connections and data types
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Phase 2: User Experience (2-3 weeks)
- **User Authentication**: Login/signup with JWT tokens, user accounts
- **Dashboard**: List saved pipelines, recent activity, pipeline templates
- **Themes & Customization**: Dark/light mode, custom color schemes, node styling
- **Keyboard Shortcuts**: Copy/paste nodes, select all, undo/redo functionality
- **Mobile Responsiveness**: Touch-friendly interface for tablets
- **Pipeline Sharing**: Public/private pipelines, collaboration features
- **Search & Filter**: Search nodes in toolbar, filter pipeline history

### Phase 3: Data & Persistence (2-3 weeks)
- **Database Integration**: PostgreSQL/MongoDB for storing pipelines and user data
- **Version Control**: Pipeline versioning with git-like history
- **Backup & Export**: Export pipelines as JSON/YAML, import functionality
- **Cloud Storage**: Store large files and media in cloud storage (AWS S3, etc.)
- **Analytics**: Pipeline performance metrics, usage statistics, error tracking

### Phase 4: Advanced Features (3-4 weeks)
- **Workflow Scheduling**: Cron jobs for automated pipeline runs
- **API Endpoints**: REST API for external integrations and webhooks
- **Plugin System**: Extensible architecture for custom node development
- **Real-time Collaboration**: Multiple users editing the same pipeline
- **Pipeline Templates**: Pre-built templates for common use cases
- **Testing Framework**: Unit tests for nodes, integration tests for pipelines

### Phase 5: Production & Scale (4-6 weeks)
- **Containerization**: Docker setup for easy deployment
- **Cloud Deployment**: Deploy to AWS/GCP/Azure with auto-scaling
- **Monitoring & Logging**: Application monitoring, error tracking, performance metrics
- **Security**: Input sanitization, rate limiting, authentication improvements
- **Performance Optimization**: Code splitting, lazy loading, caching strategies
- **Documentation**: API documentation, user guides, developer docs

### Technical Improvements
- **TypeScript Migration**: Better type safety and developer experience
- **Testing Suite**: Unit tests, integration tests, E2E tests with Cypress
- **CI/CD Pipeline**: Automated testing and deployment workflows
- **Microservices Architecture**: Split into separate services for scalability
- **GraphQL API**: More efficient data fetching and real-time updates
- **Progressive Web App**: Offline functionality, installable on devices

### Integration Possibilities
- **Third-party APIs**: Slack, Discord, Google Workspace, Microsoft 365
- **Data Sources**: Connect to databases, APIs, cloud storage, IoT devices
- **AI/ML Services**: Integrate with machine learning models and services
- **Business Tools**: CRM systems, project management tools, communication platforms

### Research & Innovation
- **AI-Powered Suggestions**: Recommend nodes based on pipeline patterns
- **Auto-optimization**: Automatically optimize pipeline performance
- **Visual Programming**: Advanced visual programming features
- **Voice Commands**: Voice-activated pipeline creation and editing
- **AR/VR Interface**: Immersive pipeline building experience


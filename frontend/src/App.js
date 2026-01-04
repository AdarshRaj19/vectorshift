import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import SubmitButton from './submit';
import { useStore } from './store';
import './index.css';

function App() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  return (
    <div className="app-container">
      <header className="header">
        <h1>VectorShift Pipeline Builder</h1>
        <div className="stats">
          <span>Nodes: {nodes.length}</span>
          <span>Edges: {edges.length}</span>
        </div>
        <PipelineToolbar />
      </header>
      <div className="pipeline-ui">
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;

import { useStore } from './store';

export default function SubmitButton() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    try {
      console.log('Submitting pipeline...', { nodes, edges });

      // Clean the node data by removing functions
      const cleanNodes = nodes.map(node => ({
        ...node,
        data: Object.keys(node.data || {}).reduce((acc, key) => {
          if (typeof node.data[key] !== 'function') {
            acc[key] = node.data[key];
          }
          return acc;
        }, {})
      }));

      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: cleanNodes, edges }),
      });

      console.log('Response status:', res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response data:', data);

      let message = `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}\nErrors: ${data.errors.join(', ') || 'None'}`;
      if (data.results) {
        message += '\n\nResults:\n' + Object.entries(data.results).map(([id, res]) => `${id}: ${res}`).join('\n');
      }
      alert(message);
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return <button className="submit-button" onClick={handleSubmit}>Submit Pipeline</button>;
}

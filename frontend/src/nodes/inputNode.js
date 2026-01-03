import { Handle, Position } from 'reactflow';

export function InputNode({ id, data }) {
  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      <h4>Input Node</h4>

      <input
        placeholder="Enter value"
        value={data.value || ''}
        onChange={(e) => {
          data.onChange(id, e.target.value);
        }}
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

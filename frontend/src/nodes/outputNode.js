import { Handle, Position } from 'reactflow';

export function OutputNode() {
  return (
    <div style={{ padding: 10, border: '1px solid black', background: 'white' }}>
      <strong>Output Node</strong>
      <div>Output Value</div>

      {/* INPUT handle */}
      <Handle
        type="target"
        position={Position.Left}
      />
    </div>
  );
}

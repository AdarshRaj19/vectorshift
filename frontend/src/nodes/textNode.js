import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export function TextNode() {
  const [template, setTemplate] = useState('');

  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      <h4>Text Node</h4>

      <textarea
        placeholder="Hello {{name}}"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

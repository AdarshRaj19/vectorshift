import { useMemo } from 'react';
import GenericNode from './GenericNode';
import { useStore } from '../store';

export function TextNode({ id, data }) {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const template = data.template || '';

  const variables = useMemo(() => {
    const matches = template.match(/\{\{\s*(\w+)\s*\}\}/g);
    if (!matches) return [];
    return [...new Set(matches.map(m => m.match(/\{\{\s*(\w+)\s*\}\}/)[1]))];
  }, [template]);

  const variableHandles = variables.map((variable, index) => ({
    id: variable,
    top: 40 + index * 20
  }));

  const inputHandles = [
    { id: 'text-input', top: 20 },
    ...variableHandles
  ];

  return (
    <GenericNode
      title="Text Node"
      className="text-node"
      inputHandles={inputHandles}
      outputHandles={[{ id: 'output' }]}
      style={{
        minWidth: Math.max(150, template.length * 8),
        minHeight: Math.max(100, template.split('\n').length * 20 + 60)
      }}
    >
      <textarea
        placeholder="Hello {{input}}"
        value={template}
        onChange={(e) => updateNodeField(id, 'template', e.target.value)}
        style={{
          width: '100%',
          height: 'auto',
          minHeight: '40px',
          resize: 'none'
        }}
      />
    </GenericNode>
  );
}

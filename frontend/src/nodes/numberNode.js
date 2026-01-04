import GenericNode from './GenericNode';

export function NumberNode({ id, data }) {
  return (
    <GenericNode
      title="Number Node"
      className="number-node"
      outputHandles={[{ id: 'output' }]}
    >
      <input
        type="number"
        placeholder="Enter number"
        value={data.value || ''}
        onChange={(e) => data.onChange('value', parseFloat(e.target.value) || 0)}
      />
    </GenericNode>
  );
}
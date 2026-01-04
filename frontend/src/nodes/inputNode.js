import GenericNode from './GenericNode';

export function InputNode({ id, data }) {
  return (
    <GenericNode
      title="Input Node"
      className="input-node"
      outputHandles={[{ id: 'output' }]}
    >
      <input
        placeholder="Enter value"
        value={data.value || ''}
        onChange={(e) => {
          data.onChange('value', e.target.value);
        }}
      />
    </GenericNode>
  );
}

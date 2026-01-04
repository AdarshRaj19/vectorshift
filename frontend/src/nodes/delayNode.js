import GenericNode from './GenericNode';

export function DelayNode({ id, data }) {
  return (
    <GenericNode
      title="Delay Node"
      className="delay-node"
      inputHandles={[{ id: 'input' }]}
      outputHandles={[{ id: 'output' }]}
    >
      <input
        type="number"
        placeholder="Delay (ms)"
        value={data.delay || ''}
        onChange={(e) => data.onChange('delay', parseInt(e.target.value) || 0)}
      />
    </GenericNode>
  );
}
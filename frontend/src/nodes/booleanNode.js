import GenericNode from './GenericNode';

export function BooleanNode({ id, data }) {
  return (
    <GenericNode
      title="Boolean Node"
      className="boolean-node"
      outputHandles={[{ id: 'output' }]}
    >
      <select
        value={data.value || 'false'}
        onChange={(e) => data.onChange('value', e.target.value === 'true')}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </GenericNode>
  );
}
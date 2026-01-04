import GenericNode from './GenericNode';

export function MathNode({ id, data }) {
  return (
    <GenericNode
      title="Math Node"
      className="math-node"
      inputHandles={[
        { id: 'a', top: '30%' },
        { id: 'b', top: '70%' }
      ]}
      outputHandles={[{ id: 'result' }]}
    >
      <select
        value={data.operation || 'add'}
        onChange={(e) => data.onChange('operation', e.target.value)}
      >
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
    </GenericNode>
  );
}
import GenericNode from './GenericNode';

export function OutputNode() {
  return (
    <GenericNode
      title="Output Node"
      className="output-node"
      inputHandles={[{ id: 'input' }]}
    >
      <div>Output Value</div>
    </GenericNode>
  );
}

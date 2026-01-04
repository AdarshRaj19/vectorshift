import GenericNode from './GenericNode';

function LLMNode() {
  return (
    <GenericNode
      title="LLM Node"
      className="llm-node"
      inputHandles={[{ id: 'input' }]}
      outputHandles={[{ id: 'output' }]}
    >
      <p>Large Language Model</p>
    </GenericNode>
  );
}

export default LLMNode;

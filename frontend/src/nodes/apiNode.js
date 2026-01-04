import GenericNode from './GenericNode';

export function ApiNode({ id, data }) {
  return (
    <GenericNode
      title="API Node"
      className="api-node"
      inputHandles={[{ id: 'input' }]}
      outputHandles={[{ id: 'response' }]}
    >
      <input
        placeholder="API URL"
        value={data.url || ''}
        onChange={(e) => data.onChange('url', e.target.value)}
      />
      <select
        value={data.method || 'GET'}
        onChange={(e) => data.onChange('method', e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </GenericNode>
  );
}
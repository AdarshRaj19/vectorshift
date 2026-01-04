import { Handle, Position } from 'reactflow';

const GenericNode = ({
  title,
  children,
  className = '',
  inputHandles = [],
  outputHandles = [],
  style = {}
}) => {
  return (
    <div className={`node ${className}`} style={style}>
      <h4>{title}</h4>
      {children}
      {inputHandles.map((handle, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            top: handle.top,
            background: '#555',
            width: '8px',
            height: '8px',
            border: '2px solid #fff'
          }}
        />
      ))}
      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            top: handle.top,
            background: '#555',
            width: '8px',
            height: '8px',
            border: '2px solid #fff'
          }}
        />
      ))}
    </div>
  );
};

export default GenericNode;
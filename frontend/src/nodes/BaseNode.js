function BaseNode({ title, children, className = '' }) {
  return (
    <div className={`node ${className}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default BaseNode;
//1
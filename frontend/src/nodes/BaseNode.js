function BaseNode({ title, children }) {
  return (
    <div style={{ border: "1px solid black", padding: 10 }}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default BaseNode;
//1
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    # Create adjacency list
    graph = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        graph[edge['source']].append(edge['target'])
        in_degree[edge['target']] += 1
    
    # Kahn's algorithm
    queue = deque([node for node in in_degree if in_degree[node] == 0])
    count = 0
    
    while queue:
        current = queue.popleft()
        count += 1
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return count == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(data: dict):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    errors = []
    results = {}

    # Build graph for execution
    graph = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    node_map = {node['id']: node for node in nodes}
    
    for edge in edges:
        graph[edge['source']].append(edge['target'])
        in_degree[edge['target']] += 1

    # Execute in topological order
    from collections import deque
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    
    while queue:
        current_id = queue.popleft()
        node = node_map[current_id]
        node_type = node["type"]
        
        if node_type == "customInput":
            value = node.get("data", {}).get("value", "")
            if not value:
                errors.append(f"Input node {node['id']} has no value")
                results[node['id']] = ""
            else:
                results[node['id']] = value
        elif node_type == "number":
            value = node.get("data", {}).get("value", 0)
            results[node['id']] = value
        elif node_type == "math":
            # Get inputs from edges
            inputs = {}
            for edge in edges:
                if edge['target'] == current_id:
                    target_handle = edge.get('targetHandle', 'a')  # default to 'a' if not specified
                    if edge['source'] in results:
                        inputs[target_handle] = results[edge['source']]
            
            a = inputs.get('a', 0)
            b = inputs.get('b', 0)
            operation = node.get("data", {}).get("operation", "add")
            try:
                if operation == "add":
                    results[node['id']] = float(a) + float(b)
                elif operation == "subtract":
                    results[node['id']] = float(a) - float(b)
                elif operation == "multiply":
                    results[node['id']] = float(a) * float(b)
                elif operation == "divide":
                    if float(b) == 0:
                        errors.append(f"Division by zero in math node {node['id']}")
                        results[node['id']] = 0
                    else:
                        results[node['id']] = float(a) / float(b)
                else:
                    results[node['id']] = 0
            except (ValueError, TypeError):
                errors.append(f"Invalid inputs in math node {node['id']}")
                results[node['id']] = 0
        elif node_type == "llm":
            # Get input from predecessor
            input_text = ""
            for edge in edges:
                if edge['target'] == current_id and edge['source'] in results:
                    input_text = str(results[edge['source']])
                    break
            # Simulate LLM processing - in real implementation, this would call an LLM API
            if input_text:
                results[node['id']] = f"LLM Response: {input_text.upper()}"  # Simple mock: uppercase the input
            else:
                results[node['id']] = "LLM Response: No input provided"
        elif node_type == "api":
            # Get input from predecessor
            input_data = ""
            for edge in edges:
                if edge['target'] == current_id and edge['source'] in results:
                    input_data = str(results[edge['source']])
                    break
            url = node.get("data", {}).get("url", "")
            method = node.get("data", {}).get("method", "GET")
            # Simulate API call - in real implementation, this would make HTTP requests
            if url:
                results[node['id']] = f"API {method} Response from {url}: {input_data or 'No input'}"
            else:
                errors.append(f"API node {node['id']} has no URL configured")
                results[node['id']] = "API Error: No URL configured"
        elif node_type == "text":
            template = node.get("data", {}).get("template", "")
            processed = template
            # Replace variables with results from predecessors
            for pred_id in [edge['source'] for edge in edges if edge['target'] == current_id]:
                if pred_id in results:
                    processed = processed.replace("{{" + pred_id + "}}", str(results[pred_id]))
            # Also replace {{input}} with input node values
            input_values = [results[node_id] for node_id, node in node_map.items() if node["type"] == "customInput" and node_id in results]
            if input_values:
                processed = processed.replace("{{input}}", str(input_values[0]))
            results[node['id']] = processed
        else:
            # For other nodes, just set empty result
            results[node['id']] = ""
        for neighbor in graph[current_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    dag_check = is_dag(nodes, edges)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": dag_check,
        "errors": errors,
        "results": results
    }

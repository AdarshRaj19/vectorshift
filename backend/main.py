@app.post("/pipelines/parse")
def parse_pipeline(data: dict):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    errors = []

    for node in nodes:
        if node["type"] == "input":
            value = node.get("data", {}).get("value", "")
            if not value:
                errors.append("Input node value is empty")

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": True,
        "errors": errors
    }

import requests

try:
    response = requests.post('http://127.0.0.1:8000/pipelines/parse', json={'nodes': [], 'edges': []})
    print("Backend response:", response.json())
except Exception as e:
    print("Error:", e)
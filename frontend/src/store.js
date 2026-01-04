// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

const saveToHistory = (newState, currentState) => {
    const history = [...currentState.history.slice(0, currentState.historyIndex + 1)];
    history.push({ nodes: currentState.nodes, edges: currentState.edges, nodeIDs: currentState.nodeIDs });
    return {
        ...newState,
        history,
        historyIndex: history.length - 1
    };
};

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    history: [],
    historyIndex: -1,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set((state) => {
            const newState = {
                nodes: [...state.nodes, node],
                edges: state.edges,
                nodeIDs: state.nodeIDs
            };
            return saveToHistory(newState, state);
        });
    },
    onNodesChange: (changes) => {
        set((state) => {
            const newNodes = applyNodeChanges(changes, state.nodes);
            const newState = { ...state, nodes: newNodes };
            return saveToHistory(newState, state);
        });
    },
    onEdgesChange: (changes) => {
        set((state) => {
            const newEdges = applyEdgeChanges(changes, state.edges);
            const newState = { ...state, edges: newEdges };
            return saveToHistory(newState, state);
        });
    },
    onConnect: (connection) => {
        set((state) => {
            const newEdges = addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, state.edges);
            const newState = { ...state, edges: newEdges };
            return saveToHistory(newState, state);
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    savePipeline: () => {
      const { nodes, edges } = get();
      localStorage.setItem('vectorshift-pipeline', JSON.stringify({ nodes, edges }));
    },
    loadPipeline: () => {
      const saved = localStorage.getItem('vectorshift-pipeline');
      if (saved) {
        const { nodes, edges } = JSON.parse(saved);
        set({ nodes, edges });
      }
    },
    clearPipeline: () => {
      set({ nodes: [], edges: [], nodeIDs: {}, history: [], historyIndex: -1 });
    },
    undo: () => {
        set((state) => {
            if (state.historyIndex > 0) {
                const prevState = state.history[state.historyIndex - 1];
                return {
                    ...prevState,
                    history: state.history,
                    historyIndex: state.historyIndex - 1
                };
            }
            return state;
        });
    },
    redo: () => {
        set((state) => {
            if (state.historyIndex < state.history.length - 1) {
                const nextState = state.history[state.historyIndex + 1];
                return {
                    ...nextState,
                    history: state.history,
                    historyIndex: state.historyIndex + 1
                };
            }
            return state;
        });
    },
  }));

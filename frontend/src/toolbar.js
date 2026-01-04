// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const savePipeline = useStore((s) => s.savePipeline);
    const loadPipeline = useStore((s) => s.loadPipeline);
    const clearPipeline = useStore((s) => s.clearPipeline);
    const undo = useStore((s) => s.undo);
    const redo = useStore((s) => s.redo);

    return (
        <div className="toolbar">
            <div className="node-palette">
                <div className="category">
                    <h4>Input</h4>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='number' label='Number' />
                    <DraggableNode type='boolean' label='Boolean' />
                </div>
                <div className="category">
                    <h4>Processing</h4>
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='math' label='Math' />
                    <DraggableNode type='api' label='API' />
                    <DraggableNode type='delay' label='Delay' />
                </div>
                <div className="category">
                    <h4>Output</h4>
                    <DraggableNode type='customOutput' label='Output' />
                </div>
            </div>
            <div className="actions">
                <button onClick={undo} className="action-btn">Undo</button>
                <button onClick={redo} className="action-btn">Redo</button>
                <button onClick={savePipeline} className="action-btn">Save</button>
                <button onClick={loadPipeline} className="action-btn">Load</button>
                <button onClick={clearPipeline} className="action-btn clear">Clear</button>
            </div>
        </div>
    );
};

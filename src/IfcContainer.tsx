import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from 'three';
import './IfcContainer.css';

const IfcContainer: React.FC = () => {
  const ifcContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);  // Added for direct ref access
  const [viewer, setViewer] = useState<IfcViewerAPI | null>(null);

  useEffect(() => {
    let ifcViewer: IfcViewerAPI | null = null;
    const ifcContainer = ifcContainerRef.current;
    
    if (ifcContainer && !viewer) {
      ifcViewer = new IfcViewerAPI({
        container: ifcContainer,
        backgroundColor: new Color(0xffffff),
      });
      ifcViewer.axes.setAxes();
      ifcViewer.grid.setGrid();
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false,
      }).then(() => {
        setViewer(ifcViewer);
      });
    }
  
    return () => {
      if (ifcViewer) {
        ifcViewer.dispose();
      }
    };
  }, []);

  const loadModel = async (file: File): Promise<void> => {
    if (viewer && file) {
      await viewer.IFC.setWasmPath('./');
      const url = URL.createObjectURL(file);
      try {
        const model = await viewer.IFC.loadIfcUrl(url);
        viewer.shadowDropper.renderShadow(model.modelID);
        viewer.clipper.active = true;
      } catch (error) {
        console.error("Error loading IFC model:", error);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      loadModel(event.target.files[0]);
    }
  };

  return (
    <div className="ifc-container">
      <input
        type="file"
        accept=".ifc"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}  // Use ref for direct access
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Browse IFC File
      </button>
      <div
        className="viewer-container"
        ref={ifcContainerRef}
        tabIndex={0}
      ></div>
    </div>
  );
};

export default IfcContainer;

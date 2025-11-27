import React, {useCallback, useRef, useState} from "react";
import {UploadCloud} from "lucide-react";

/*******************************
 drag and drop field
 ******************************/
type DragAndDropFieldProps = {
  action: (files: FileList) => void;
}

export function DragAndDropField(props: DragAndDropFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback((files: FileList | null) => {
    files && props.action(files);
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  }, [processFiles]);

  return (
    <div
        className={`col-span-10 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-gray-500">
          Drag and drop images here, or click to select files
        </p>
        <p className="text-xs text-gray-400">
          Supported formats: JPEG, PNG
        </p>
      </div>
      <input
          id="file-input"
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={handleFileInputChange}
      />
    </div>
  )
}
'use client'

import React, { useState, useCallback } from 'react';
import {DragAndDropField} from "@/components/form-components/drag-and-drop/drag-and-drop-field";
import {DragAndDropPreview} from "@/components/form-components/drag-and-drop/drag-and-drop-preview";
import {DragAndDropImageFile, SupaBaseAudit} from "@/types/audit/types";
import {Loader2, UploadCloud} from "lucide-react";
import {deleteImageFromStorage, uploadImagesToStorage} from "@/actions/audit";

interface AuditImageViewUploadFormProps {
  auditId: string,
  images: SupaBaseAudit['images'],
}

export default function AuditImageViewUploadForm(props: AuditImageViewUploadFormProps) {
  const [images, setImages] = useState<SupaBaseAudit['images'] | []>(props.images);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const handleNewDataDrop = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: DragAndDropImageFile[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        preview: URL.createObjectURL(file),
        file: file
      }));
    setHasUpdated(true)
    setImages(prev => prev ? [...prev, ...newImages] : newImages);
  }, []);

  const handleRemoveImage = useCallback(async (id: string, name: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
    const response = await deleteImageFromStorage(props.auditId, name)
    console.log(response, props.auditId, id);
  }, []);


  const uploadImages = async () => {
    setIsUploading(true);
    try {
      const response = await uploadImagesToStorage(props.auditId, images);
      if (response.error) throw response.error;
    } catch (error) {
      // TODO: how to display errors here?
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setHasUpdated(false);
      }, 1000)
    }
  }

  return (
      <>
        <div className="grid grid-cols-12 gap-4 mt-4 mx-auto w-[90%]">
          <div className="col-span-10 space-y-4">
            <DragAndDropField
                action={handleNewDataDrop}
            />
          </div>
          <div className="col-span-2">
            <button
                disabled={isUploading || !hasUpdated}
                className="relative flex justify-center items-center border h-full aspect-square rounded-lg hover:bg-neutral-200"
                onClick={uploadImages}
            >
              {hasUpdated &&
                  <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-emerald-700"></span>
                </span>
              }
              {isUploading ?
                  <Loader2 className="animate-spin"/> :
                  <UploadCloud />
              }
            </button>
          </div>
        </div>
        <DragAndDropPreview
            images={images}
            action={handleRemoveImage}
        />
      </>
  );
}

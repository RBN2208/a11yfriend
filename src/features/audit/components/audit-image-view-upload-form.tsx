'use client'

import React, { useState } from 'react';
import {DragAndDropField} from "@/components/form-components/drag-and-drop/drag-and-drop-field";
import {DragAndDropImageFile, SupabaseAudit} from "@/features/audit/manual/types/types";
import {Ban, CircleCheck, Loader2, ScanSearch, TriangleAlert, UploadCloud, X} from "lucide-react";
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {Button} from "@/components/shadcn-components/ui/button";
import {useRouter} from "next/navigation";
import {deleteImage, mergeImagesToAudit, uploadImage} from "@/features/images/actions";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/message-codes";

interface AuditImageViewUploadFormProps {
  auditId: string,
  images: SupabaseAudit['images'],
}

// TODO: Images need to be included in exported word document
export default function AuditImageViewUploadForm(props: AuditImageViewUploadFormProps) {
  const [images, setImages] = useState<SupabaseAudit['images'] | []>(props.images);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const router = useRouter();

  const handleNewDataDrop = (files: FileList | null) => {
    if (!files) return;

    setImages(prev => {
      const existingNames = new Set(prev.map(img => img.name));

      const newImages: DragAndDropImageFile[] = Array.from(files)
          .filter(file => file.type.startsWith("image/"))
          .filter(file => !existingNames.has(file.name)) // only new images by name
          .map(file => ({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            preview: URL.createObjectURL(file),
            file,
            uploadStatus: "idle" as const,
          }));

      if (newImages.length > 0) {
        setHasUpdated(true);
      }

      return [...prev, ...newImages];
    });
  };

  const handleRemoveImage = async (id: string, name: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
    const { success, message, globalError } = await deleteImage(props.auditId, name);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message, { description: globalError });
    }
  };

  const uploadImages = async () => {
    setIsUploading(true);

    // react state is async, so we create a copy of state and set it at the end
    let currentImages: DragAndDropImageFile[] = images.map(img =>
        img.file && img.uploadStatus !== 'success' ? { ...img, uploadStatus: 'uploading' } : img
    );

    setImages(currentImages);

    try {
      // handle each image separatly to trigger individual upload states etc
      for (let i = 0; i < currentImages.length; i++) {
        const image = currentImages[i];

        if (image.file && image.uploadStatus !== 'success') {
          try {
            const transformedImage = await uploadImage(props.auditId, image);

            currentImages = currentImages.map(img =>
                img.id === image.id ?
                    {
                      ...img,
                      uploadStatus: transformedImage.data.uploadStatus,
                      preview: transformedImage.data.preview
                    } :
                    img
            );

            setImages(currentImages);
          } catch (error) {
            currentImages = currentImages.map(img =>
                img.id === image.id ? { ...img, uploadStatus: 'error' } : img
            );

            setImages(currentImages);
            console.error(`Error uploading image ${image.name}:`, error);
          }
        }
      }

      const updatedImages = currentImages.map(img => ({
        id: img.id,
        name: img.name,
        preview: img.preview,
        uploadStatus: img.uploadStatus
      }));

      const { success, message, globalError } = await mergeImagesToAudit(props.auditId, updatedImages);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message, { description: globalError });
      }
    } catch (error) {
      toast.error(MessageCodes.GENERIC_UNEXPECTED_ERROR);
      currentImages = currentImages.map(img =>
          img.uploadStatus === 'uploading' ? { ...img, uploadStatus: 'error' } : img
      );
      setImages(currentImages);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setHasUpdated(false);
        router.refresh();
      }, 1000);
    }
  };

  const openImageInModalTrigger = <Button variant={"outline"} size={"icon"}><ScanSearch /></Button>;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-4 mx-auto w-full">
        <div className="col-span-10 space-y-4">
          <DragAndDropField
              action={handleNewDataDrop}
          />
        </div>
        <div className="flex items-center col-span-2">
          <Button
              variant="outline"
              disabled={isUploading || !hasUpdated}
              className="relative flex justify-center items-center w-full border aspect-square rounded-lg hover:bg-neutral-200"
              onClick={uploadImages}
          >
            {hasUpdated &&
                <span className="absolute -top-1 -right-1 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-700"></span>
              </span>
            }
            {isUploading ?
                <>
                  <Loader2 className="animate-spin"/> Uploading...
                </> :
                <>
                  <UploadCloud /> Upload
                </>
            }
          </Button>
        </div>
      </div>
      <div>
        {images && images.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {images.map((image) => (
              <React.Fragment key={image.id}>
                <div
                    className="grid items-center justify-center grid-cols-10 border rounded-md p-2"
                >
                  <img
                      className="w-16 h-16 aspect-square object-cover col-span-1 rounded-md"
                      src={image.preview}
                      alt=""
                  />

                  <div className="col-span-2 flex items-center">
                    <p>{image.name}</p>
                  </div>

                  <div className="flex items-center col-span-4">
                    {image.uploadStatus === 'idle' && (
                        <>
                          <TriangleAlert className="ml-2 text-blue-500 mr-2" /> Not uploaded yet!
                        </>
                    )}
                    {image.uploadStatus === 'uploading' && (
                        <>
                          <Loader2 className="ml-2 animate-spin text-blue-500 mr-2" /> Uploading...
                        </>
                    )}
                    {image.uploadStatus === 'success' && (
                        <>
                          <CircleCheck className="ml-2 text-green-500 font-bold mr-2"></CircleCheck> Uploaded successfully!
                        </>
                    )}
                    {image.uploadStatus === 'error' && (
                        <>
                          <Ban className="ml-2 text-red-500 font-bold mr-2"></Ban> An error occurred!
                        </>
                    )}
                  </div>

                  <div className="flex justify-end col-span-3 mr-4">
                    <DialogWrapper
                        title="Image preview"
                        description="Image preview"
                        dialogTrigger={openImageInModalTrigger}
                        dialogSize="max-w-4xl"
                    >
                      <div className="flex justify-center">
                        <img
                            src={image.preview}
                            alt={image.name}
                            className="max-h-96 object-contain"
                        />
                      </div>
                      <p className="text-center mt-2 text-sm text-gray-500">{image.name}</p>
                    </DialogWrapper>

                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        title="Delete image"
                        onClick={async () => {
                          await handleRemoveImage(image.id, image.name);
                        }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import React from "react";
import DialogWrapper from "@/components/shadn-wrappers/DialogWrapper";
import {X} from "lucide-react";
import {DragAndDropImageFile} from "@/types/audit/types";

type DragAndDropFieldProps = {
  images: DragAndDropImageFile[],
  action: (id: string, name: string) => void
}
export function DragAndDropPreview(props: DragAndDropFieldProps) {
  return (
    <>
      {props.images && props.images.length > 0 && (
          <div className="flex gap-4 mt-4">
            {props.images.map((image) => (
                <div key={image.id} className="relative group">
                  <DialogWrapper
                      title="Image preview"
                      description="Image preview"
                      dialogTrigger={
                        <div className="relative cursor-pointer overflow-hidden rounded-lg aspect-square">
                          <img
                              src={image.preview}
                              alt={image.name}
                              className="w-32 h-32 object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      }
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

                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        props.action(image.id, image.name);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
            ))}
          </div>
        )}
    </>
  )
}
import {DragAndDropImageFile} from "@/types/audit/types";
import {createClient} from "@/utils/supabase/server";
import {getAudit} from "@/actions/audit";

const STORAGE_BUCKET_NAME = "images";

export async function uploadImage(auditId: string, images: DragAndDropImageFile[]) {
  const supabase = await createClient();

  // Process each image individually to handle errors properly
  const processedImages: DragAndDropImageFile[] = [];
  const errors: Error[] = [];

  // Process images sequentially to better handle errors
  for (const image of images) {
    try {
      // Skip images without a file
      if (!image.file) {
        continue;
      }

      const IMAGE_PATH = `${auditId}/${image.name}`;

      // Check if image already exists
      const { data: imageExists } = await supabase.storage
        .from(STORAGE_BUCKET_NAME)
        .exists(IMAGE_PATH);

      // If image exists, get its public URL
      if (imageExists) {
        const { data } = supabase.storage
          .from(STORAGE_BUCKET_NAME)
          .getPublicUrl(IMAGE_PATH);

        // Create a new image object instead of mutating the original
        processedImages.push({
          ...image,
          preview: data.publicUrl
        });
        continue;
      }

      // Upload new image
      const { error: storageError, data: imageData } = await supabase.storage
        .from(STORAGE_BUCKET_NAME)
        .upload(IMAGE_PATH, image.file);

      if (storageError) {
        errors.push(storageError);
        continue;
      }

      if (imageData) {
        const { data } = supabase.storage
          .from(STORAGE_BUCKET_NAME)
          .getPublicUrl(imageData.path);

        // Create a new image object instead of mutating the original
        processedImages.push({
          ...image,
          preview: data.publicUrl
        });
      }
    } catch (error) {
      errors.push(error instanceof Error ? error : new Error('Unknown error during image processing'));
    }
  }

  // Return error if any uploads failed
  if (errors.length > 0) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "Sorry, we couldn't upload some of your images. Please try again.",
      }
    };
  }

  try {
    // Get current audit data
    const audit = await getAudit(auditId);

    if (!audit.data) {
      return {
        success: false,
        error: {
          field: 'root',
          message: "Could not find the audit to update with images.",
        }
      };
    }

    // Update audit with processed images
    const updatedAudit = {
      ...audit.data,
      images: processedImages
    };

    // Save to database
    const { error: updateError } = await supabase
      .from('audits')
      .update([updatedAudit])
      .eq('id', auditId);

    if (updateError) {
      return {
        success: false,
        error: {
          field: 'root',
          message: "Sorry, we couldn't save the images to your audit. Please try again.",
        }
      };
    }

    return {
      success: true,
      error: null
    };
  } catch (error) {
    return {
      success: false,
      error: {
        field: 'root',
        message: "An error occurred while updating the audit with images.",
      }
    };
  }
}

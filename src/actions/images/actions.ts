'use server'
import {DragAndDropImageFile, SupaBaseAudit} from "@/types/audit/types";
import {createClient} from "@/utils/supabase/server";
import {ApiResponse} from "@/types/api/types";
import {createApiResponse, getAudit} from "@/actions/audit/actions";

const STORAGE_BUCKET_NAME = "images";

export async function mergeImagesToAudit(auditId: string, images: DragAndDropImageFile[]): Promise<ApiResponse> {
  const supabase = await createClient();

  // save transformed images to audit
  const audit = await getAudit(auditId);
  const updatedAudit = {
    ...audit.data,
    images: [...images]
  }
  const { data: updateData, error: updateError} = await supabase
    .from('audits')
    .update([updatedAudit])
    .eq('id', auditId);

  if (updateError) {
    return createApiResponse({
      success: false,
      globalError: "Sorry, we couldn't save the images to your audit. Please try again."
    })
  }

  return createApiResponse({
    success: true,
    message: "Images uploaded successfully",
  })
}

export async function uploadImage(auditId: string, image: DragAndDropImageFile): Promise<ApiResponse> {
  const supabase = await createClient();

  const FILE_PATH = `${auditId}/${image.name}`;
  const {data: imageExists} = await supabase.storage
    .from(STORAGE_BUCKET_NAME)
    .exists(FILE_PATH);

  if (imageExists) {
    return createApiResponse({
      success: false,
      data: image,
      globalError: "Image already exists, please try again later."
    })
  }

  if (image.file !== undefined) {
    const {error, data} = await supabase
      .storage
      .from('images')
      .upload(`${auditId}/${image.name}`, image.file);


    if (data) {
      const {data: {publicUrl}} = supabase.storage.from('images').getPublicUrl(data.path);
      image.preview = publicUrl;
      image.uploadStatus = 'success';
    }

    if (error) {
      image.uploadStatus = 'error';
    }

    return createApiResponse({
      success: error === null,
      data: {
        id: image.id,
        name: image.name,
        preview: image.preview,
        uploadStatus: image.uploadStatus
      },
      globalError: error?.message || "Sorry, we couldn't upload your image. Please try again."
    })
  }

  return createApiResponse({
    success: false,
    data: image,
    globalError: "An unexpected error occurred, please try again later."
  })
}

export async function deleteImage(auditId: string, name: string): Promise<ApiResponse> {
  const supabase = await createClient();
  const filePath = `${auditId}/${name}`;
  await supabase.storage.from('images').remove([filePath]);

  const response = await getAudit(auditId);
  const audit = response.data as SupaBaseAudit;

  const updatedAudit = {
    ...audit,
    images: audit?.images.filter((image) => image.name !== name)
  }
  const {data: deleteData, error: deleteError} = await supabase
    .from('audits')
    .update([updatedAudit])
    .eq('id', auditId);

  if (deleteError) {
    return createApiResponse({
      success: false,
      globalError: "Sorry, we couldn't delete your image. Please try again."
    })
  }

  return createApiResponse({
    success: true,
    message: "Image deleted successfully",
  })
}
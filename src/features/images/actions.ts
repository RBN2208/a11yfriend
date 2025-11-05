'use server'
import {DragAndDropImageFile, SupabaseAudit} from "@/features/audit/types/types";
import {createServerSupabase} from "@/shared/supabase/server";
import {ApiResponse} from "@/shared/api/types/types";
import {createApiResponse} from "@/shared/api/response";
import {getAudit} from "@/features/audit/actions/actions";
import {MessageCodes} from "@/shared/message-codes";

const STORAGE_BUCKET_NAME = "images";

export async function mergeImagesToAudit(auditId: string, images: DragAndDropImageFile[]): Promise<ApiResponse> {
  const supabase = await createServerSupabase();

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
      globalError: updateError.message,
      message: MessageCodes.AUDIT_IMAGE_SAVE_ERROR
    })
  }

  return createApiResponse({
    success: true,
    message: MessageCodes.AUDIT_IMAGE_UPLOAD_SUCCESS
  })
}

export async function uploadImage(auditId: string, image: DragAndDropImageFile): Promise<ApiResponse> {
  const supabase = await createServerSupabase();
  const FILE_PATH = `${auditId}/${image.name}`;

  const {data: imageExists, error: imageExistsError } = await supabase.storage
    .from(STORAGE_BUCKET_NAME)
    .exists(FILE_PATH);

  if (imageExists) {
    return createApiResponse({
      success: false,
      data: image,
      message: MessageCodes.AUDIT_IMAGE_EXISTS_ERROR,
      globalError: imageExistsError?.message
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
      message: MessageCodes.AUDIT_IMAGE_UPLOAD_ERROR,
      globalError: error?.message
    })
  }

  return createApiResponse({
    success: false,
    data: image,
    globalError: MessageCodes.GENERIC_UNEXPECTED_ERROR
  })
}

export async function deleteImage(auditId: string, name: string): Promise<ApiResponse> {
  const supabase = await createServerSupabase();
  const filePath = `${auditId}/${name}`;
  await supabase.storage.from('images').remove([filePath]);

  const response = await getAudit(auditId);
  const audit = response.data as SupabaseAudit;

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
      globalError: deleteError.message,
      message: MessageCodes.AUDIT_IMAGE_DELETE_ERROR
    })
  }

  return createApiResponse({
    success: true,
    message: MessageCodes.AUDIT_IMAGE_DELETE_SUCCESS
  })
}
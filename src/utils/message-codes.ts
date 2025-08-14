export enum MessageCodes {
    GENERIC_UNEXPECTED_ERROR = "An unexpected error occurred",

    AUDIT_IMAGE_UPLOAD_ERROR = "An error occurred while uploading the audit image. Please try again.",
    AUDIT_IMAGE_EXISTS_ERROR = "An error occurred while uploading the audit image. The image already exists.",
    AUDIT_IMAGE_DELETE_ERROR = "An error occurred while deleting the audit image. Please try again.",
    AUDIT_IMAGE_DELETE_SUCCESS = "Audit image deleted successfully",
    AUDIT_IMAGE_UPLOAD_SUCCESS = "Audit image uploaded successfully",
    AUDIT_IMAGE_SAVE_ERROR = "An error occurred while saving the audit image. Please try again.",

    AUDIT_CREATE_SUCCESS = "Audit created successfully",
    AUDIT_CREATE_ERROR = "An error occurred while inserting the audit data into the database. Please try again.",
    AUDIT_CREATE_ERROR_UNEXPECTED = "An unexpected error occurred while inserting the audit data into the database. Please try again.",

    AUDIT_UPDATE_SUCCESS = "Audit updated successfully",
    AUDIT_UPDATE_ERROR = "An error occurred while updating the audit data in the database. Please try again.",
    AUDIT_UPDATE_ERROR_UNEXPECTED = "An unexpected error occurred while updating the audit data in the database. Please try again.",

    AUDIT_RESULTS_UPDATE_SUCCESS = "Audit results updated successfully",
    AUDIT_RESULTS_UPDATE_ERROR = "An error occurred while updating the audit results in the database. Please try again.",
    AUDIT_RESULTS_UPDATE_ERROR_UNEXPECTED = "An unexpected error occurred while updating the audit results in the database. Please try again.",

    AUDIT_GET_SUCCESS = "Audit retrieved successfull",
    AUDITS_GET_SUCCESS = "Audits retrieved successfully",
    AUDIT_GET_GENERIC_ERROR = "An error occurred while retrieving the audit data from the database. Please try again.",
    AUDIT_GET_GENERIC_ERROR_UNEXPECTED = "An unexpected error occurred while retrieving the audit data from the database. Please try again.",

    AUDIT_DELETE_SUCCESS = "Audit deleted successfully",
    AUDIT_DELETE_ERROR = "An error occurred while deleting the audit data from the database. Please try again.",
    AUDIT_DELETE_ERROR_UNEXPECTED = "An unexpected error occurred while deleting the audit data from the database. Please try again.",

    AUTH_USER_VERIFY_SUCCESS = "Authentication successful",
    AUTH_USER_VERIFY_ERROR = "Authentication failed, could not verify user",
    AUTH_REGISTER_SUCCESS = "Registration successful",
    AUTH_REGISTER_ERROR = "Registration failed",
    AUTH_PASSWORD_CHANGE_ERROR = "Password change failed",
    AUTH_PASSWORD_CHANGE_SUCCESS = "Password change successful",
    AUTH_LOGIN_SUCCESS = "Login successful",
    AUTH_LOGIN_ERROR = "Login failed",
    AUTH_OTP_ERROR = "OTP verification failed",
    AUTH_OTP_SUCCESS = "OTP verification successful",


    FORM_DATA_VALIDATION_ERROR = "Form data validation error",
}
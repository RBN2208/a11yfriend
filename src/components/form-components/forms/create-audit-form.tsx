"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {createAuditSchema} from "@/features/audit/manual/zod-schema";
import {Form} from "@/components/shadcn-components/ui/form"
import React, {useState} from 'react';
import {AlertCircleIcon} from 'lucide-react';
import {
    FormButton,
    InputElement,
    SelectElement,
    TextAreaElement
} from "@/components/form-components/elements/form-elements";
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import {SupabaseAudit} from "@/features/audit/manual/types/types";
import {createAudit, updateAudit} from "@/features/audit/manual/actions/actions";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/message-codes";

type CreateAuditFormProps = {
    auditData: SupabaseAudit | undefined,
    isEditModal: boolean,
    callbackAction?: () => void,
}

const VERSION_OPTIONS = [
    {label: 'v2.0', value: '2.0'},
    {label: 'v2.1', value: '2.1'},
    {label: 'v2.2', value: '2.2'},
]

const CONFORMANCE_OPTIONS = [
    {label: 'A', value: 'A'},
    {label: 'AA', value: 'AA'},
    {label: 'AAA', value: 'AAA'},
]

export default function CreateAuditForm(props: CreateAuditFormProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof createAuditSchema>>({
        resolver: zodResolver(createAuditSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: props.auditData?.name || "",
            description: props.auditData?.description || "",
            status: props.auditData?.status || "draft",
            customer: props.auditData?.customer || "",
            project_name: props.auditData?.project_name || "",
            module: props.auditData?.module || "",
            version: props.auditData?.version || undefined,
            conformance: props.auditData?.conformance || undefined,
            miscellaneous: props.auditData?.miscellaneous || ''
        }
    })

    async function onSubmit(values: z.infer<typeof createAuditSchema>) {
        setLoading(true);
        try {
            const { success, data, message, globalError, errors } = props.isEditModal ?
                await updateAudit(values, props.auditData?.id || "") :
                await createAudit(values);

            if (success) {
                toast.success(message);
                props.callbackAction && props.callbackAction();
                return;
            }

            if (errors) {
                errors.forEach(error => {
                    form.setError(
                        error.field as keyof z.infer<typeof createAuditSchema>,
                        {message: error.error}
                    )
                })
                toast.error(message, { description: globalError });
            }
        } catch (error) {
            form.setError('root', error || MessageCodes.GENERIC_UNEXPECTED_ERROR);
            toast.error(MessageCodes.GENERIC_UNEXPECTED_ERROR)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">

                <InputElement label="Audit name"
                              required={true}
                              name="name"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Customer name"
                              required={true}
                              name="customer"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Project name"
                              required={true}
                              name="project_name"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Module name"
                              required={true}
                              name="module"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <SelectElement name="version"
                               label="Version"
                               required={true}
                               options={VERSION_OPTIONS}
                               placeholder="Version"
                               className="w-full sm:w-1/4 p-2"
                />

                <SelectElement name="conformance"
                               label="Conformance"
                               required={true}
                               options={CONFORMANCE_OPTIONS}
                               placeholder="Conformance level"
                               className="w-full sm:w-1/4 p-2"
                />

                <div className="w-full sm:w-2/4"></div>


                <TextAreaElement name="description"
                                 label="Description"
                                 className="w-full sm:w-1/2 p-3"
                />


                <TextAreaElement name="miscellaneous"
                                 label="Miscellaneous"
                                 description="Any other information you want to add"
                                 className="w-full sm:w-1/2 p-3"
                />


                <FormButton loading={loading}
                            loadingLabel="Creating audit"
                            label={props.auditData ? 'Update' : 'Create'}
                />

                {form.formState.errors && form.formState.errors.root &&
                    <AlertWrapper
                        title="Sorry, we could not create your audit"
                        variant="destructive"
                        icon={<AlertCircleIcon/>}
                    >
                        {form.formState.errors.root.message}
                    </AlertWrapper>
                }
            </form>
        </Form>
    )
}

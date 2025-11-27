import {TextAreaElement} from "@/components/form-components/elements/form-elements";
import {Button} from "@/components/shadcn-components/ui/button";
import {AlertCircleIcon, Info, Loader2} from "lucide-react";
import AlertWrapper from "@/components/shadn-wrappers/AlertWrapper";
import {Form} from "@/components/shadcn-components/ui/form";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/message-codes";
import {aiReviewSchema} from "@/features/audit/ai/zod-schema";
import {startAiReview} from "@/features/audit/manual/actions/actions";

export function AIReviewModule() {
    const [loading, setLoading] = useState(false);

    const form = useForm < z.infer < typeof aiReviewSchema >> ({
        resolver: zodResolver(aiReviewSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            code: "",
            description: ""
        }
    })

    async function onSubmit(values: z.infer <typeof aiReviewSchema>) {
        setLoading(true);
        try {
            const response = await startAiReview(values);

            if (response.errors) {
                response.errors.forEach(error => {
                    form.setError(
                        error.field as keyof z.infer<typeof aiReviewSchema>,
                        {message: error.error}
                    )
                })
            }

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            form.setError('root', error || "");
            toast.error(MessageCodes.AUDIT_AI_REVIEW_ERROR_UNEXPECTED);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <AlertWrapper
                    title="Additional Information"
                    variant="default"
                    icon={<Info />}
                >
                    This is a check for the accessibility of your component. Therefore, we will need the final, rendered html of your component.
                    Please provide the full html fragment of your component, otherwise we will not be able to fully check it and some is missed or wrong.
                    <br/>
                    <br/>
                    <strong>Please note:</strong> This is a beta feature. We are currently working on it.
                </AlertWrapper>

                <TextAreaElement
                    name="description"
                    rows={5}
                    hint="Please provide a short description of your component."
                    label="Description"
                />

                <TextAreaElement
                    name="code"
                    rows={10}
                    label="HTML Fragment"
                />
                <Button
                    disabled={loading}
                    className="w-max mt-4"
                >
                    {loading && <Loader2 className="animate-spin"/>}
                    {loading ? 'Review in process...' : 'Start review'}
                </Button>

                {form.formState.errors && form.formState.errors.root &&
                    <AlertWrapper
                        title="Sorry, there was an technical error."
                        variant="destructive"
                        icon={<AlertCircleIcon />}
                    >
                        {form.formState.errors.root.message}
                    </AlertWrapper>
                }
            </form>
        </Form>
    )
}
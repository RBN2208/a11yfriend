'use client'

import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn-components/ui/form";
import {Input} from "@/components/shadcn-components/ui/input";
import React from "react";
import {Textarea} from "@/components/shadcn-components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/shadcn-components/ui/select";
import {Loader2} from "lucide-react";
import {Button} from "@/components/shadcn-components/ui/button";
import {PasswordInput} from "@/components/shadcn-components/ui/password-input";


/*******************************
    text, email, password
 ******************************/
type InputElementProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  type?: string;
  className?: string;
}

export function InputElement({
                               name,
                               label,
                               required = false,
                               placeholder,
                               description,
                               type = "text",
                               className,
                               ...props
                             }: InputElementProps) {
  const {control, formState: {errors}} = useFormContext();

  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({field}) => (
          <FormItem>
            {label &&
              <FormLabel className="!text-current">
                {label} {required && <span className="text-primary">*</span>}
              </FormLabel>
            }
            <FormControl>
              {type === "password" ?
                <PasswordInput className={errors[name] ? "border-destructive" : ""}
                               placeholder={placeholder}
                               {...field}
                /> :
                <Input placeholder={placeholder}
                       type={type}
                       className={errors[name] ? "border-destructive" : ""}
                       {...field}
                />
              }
            </FormControl>

            {description &&
              <FormDescription>
                {description}
              </FormDescription>
            }

            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  )
}


/*******************************
  textarea
 ******************************/
type TextAreaElementProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function TextAreaElement({
                               name,
                               label,
                               required = false,
                               placeholder,
                               description,
                               className,
                               ...props
                             }: TextAreaElementProps) {
  const {control, formState: {errors}} = useFormContext();

  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({field}) => (
          <FormItem>
            {label &&
              <FormLabel className="!text-current">
                {label} {required && <span className="text-primary">*</span>}
              </FormLabel>
            }
            <FormControl>
              <Textarea placeholder=""
                        className={errors[name] ? "border-destructive" : ""}
                        {...field}
              />
            </FormControl>

            {description &&
              <FormDescription>
                {description}
              </FormDescription>
            }

            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  )
}

/*******************************
 select
 ******************************/
type SelectElementProps = {
  name: string;
  label: string;
  options: {label: string, value: string}[],
  innerLabel?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function SelectElement({
                                  name,
                                  label,
                                  innerLabel,
                                  options,
                                  required = false,
                                  placeholder,
                                  description,
                                  className,
                                  ...props
                                }: SelectElementProps) {
  const {control, formState: {errors}} = useFormContext();

  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            { label &&
              <FormLabel className="!text-current">
                {label} {required && <span className="text-primary">*</span>}
              </FormLabel>
            }
            <FormControl>
              <Select
                  value={field.value}
                  onValueChange={field.onChange}
              >
                <SelectTrigger className={errors[name] ? "border-destructive" : ""}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    { innerLabel &&
                      <SelectLabel>
                        {innerLabel}
                      </SelectLabel>
                    }
                    {options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            { description &&
              <FormDescription>
                {description}
              </FormDescription>
            }
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}


/*******************************
 button
 ******************************/
type FormButtonProps = {
  loading: boolean;
  loadingLabel: string,
  label: string,
  className?: string;
}

export function FormButton({ label, loading, loadingLabel, className, ...props}: FormButtonProps) {
  return (
      <Button disabled={loading} className={`w-full mt-4 ${className}`} {...props}>
        {loading && <Loader2 className="animate-spin"/>}
        {loading ? loadingLabel : label}
      </Button>
  )
}
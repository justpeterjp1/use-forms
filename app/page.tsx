"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { PROJECT_STATUSES, projectSchema } from "@/schemas/project"
import { createProject } from "./actions/project"
import { toast } from "sonner"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"


export default function Home () {
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
      notifications: {
        email: false,
        push: false,
        sms: false
      },
      users: [{email: "" }],
    },
    resolver: zodResolver(projectSchema)
  })
  useFieldArray({
    control: form.control,
    name: "users"
  })
  async function onSubmit(data: z.infer<typeof projectSchema>) {
    const res = await createProject(data)

    if(res.success) {
      form.reset()
      toast("project created sucessfully", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono",
      })
    } else {
      toast("failed to create project")
    }
  }
  return (    <div className="container px-4 mx-auto my-6 ">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Name */}
          <Controller
          control={form.control}
          name="name"
          render = {({field, fieldState}) => {
            return (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input 
                {...field} 
                id={field.name} 
                aria-invalid={fieldState.invalid}/>
                <FieldError errors={[fieldState.error]} />
            </Field>
            )
          }}
            />

          <Controller
          control={form.control}
          name="description"
          render = {({field, fieldState}) => {
            return (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <FieldDescription>Be as specific as possible</FieldDescription>
              </FieldContent>
                <Textarea 
                {...field} 
                id={field.name} 
                aria-invalid={fieldState.invalid}/>
                <FieldError errors={[fieldState.error]} />
            </Field>
            )
          }}
            />
            {/* SELECT INPU T */}
          <Controller
          control={form.control}
          name="status"
          render = {({field: { onChange, onBlur, ...field}, fieldState}) => {
            return (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger
                  aria-invalid={fieldState.invalid} 
                  id={field.name}
                  onBlur={onBlur}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status: string) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
            </Field>
            )
          }}
            />
            {/* New one */}
            <FieldSet>
                <FieldContent>
                  <FieldLegend>Notifications</FieldLegend>
                  <FieldDescription>Select how you would like to receive notifications</FieldDescription>
                </FieldContent>
                <FieldGroup data-slot="checkbox-group">
                   <Controller
                    control={form.control}
                    name="notifications.email"
                    render = {({field: {value, onChange, ...field}, fieldState}) => {
                      return (
                      <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <Checkbox
                  {...field}
                  id={field.name}
                  checked={value}
                  aria-invalid={fieldState.invalid}
                  onCheckedChange={onChange} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
            </Field>
            )
          }}
            />
                   <Controller
                    control={form.control}
                    name="notifications.sms"
                    render = {({field: {value, onChange, ...field}, fieldState}) => {
                      return (
                      <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <Checkbox
                  {...field}
                  id={field.name}
                  checked={value}
                  aria-invalid={fieldState.invalid}
                  onCheckedChange={onChange} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
            </Field>
            )
          }}
            />
                   <Controller
                    control={form.control}
                    name="notifications.push"
                    render = {({field: {value, onChange, ...field}, fieldState}) => {
                      return (
                      <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <Checkbox
                  {...field}
                  id={field.name}
                  checked={value}
                  aria-invalid={fieldState.invalid}
                  onCheckedChange={onChange} />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>In App</FieldLabel>
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
            </Field>
            )
          }}
            />
                </FieldGroup>
            </FieldSet>
            <Button>Create</Button>
        </FieldGroup>

    </form>
    </div>
  )
}
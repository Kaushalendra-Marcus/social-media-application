"use client"
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { commentValidation } from '@/lib/validations/thread'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'
// import { createThread } from '@/lib/actions/thread.actions' We require AddComment
interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}
const Comment = (
    {
        threadId,
        currentUserImg,
        currentUserId
    }: Props
) => {
    const router = useRouter();
    const pathname = usePathname();
    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        try {
            await addCommentToThread(
                threadId,
                values.thread,
                JSON.parse(currentUserId),
                pathname
            );
            form.reset(); // ✅ reset after successful submit
        } catch (error) {
            console.error("Failed to comment:", error);
        }
    };

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: ""
        }
    })
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='comment-form'
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex items-center w-full gap-3 mt-4'>
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt='Profile Image'
                                    width={40}
                                    height={40}
                                    className='object-contain rounded-full ' />
                            </FormLabel>
                            <FormControl className='bg-transparent border-none'>
                                <Input
                                    type='text'
                                    placeholder='Add your comment...'
                                    className='outline-none no-focus text-light-1'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit'
                    className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}
export default Comment;
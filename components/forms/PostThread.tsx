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
import { threadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'

// import { updateUser } from '@/lib/actions/user.actions';
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname
        })
        router.push("/")
    }
    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: "",
            accountId: userId
        }
    })
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex-col justify-start gap-10'
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex-col items-center w-full gap-3 mt-4'>
                            <FormLabel className='!text-light-2 text-base-semibold'>
                                Content
                            </FormLabel>
                            <FormControl className='border-dark-4 bg-dark-3 text-light-1 no-focus'>
                                <Textarea
                                    rows={14}
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'
                    className='mt-6 bg-primary-500'>
                    Create Post
                </Button>
            </form>
        </Form>
    )
}

export default PostThread
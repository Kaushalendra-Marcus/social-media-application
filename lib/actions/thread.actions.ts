"use server"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectToMDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread({
    text, author, communityId, path
}: Params) {
    try {
        connectToMDB()
        const createdThread = await Thread.create({
            text,
            author,
            community: null
        })
        //  updating the user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
        revalidatePath(path) // this will ensure immidiate changes in next js
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToMDB()
    const skipAmount = (pageNumber - 1) * pageSize
    const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })
    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })
    const posts = await postQuery.exec()
    const isNext = totalPostsCount > skipAmount + posts.length
    return { posts, isNext }
}


export async function fetchThreadById(id: string) {
    connectToMDB()
    try {
        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: 'User',
                select: '_id id name image'
            })
            .populate({
                path: 'children',
                populate: [{
                    path: 'author',
                    model: 'User',
                    select: '_id id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: 'User',
                        select: '_id id name parentId image'
                    }
                }
                ]
            })
        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread : ${error.message}`)
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToMDB()
    try {
        const originalThread = await Thread.findById(threadId)
        if (!originalThread) {
            throw new Error("Post not found")
        }
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        })
        const savedCommentThread = await commentThread.save();
        originalThread.children.push(savedCommentThread._id)
        await originalThread.save()


    } catch (error: any) {
        throw new Error(`Error during adding the reply in the post: ${error.message}`)
    }
}
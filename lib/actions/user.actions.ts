"use server"

import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToMDB } from "../mongoose"
import Thread from "../models/thread.model"
import { populate } from "dotenv"
import { FilterQuery, SortOrder } from "mongoose"
interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path }: Params
): Promise<void> {
    await connectToMDB()

    try {

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            { upsert: true }
        )
        if (path === '/profile/edit') {
            revalidatePath(path)
        }
    }
    catch (error: any) {
        throw new Error("something went wrong in user actions file")
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToMDB()
        return await User
            .findOne({ id: userId })
        // .populate({
        //     path : 'communities',
        //     model : community
        // })
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`)
    }
}


export async function fetchUserPosts(userId: string) {
    try {
        connectToMDB()
        const posts = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            })
        return posts
    } catch (error: any) {
        throw new Error(`Failed to fetch user's posts: ${error.message}`)
    }
}


export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder
}) {
    try {
        connectToMDB()
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i")
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }
        const sortOptions = { createdAt: sortBy }
        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
        const totalUsersCount = await User.countDocuments(query)
        const users = await userQuery.exec()
        const isNext = totalUsersCount > skipAmount + users.length
        return { users, isNext }
    } catch (error: any) {
        throw new Error(`Failed to fetch Users List ${error.message}`)
    }
}

export async function getNotifications(userId: string) {
    try {
        connectToMDB()
        const userThreads = await Thread.find({ author: userId })
        const childThreadsIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        },[])
        const replies = Thread.find({
            _id: { $in: childThreadsIds },
            author: { $ne: userId }
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })
        return replies

    } catch (error: any) {
        throw new Error(`Failed to fetch notification actions ${error.message}`)
    }
}
import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"

interface Props {
    currentUserId: string
    accountId: string
    accountType: string
}
const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType }: Props) => {
    let results = await fetchUserPosts(accountId)
    if (!results) redirect('/')
    return (
        <section className="flex flex-col gap-10 mt-9">
            {results.threads.map((thread: any) => (
                <ThreadCard
                    key={JSON.stringify(thread._id)}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === 'User'
                            ? { name: results.name, image: results.image, id: results.id }
                            : { name: thread.author.name, image: thread.author.image, id: thread.author.id }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))

            }
        </section>
    )
}

export default ThreadsTab

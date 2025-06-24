import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const user = await currentUser()
  const result = await fetchPosts(1,30)
  console.log(result);

  return (
    <>
      <h1 className="text-left head-text">Home</h1>
      <section className="flex flex-col gap-10 mt-9">
        {
          result.posts.length === 0 ? (
            <p className="no-result">No post found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )
        }
      </section>
    </>
  )
} 
import { fetchUser, getNotifications } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser()
    if (!user) return null;
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')
    // get notification
    const activity = await getNotifications(userInfo._id)
    return (
        <section>
            <h1 className="mb-10 head-text">Activity</h1>
            <section className="flex flex-col gap-5 mt-10">
                {activity.length > 0 ?
                    <>
                        {activity.map((activity) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image
                                          src={activity.author.image}
                                          alt="Profile Image"
                                          width={30}
                                          height={30}
                                          className="object-cover rounded-full w-6 h-6 md:w-[30px] md:h-[30px]"
                                    />

                                    <p className="!text-base-regular text-light-2">
                                        <span className="mr-2 text-primary-500">
                                            {activity.author.name}
                                        </span>
                                        replied to your post
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                    : <>
                        <p className="!text-base-regular text-light-2">No activity yet</p>
                    </>
                    }
            </section>
        </section>
    )
}
export default Page

import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser()
    if (!user) return null;
    const userInfo = await fetchUser(params.id)
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain" />
                                    <p className="max-sm:hidden">{tab.label}</p>
                                    {tab.label === "Threads" && (
                                        <p className="px-2 py-1 ml-1 rounded-md bg-primary-500 !text-tiny-medium text-white">
                                            {userInfo?.threads?.length}
                                        </p>
                                    )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab)=>(
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId = {user.id}
                            accountId = {userInfo.id}
                            accountType = "User" 
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
export default Page;



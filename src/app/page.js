import CoreInfrastructure from "@/components/home/CoreInfrastructure";
import EliteTrainers from "@/components/home/EliteTrainers";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import HeroBanner from "@/components/home/HeroBanner";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import { getFeaturedClasses, getForumPosts } from "@/lib/actions/homeActions";

export default async function HomePage() {
  const featuredClasses = await getFeaturedClasses() || []
  const latestForumPosts = await getForumPosts() || []
  // console.log(latestForumPosts);



  return (
    <div>
      <HeroBanner />
      <FeaturedClasses featuredClasses={featuredClasses} />
      <EliteTrainers />
      <LatestForumPosts latestForumPosts={latestForumPosts} />
      <CoreInfrastructure />
    </div>
  );
}

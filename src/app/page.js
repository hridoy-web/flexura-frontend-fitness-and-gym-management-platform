import CoreInfrastructure from "@/components/home/CoreInfrastructure";
import EliteTrainers from "@/components/home/EliteTrainers";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import HeroBanner from "@/components/home/HeroBanner";
import LatestForumPosts from "@/components/home/LatestForumPosts";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <FeaturedClasses />
      <EliteTrainers />
      <LatestForumPosts />
      <CoreInfrastructure/>
    </div>
  );
}

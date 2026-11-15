import HeroSlider from "@/components/homepage/Hero";
import HowBorrowWorks from "@/components/homepage/HowBorrowWorks";
import NewArrival from "@/components/homepage/NewArrival";
import TopCategories from "@/components/homepage/TopCategories";

export default function Page() {
  return (
    <div>
      <HeroSlider />
      <NewArrival />
      <HowBorrowWorks />
      <TopCategories />
    </div>
  );
}

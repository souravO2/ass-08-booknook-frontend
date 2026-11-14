import HeroSlider from "@/components/homepage/Hero";
import HowBorrowWorks from "@/components/homepage/HowBorrowWorks";
import NewArrival from "@/components/homepage/NewArrival";

export default function Page() {
  return (
    <div>
      <HeroSlider />
      <NewArrival/>
      <HowBorrowWorks />
    </div>
  );
}

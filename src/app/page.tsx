import type { NextPage } from "next";
import FeaturesSection from "~/components/hero/FeaturesSection";
import HeroWrapper from "~/components/hero/HeroWrapper";

const Homepage: NextPage = () => {
	return (
		<>
			<HeroWrapper />
			<FeaturesSection />
		</>
	);
};

export default Homepage;

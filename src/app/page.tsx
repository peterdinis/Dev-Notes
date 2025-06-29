import type { NextPage } from "next";
import FeaturesSection from "~/components/hero/FeaturesSection";
import HeroWrapper from "~/components/hero/HeroWrapper";
import Footer from "~/components/shared/Footer";

const Homepage: NextPage = () => {
	return (
		<>
			<HeroWrapper />
			<FeaturesSection />
			<Footer />
		</>
	);
};

export default Homepage;

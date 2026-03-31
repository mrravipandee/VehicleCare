import FeaturesSection from "@/components/Features"
import Hero from "@/components/Hero"
import ProblemSection from "@/components/Problems"
import UseCasesSection from "@/components/UseCases"
import CtaSection from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Marketing() {
    return (
        <div>

            {/* Hero Section */}
            <Hero />

            {/* Problems Section */}
            <ProblemSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Use Cases Section */}
            <UseCasesSection />

            {/* CTA Section */}
            <CtaSection />

            {/* Footer */}
            <Footer />
        </div>
    )
}
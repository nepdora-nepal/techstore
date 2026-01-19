import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | SastoBazaar',
    description: 'Terms of Service for SastoBazaar',
};

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Permission is granted to temporarily download one copy of the materials (information or software) on SastoBazaar&apos;s website for personal, non-commercial transitory viewing only.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The materials on SastoBazaar&apos;s website are provided on an as is basis. SastoBazaar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In no event shall SastoBazaar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SastoBazaar&apos;s website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>

                <div className="pt-8 border-t">
                    <p className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}

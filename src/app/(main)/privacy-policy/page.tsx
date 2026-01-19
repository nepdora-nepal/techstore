import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | SastoBazaar',
    description: 'Privacy Policy for SastoBazaar',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account, make a purchase, attempt to contact us, or otherwise communicate with us. This information may include your name, email address, phone number, shipping address, and payment information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you related information, including confirmations and invoices, and provide customer support.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not share your personal information with third parties except as described in this policy. We may share your information with third-party service providers who need access to such information to perform work on our behalf.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Changes to this Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
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

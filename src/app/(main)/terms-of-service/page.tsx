"use client";

import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-navy-900 mb-8">Terms of Service</h1>
                <p className="text-gray-500 mb-12">Last Updated: March 15, 2024</p>

                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Use of Service</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You agree to use this site only for lawful purposes. You are prohibited from posting on or transmitting through this site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Pricing and Products</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We reserve the right to change pricing at any time without notice. We reserve the right to limit the quantity of items purchased per person, per household or per order. We attempt to be as accurate as possible; however, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            In no event will we be liable for any damages including, without limitation, indirect or consequential damages, or any damages whatsoever arising from use or loss of use, data, or profits, whether in action of contract, negligence or other tortious action, arising out of or in connection with the use of the site.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;

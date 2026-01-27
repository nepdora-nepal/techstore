"use client";

import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-navy-900 mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last Updated: March 15, 2024</p>

                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We collect information that you provide directly to us. For example, we collect information when you create an account, subscribe to our newsletter, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, credit card information and other contact or identifying information you choose to provide.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use the information we collect to provide, maintain, and improve our services, such as to administer your account, process your orders, and provide you with customer service. We may also use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Send you technical notices, updates, security alerts and support and administrative messages.</li>
                            <li>Respond to your comments, questions and requests.</li>
                            <li>Communicate with you about products, services, offers, promotions, and events.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Sharing of Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We do not share your personal information with third parties without your consent, except in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>With vendors, consultants and other service providers who need access to such information to carry out work on our behalf.</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Security</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;

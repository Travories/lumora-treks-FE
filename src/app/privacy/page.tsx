import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath("/privacy");

  return {
    title: page?.seo?.title || page?.title || "Privacy Policy | Lumora Treks",
    description:
      page?.seo?.description ||
      "Learn how Lumora Treks collects, uses, and protects your personal information.",
    ...(page?.seo?.canonical_url
      ? { alternates: { canonical: page.seo.canonical_url } }
      : {}),
    ...(page?.seo?.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

const sections = [
  {
    title: "Information we collect",
    body: [
      "We collect the information you provide when you submit an enquiry, request a custom itinerary, make a booking, or contact our team. This may include your name, email address, phone number, travel dates, group size, nationality, and any details you choose to share about your trip.",
      "We may also collect limited technical data such as browser type, device information, and pages visited to help us improve the website experience.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "We use your information to respond to enquiries, prepare trip proposals, process bookings, provide customer support, and send essential travel updates related to your request or reservation.",
      "We may also use aggregated or non-identifying data to understand demand, improve our services, and maintain website performance.",
    ],
  },
  {
    title: "Sharing of information",
    body: [
      "We do not sell your personal information. We may share relevant details with trusted service providers only when necessary to operate your trip, such as guides, transport partners, accommodation providers, or payment processors.",
      "We may also disclose information when required by law or when reasonably necessary to protect our rights, travellers, or operations.",
    ],
  },
  {
    title: "Data security and retention",
    body: [
      "We take reasonable administrative and technical steps to protect your information from unauthorized access, misuse, or disclosure. No internet transmission or storage system is completely secure, so we cannot guarantee absolute security.",
      "We retain personal information only for as long as needed to manage your enquiry, booking, legal obligations, and internal business records.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may request access to, correction of, or deletion of the personal information you have shared with us, subject to any legal or operational requirements that require us to keep certain records.",
      "If you have questions about this policy or how your data is handled, please contact us through the contact page before sharing sensitive information.",
    ],
  },
];

export default async function PrivacyPage() {
  const page = await getPageByPath("/privacy");

  return (
    <>
      <main className="flex-1">
        <Navbar />
        {page?.body && page.body.length > 0 ? (
          <BlockRenderer blocks={page.body} />
        ) : (
          <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 lg:px-10 lg:py-20">
            <div className="rounded-[32px] border border-border bg-surface p-8 shadow-sm lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-active">
                Legal
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-foreground lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-5 max-w-3xl font-body-alt text-lg leading-8 tracking-[-0.03em] text-text-secondary">
                This policy explains how Lumora Treks collects, uses, and protects
                the information you share when you browse this website or contact
                our team about travel services.
              </p>
            </div>

            <div className="grid gap-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[28px] border border-border bg-surface p-8 shadow-sm lg:p-10"
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-4 grid gap-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-body-alt text-lg leading-8 tracking-[-0.03em] text-text-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

import ExampleResponse from "./Section/ExampleResponse";
import InstallationSection from "./Section/Installation";
import IntroductionSection from "./Section/Introduction";
import LyricsSection from "./Section/Lyrics";
import MetadataSection from "./Section/Metadata";
import RateLimitSection from "./Section/RateLimit";
import ResponseCodeSection from "./Section/ResponseCode";

export const DOCS_STRUCTURE = [
    {
        category: "Getting Started",
        items: [
            {
                title: "Introduction",
                slug: "get-started",
                content: (
                    <IntroductionSection />
                ),
            },
            {
                title: "Installation",
                slug: "installation",
                content: (
                    <InstallationSection />
                ),
            },
        ],
    },
    {
        category: "API Reference",
        items: [
            {
                title: "Lyrics",
                slug: "lyrics",
                content: (
                    <LyricsSection />
                ),
            },
            {
                title: "Metadata",
                slug: "metadata",
                content: (
                    <MetadataSection />
                ),
            },
        ],
    },
    {
        category: "Limits & Responses",
        items: [
            {
                title: "Rate Limits",
                slug: "rate-limits",
                content: (
                    <RateLimitSection />
                ),
            },
            {
                title: "Example Responses",
                slug: "example-responses",
                content: (
                    <ExampleResponse />
                ),
            },
            {
                title: "Response Codes",
                slug: "response-codes",
                content: (
                    <ResponseCodeSection />
                ),
            },
        ],
    },
];

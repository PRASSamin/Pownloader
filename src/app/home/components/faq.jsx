import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const FAQList = [
        {
            question: "How do I download a video?",
            answer: "To download a video, first select the desired platform from the toolbox (e.g. Instagram). Then, paste the video link into the input field and click the <strong>Download</strong> button.",
            value: "item-1",
        },
        {
            question: "Which platforms are supported?",
            answer: "We currently support downloading from <strong>Instagram</strong>, <strong>Facebook</strong>, and <strong>TikTok</strong>.",
            value: "item-2",
        },
        {
            question: "Is this service free to use?",
            answer: "Yes, our service is completely free to use with no hidden charges.",
            value: "item-3",
        },
        {
            question: "How can I report a bug?",
            answer: "If you encounter a bug, you can report it by creating an issue on our <strong>GitHub</strong> repository.",
            value: "item-4",
        },
    ];


    return (
        <section
            id="faq"
            className="container px-2 md:px-0 mx-auto py-5"
        >
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                        Questions
                    </span>
                </h2>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {FAQList.map(({ question, answer, value }) => (
                        <AccordionItem
                            key={value}
                            value={value}
                        >
                            <AccordionTrigger className="text-left">
                                {question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p dangerouslySetInnerHTML={{ __html: answer }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ

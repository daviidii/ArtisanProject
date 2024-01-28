export default function Questions() {
  const data = [
    {
      id: "question1",
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including major credit cards, debit cards, and, in some regions, alternative payment options. You can find the full list during the checkout process.",
    },
    {
      id: "question2",
      question: "Where do your products come from?",
      answer:
        "Our products are sourced from skilled artisans and craft communities worldwide. We take pride in curating a collection that reflects diverse cultures and exceptional craftsmanship.",
    },
    {
      id: "question3",
      question: "How do I care for my handcrafted items?",
      answer:
        "Care instructions are provided for each product on its respective product page. We recommend following these guidelines to ensure the longevity and beauty of your handcrafted items.",
    },
    {
      id: "question4",
      question: "Are your products environmentally friendly?",
      answer:
        "We prioritize sustainability and environmentally conscious practices. Many of our artisans use eco-friendly materials, and we are committed to reducing our ecological footprint throughout our supply chain.",
    },
    {
      id: "question5",
      question: "Are your products customizable?",
      answer:
        "While most of our products are curated as-is, we may offer customization options for certain items. Please check the product description or contact our customer support for more information on customization possibilities.",
    },
    {
      id: "question6",
      question: " Can I return or exchange an item?",
      answer:
        "Yes, we have a hassle-free return and exchange policy. Please visit our 'Returns & Exchanges' page for detailed information on the process, eligibility, and any associated conditions.",
    },
    {
      id: "question7",
      question: "How can I track my order?",
      answer:
        "Once your order is dispatched, you'll receive a confirmation email with a tracking number and instructions on how to track your package. You can also log in to your Artisan account to view order status and tracking information.",
    },
  ];
  return (
    <section className="faq">
      <h2 className="faq__title">Frequently Asked Questions</h2>
      <div className="accordion faq__accordion" id="faq-accordion">
        {data.map((questions) => {
          const qid = `#${questions.id}`;
          return (
            <div key={questions.id} className="accordion-item faq__item">
              <h2 className="accordion-header faq__header">
                <button
                  className="accordion-button faq__button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={qid}
                  aria-expanded="false"
                  aria-controls={questions.id}
                >
                  {questions.question}
                </button>
              </h2>
              <div
                id={questions.id}
                className="accordion-collapse collapse"
                data-bs-parent="#faq-accordion"
              >
                <div className="accordion-body faq__body">
                  <p className="faq__answer">{questions.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

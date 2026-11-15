const steps = [
  {
    id: 1,
    title: "Find a book",
    text: "Browse every title on the shelf and open the one you like.",
  },
  {
    id: 2,
    title: "Borrow it",
    text: "Confirm in one step and keep it for a few days.",
  },
  {
    id: 3,
    title: "Return it",
    text: "Press Return Book in My Borrows and it goes back on the shelf.",
  },
];

const HowBorrowWorks = () => {
  return (
    <section className="mx-auto max-w-7xl my-2 px-4 py-4 md:px-8">
      <div className="rounded-[28px] bg-sand p-8 md:p-14">
        <h2 className="font-heading text-3xl leading-tight font-bold text-ink md:text-[40px]">
          How Borrowing Works
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id}>
              <div className="flex size-12 items-center justify-center rounded-full bg-forest font-heading text-2xl font-bold text-white">
                {step.id}
              </div>
              <h3 className="mt-4 mb-2 font-heading text-2xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="leading-relaxed text-ink/80">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowWorks;

export function LearningProcess() {
  const steps = [
    {
      number: 1,
      title: "Assess Your Level",
      description: "Take our skill assessment to determine your current level and learning goals."
    },
    {
      number: 2,
      title: "Choose Resources",
      description: "Browse our curated collection of resources tailored to your skill level."
    },
    {
      number: 3,
      title: "Learn & Practice",
      description: "Engage with interactive content and hands-on projects to reinforce learning."
    },
    {
      number: 4,
      title: "Track Progress",
      description: "Monitor your advancement and unlock new skill levels as you grow."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our Learning Process Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to accelerate your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

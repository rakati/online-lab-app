import React from 'react';

const labs = [
  {
    title: 'Kubernetes and OpenShift',
    description: 'Deploy and manage containerized applications.',
    image: require('../assets/containers-kubernets.png'),
  },
  {
    title: 'Data Analysis with Python',
    description: 'Analyze data using Python libraries like Pandas and NumPy.',
    image: require('../assets/data-analysis-with-python.png'),
  },
  {
    title: 'Data Science 101',
    description: 'An introduction to data science fundamentals.',
    image: require('../assets/data-science-101.png'),
  },
  {
    title: 'Introduction to Machine Learning',
    description: 'Learn the basics of machine learning algorithms.',
    image: require('../assets/introduction-to-machine-learning.png'),
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 text-gray-300 p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Online Lab Application</h1>
      <p className="text-lg text-gray-400 text-center mb-6">
        Explore interactive programming labs and tutorials to improve your skills.
      </p>

    {/* Lab Preview Section */}
      <img
        src={require("../classroom_preview.png")}
        alt="Lab Preview"
        className="w-full max-w-3xl h-auto rounded shadow-md mb-6"
      />

      {/* Easy Labs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {labs.map((lab, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 cursor-pointer"
          >
          <img
            src={lab.image}
            alt={lab.title}
            className="w-full h-32 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{lab.title}</h2>
            <p className="text-gray-400">{lab.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

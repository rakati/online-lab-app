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
    <div className="container mx-auto max-w-6xl px-4">
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen px-8 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Online Lab Application</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Explore interactive programming labs and tutorials to improve your skills.
      </p>

    {/* Lab Preview Section */}
      <img
        src={require("../classroom_preview.png")}
        alt="Lab Preview"
        className="w-full max-w-4xl h-auto object-cover rounded shadow-md mb-6 mx-auto"
      />

      {/* Easy Labs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {labs.map((lab, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg cursor-pointer"
          >
            <img
              src={lab.image}
              alt={lab.title}
              className="w-full h-32 object-cover rounded mb-4 border border-gray-300 dark:border-gray-700"
            />
            <h2 className="text-xl font-bold mb-2">{lab.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{lab.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Time: 2 hours</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Skills: Python, Data Analysis</p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Python</span>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Data</span>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
  );
};

export default LandingPage;

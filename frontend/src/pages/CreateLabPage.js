// src/pages/CreateLabPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Showdown from 'showdown';
import { createLab } from '../services/labApi';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const converter = new Showdown.Converter({
  tables: true,
  ghCompatibleHeaderId: true,
});

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

function CreateLabPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [packages, setPackages] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // New fields
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(''); // for comma parsing or a simple approach
  const [difficulty, setDifficulty] = useState('Beginner');
  const [status, setStatus] = useState('DRAFT');

  const availablePackages = ['python', 'nodejs', 'java', 'tensorflow', 'pytorch'];

  // If using a global theme from Redux or context, you can read it here
  // const { theme } = useAuth() or from useSelector(...)
  // Then apply to the editor. For instance, you might have a dark CSS override.

  useEffect(() => {
    const savedData = localStorage.getItem('labDraftData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || '');
      setDescription(parsed.description || '');
      setInstructions(parsed.instructions || '');
      setPackages(parsed.packages || []);
      setTags(parsed.tags || []);
      setDifficulty(parsed.difficulty || 'Beginner');
    }
  }, []);

  useEffect(() => {
    const draftData = {
      title,
      description,
      instructions,
      packages,
      tags,
      difficulty,
    };
    localStorage.setItem('labDraftData', JSON.stringify(draftData));
  }, [title, description, instructions, packages, tags, difficulty]);

  // handle packages
  const handleChangePackages = (e) => {
    const { value, checked } = e.target;
    setPackages((prev) =>
      checked ? [...prev, value] : prev.filter((pkg) => pkg !== value)
    );
  };

  // handle markdown
  const handleEditorChange = ({ text }) => {
    setInstructions(text);
  };

  // handle tags
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTag = tagInput.trim();
    if (!tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
    setTagInput('');
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // handle submit
  const handleSubmit = async (publish = false) => {
    const finalStatus = publish ? 'PUBLISHED' : 'DRAFT';
    setStatus(finalStatus);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('status', finalStatus);
    formData.append('packages', JSON.stringify(packages));
    formData.append('tags', JSON.stringify(tags));
    formData.append('difficulty', difficulty);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await createLab(formData);
      localStorage.removeItem('labDraftData');
      navigate('/labs');
    } catch (err) {
      console.error(err);
      setError('Failed to create the lab. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 min-h-screen">
        <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
          Create New Lab
        </h1>

        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 dark:border-gray-700 rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Lab Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            className="border border-gray-300 dark:border-gray-700 rounded w-full p-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Packages */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Packages
          </label>
          <div className="flex gap-4 flex-wrap text-gray-700 dark:text-gray-200">
            {availablePackages.map((pkg) => (
              <label key={pkg} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  value={pkg}
                  checked={packages.includes(pkg)}
                  onChange={handleChangePackages}
                />
                <span className="capitalize">{pkg}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Tags
          </label>
          <div className="flex gap-2 items-center">
            <input
              className="border border-gray-300 dark:border-gray-700 rounded p-2"
              type="text"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-gray-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Difficulty
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded p-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficultyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-200 mb-1">
            Instructions (Markdown)
          </label>
          <MdEditor
            value={instructions}
            renderHTML={(text) => converter.makeHtml(text)}
            onChange={handleEditorChange}
            style={{ height: '300px' }}
            config={{
              view: { menu: true, md: true, html: true },
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSubmit(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLabPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Showdown from 'showdown';
import { createLab, updateLab } from '../services/labApi';

const converter = new Showdown.Converter({
  tables: true,
  ghCompatibleHeaderId: true,
});

const availablePackages = ['python', 'nodejs', 'java', 'tensorflow', 'pytorch'];
const languageOptions = [
  { code: 'eng', label: 'English' },
  { code: 'fr', label: 'French'},
  { code: 'ar', label: 'Arabic'},
];

function CreateLabPage({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();

  // State
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [packages, setPackages] = useState(initialData?.packages || []);
  const [time, setTime] = useState(initialData?.time || '');
  const [language, setLanguage] = useState(initialData?.language || 'eng');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('labDraftData');
    if (!initialData && savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || '');
      setDescription(parsed.description || '');
      setInstructions(parsed.instructions || '');
      setPackages(parsed.packages || []);
      setTime(parsed.time || '');
      setLanguage(parsed.language || 'eng');
      setTags(parsed.tags || []);
    }
  }, []);

  useEffect(() => {
    const draftData = {
      title,
      description,
      instructions,
      packages,
      time,
      language,
      tags,
    };
    localStorage.setItem('labDraftData', JSON.stringify(draftData));
  }, [title, description, instructions, packages, tags, time, language]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (publish = false) => {
    const finalStatus = publish ? 'PUBLISHED' : 'DRAFT';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('status', finalStatus);
    formData.append('packages', JSON.stringify(packages));
    formData.append('tags', JSON.stringify(tags));
    formData.append('time', time);
    formData.append('language', language);

    try {
      if (isEdit) {
        await updateLab(initialData.id, formData);
      } else {
        await createLab(formData);
      }
      localStorage.removeItem('labDraftData');
      navigate('/labs');
    } catch (err) {
      console.error(err);
      setError('Failed to create the lab. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold">{isEdit ? 'Edit Lab' : 'Create New Lab'}</h1>

        {error && <div className="bg-red-200 text-red-800 px-4 py-2 rounded">{error}</div>}

        {/* Title */}
        <label className="block font-semibold">Title</label>
        <input className="border dark:bg-gray-800 rounded w-full p-2" placeholder="Lab Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* Description (6-7 lines) */}
        <label className="block font-semibold">Description</label>
        <textarea className="border dark:bg-gray-800 rounded w-full p-2" placeholder="Lab Description" rows="6" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* Language & Time */}
        <div className="flex justify-between gap-4">
          <div>
            <label className="block font-semibold">Language</label>
            <div className="flex gap-2">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  className={`flex items-center gap-2 px-4 py-2 border rounded ${language === lang.code ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.icon} {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Time (min)</label>
            <input className="border dark:bg-gray-800 rounded w-20 p-2 text-center" type="number" min="1" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        {/* Tags */}
        <label className="block font-semibold">Tags</label>
        <div className="flex gap-2">
          <input className="border dark:bg-gray-800 rounded p-2" type="text" placeholder="Add a tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
          <button onClick={handleAddTag} className="bg-gray-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <div className="flex gap-2 mt-2">{tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{tag}</span>
        ))}</div>

        {/* Packages */}
        <label className="block font-semibold">Packages</label>
        <div className="flex flex-wrap gap-4">
          {availablePackages.map((pkg) => (
            <label key={pkg} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={pkg} checked={packages.includes(pkg)} onChange={(e) => setPackages(e.target.checked ? [...packages, pkg] : packages.filter((p) => p !== pkg))} />
              <span>{pkg}</span>
            </label>
          ))}
        </div>

        {/* Instructions */}
        <label className="block font-semibold">Instructions</label>
        <MdEditor value={instructions} renderHTML={(text) => converter.makeHtml(text)} onChange={({ text }) => setInstructions(text)} style={{ height: '300px' }} />

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={() => handleSubmit(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Save as Draft</button>
          <button onClick={() => handleSubmit(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Publish</button>
        </div>
      </div>
    </div>
  );
}

export default CreateLabPage;

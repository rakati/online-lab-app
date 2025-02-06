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
  { code: 'fr', label: 'French' },
  { code: 'ar', label: 'Arabic' },
];
const difficultyOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

function CreateLabPage({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();

  // State
  const [title, setTitle] = useState(initialData?.title || '');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState(initialData?.description || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [packages, setPackages] = useState(initialData?.packages || []);
  const [time, setTime] = useState(initialData?.time || '');
  const [language, setLanguage] = useState(initialData?.language || 'eng');
  const [skills, setSkills] = useState(initialData?.skills || []);
  const [tags, setTags] = useState(initialData?.tags || []);
  const [error, setError] = useState('');

  // Temp inputs for adding tags & skills
  const [tagInput, setTagInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'Beginner');

  useEffect(() => {
    if (!initialData) {
      const savedData = localStorage.getItem('labDraftData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setTitle(parsed.title || '');
        setDescription(parsed.description || '');
        setInstructions(parsed.instructions || '');
        setPackages(parsed.packages || []);
        setTime(parsed.time || '');
        setLanguage(parsed.language || 'eng');
        setSkills(parsed.skills || []);
        setTags(parsed.tags || []);
        setDifficulty(parsed.difficulty || 'beginner');
      }
    }
  }, [initialData]);

  useEffect(() => {
    const draftData = {
      title,
      description,
      instructions,
      packages,
      time,
      language,
      skills,
      tags,
      difficulty,
    };
    localStorage.setItem('labDraftData', JSON.stringify(draftData));
  }, [title, description, instructions, packages, time, language, skills, tags, difficulty]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (publish = false) => {
    const finalStatus = publish ? 'PUBLISHED' : 'DRAFT';

    if (!time || isNaN(time) || parseInt(time, 10) <= 0) {
      setError('Time must be a positive integer.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('status', finalStatus);
    formData.append('packages', JSON.stringify(packages));
    formData.append('skills', JSON.stringify(skills));
    formData.append('tags', JSON.stringify(tags));
    formData.append('time', time);
    formData.append('language', language);
    formData.append('difficulty', difficulty);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEdit && initialData?.id) {
        await updateLab(initialData.id, formData);
      } else {
        await createLab(formData);
      }
      localStorage.removeItem('labDraftData');
      navigate('/labs');
    } catch (err) {
      console.error(err);
      setError('Failed to create/update the lab. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold">{isEdit ? 'Edit Lab' : 'Create New Lab'}</h1>

        {error && <div className="bg-red-200 text-red-800 px-4 py-2 rounded">{error}</div>}

        {/* Title */}
        <label className="block font-semibold">Title</label>
        <input
          className="border dark:bg-gray-800 rounded w-full p-2"
          placeholder="Lab Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Image */}
        <div>
          <label className="block font-semibold">Lab Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* Description */}
        <label className="block font-semibold">Description</label>
        <textarea
          className="border dark:bg-gray-800 rounded w-full p-2"
          placeholder="Lab Description"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Language & Time */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block font-semibold">Language</label>
            <div className="flex gap-2 mt-1">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`px-3 py-1 border rounded ${
                    language === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Time (min)</label>
            <input
              className="border dark:bg-gray-800 rounded w-20 p-2 text-center"
              type="number"
              min="1"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold">Difficulty</label>
              <select
              className="border dark:bg-gray-800 rounded p-2"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficultyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
          </div>
        </div>

        {/* Skills */}
        <label className="block font-semibold">Skills</label>
        <div className="flex gap-2">
          <input
            className="border dark:bg-gray-800 rounded p-2"
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button onClick={handleAddSkill} className="bg-gray-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <div className="flex gap-2 mt-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-2">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-red-600 font-bold">x</button>
            </span>
          ))}
        </div>

        {/* Packages */}
        <label className="block font-semibold">Packages</label>
        <div className="flex flex-wrap gap-4">
          {availablePackages.map((pkg) => (
            <label key={pkg} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={pkg}
                checked={packages.includes(pkg)}
                onChange={(e) =>
                  setPackages(e.target.checked
                    ? [...packages, pkg]
                    : packages.filter((p) => p !== pkg))
                }
              />
              <span>{pkg}</span>
            </label>
          ))}
        </div>

        {/* Tags */}
        <label className="block font-semibold">Tags</label>
        <div className="flex gap-2">
          <input
            className="border dark:bg-gray-800 rounded p-2"
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button onClick={handleAddTag} className="bg-gray-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <div className="flex gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center gap-2">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-600 font-bold">x</button>
            </span>
          ))}
        </div>

        {/* Instructions */}
        <label className="block font-semibold">Instructions (Markdown)</label>
        <MdEditor
          value={instructions}
          renderHTML={(text) => converter.makeHtml(text)}
          onChange={({ text }) => setInstructions(text)}
          style={{ height: '300px' }}
        />

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

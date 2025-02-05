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

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const availablePackages = ['python', 'nodejs', 'java', 'tensorflow', 'pytorch'];
const languageOptions = ['eng', 'fr', 'ar'];

function CreateLabPage({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();

  // State initialization fixed
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [packages, setPackages] = useState(initialData?.packages || []);
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [imageFile, setImageFile] = useState(null);
  const [time, setTime] = useState(initialData?.time || '');
  const [language, setLanguage] = useState(initialData?.language || 'eng');
  const [skills, setSkills] = useState(initialData?.skills || []);
  const [tags, setTags] = useState(initialData?.tags || []);
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'Beginner');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('labDraftData');
    if (!initialData && savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || '');
      setDescription(parsed.description || '');
      setTime(parsed.time || '');
      setLanguage(parsed.language || '');
      setInstructions(parsed.instructions || '');
      setSkills(parsed.skills || []);
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
      skills,
      time,
      language,
      tags,
      difficulty,
    };
    localStorage.setItem('labDraftData', JSON.stringify(draftData));
  }, [title, description, instructions, packages, tags, difficulty]);

  const handleChangePackages = (e) => {
    const { value, checked } = e.target;
    setPackages((prev) =>
      checked ? [...prev, value] : prev.filter((pkg) => pkg !== value)
    );
  };

  const handleEditorChange = ({ text }) => {
    setInstructions(text);
  };

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

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const newSkill = skillInput.trim();
    if (!skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
    }
    setSkillInput('');
  };

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
    formData.append('time', time);
    formData.append('language', language);
    formData.append('skills', JSON.stringify(skills));

    if (imageFile) {
      formData.append('image', imageFile);
    }

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
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold">{isEdit ? 'Edit Lab' : 'Create New Lab'}</h1>

        {error && <div className="bg-red-200 text-red-800 px-4 py-2 rounded">{error}</div>}

        {/* Title */}
        <input className="border dark:bg-gray-800 rounded w-full p-2" placeholder="Lab Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* Language Selection */}
        <select className="border dark:bg-gray-800 rounded w-full p-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Time Required */}
        <input className="border dark:bg-gray-800 rounded w-full p-2" type="number" placeholder="Estimated Time (in minutes)" value={time} onChange={(e) => setTime(e.target.value)} />

        {/* Skills */}
        <div className="flex gap-2">
          <input className="border dark:bg-gray-800 rounded p-2" type="text" placeholder="Add a skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
          <button onClick={handleAddSkill} className="bg-gray-600 text-white px-3 py-1 rounded">Add</button>
        </div>

        {/* Difficulty */}
        <select className="border dark:bg-gray-800 rounded w-full p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficultyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        {/* Instructions */}
        <MdEditor value={instructions} renderHTML={(text) => converter.makeHtml(text)} onChange={handleEditorChange} style={{ height: '300px' }} />

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

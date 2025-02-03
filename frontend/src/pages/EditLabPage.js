import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import CreateLabPage from './CreateLabPage';
import { fetchLabById } from '../services/labApi';

function EditLabPage() {
  const { id } = useParams();
  const [labData, setLabData] = useState(null);

  useEffect(() => {
    fetchLabById(id).then(data => setLabData(data));
  }, [id]);


  if (!labData) return <p>Loading...</p>;

  return (
    <CreateLabPage initialData={labData} isEdit />
  );
}

export default EditLabPage;

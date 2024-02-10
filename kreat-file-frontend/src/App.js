import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    // Pobierz listę plików po załadowaniu strony
    axios.get('https://kreat.online:5000/files')
      .then(response => {
        setFilesList(response.data.files);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('https://kreat.online:5000/upload', formData)
      .then(response => {
        console.log(response.data);
        // Po udanym przesłaniu pliku, odśwież listę plików
        axios.get('https://kreat.online:5000/files')
          .then(response => {
            setFilesList(response.data.files);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDownload = (filename) => {
    window.location.href = `https://kreat.online:5000/download/${filename}`;
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='hidden md:block md:text-7xl mt-10 mb-20 font-semibold'>Kreat File Sharing</h1>

      <div className=' m-5'>
        <input type="file" className='file-input file-input-bordered file-input-secondary w-full' onChange={handleFileChange} />
        <button className='btn w-full mt-3' onClick={handleUpload}>Prześlij Plik</button>
      </div>

      <ul className="menu bg-base-200 w-56 rounded-box m-10">

        <h2 className="menu-title pb-5">Dostępne pliki:</h2>
        {filesList.map((filename, index) => (
          <li key={index}>
            <button className='btn' onClick={() => handleDownload(filename)}>{filename}</button>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default App;

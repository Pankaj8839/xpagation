import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import StyledTable from './StyledTable';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [completeData, setCompleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(() => {
    if (completeData.length > 0) {
      setData(completeData.slice(firstIndex, lastIndex));
      if(isLoading){
        setIsLoading(false);
      }
     
    }
  }, [currentPage,completeData]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(completeData.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setCompleteData(data);
   
       
      } catch (error) {
        alert(error);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StyledTable data={data} />
      )}
      <div className="pagination">
      <button onClick={handlePrevious}>Previous</button>
      <div>
      <p>{currentPage}</p>
      </div>
   
      <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;


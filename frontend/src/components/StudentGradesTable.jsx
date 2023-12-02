import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const token = localStorage.getItem('token');

const StudentGradesTable = ({ studentId }) => {
  const [gradesData, setGradesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/subjects-grades/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setGradesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div>
      <h2>Student Grades</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>DS1</th>
            <th>Exam</th>
            <th>TP</th>
          </tr>
        </thead>
        <tbody>
          {gradesData.map((subjectData, index) => (
            <tr key={index}>
              <td>{subjectData.subject}</td>
              <td>{subjectData.grades.note_ds1}</td>
              <td>{subjectData.grades.note_examen}</td>
              <td>{subjectData.grades.note_tp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentGradesTable;

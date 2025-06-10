import React from "react";

const TrainingCourses = () => {
  const courses = [
    { id: 1, title: "React Basics", status: "Completed" },
    { id: 2, title: "Advanced JavaScript", status: "In Progress" },
    { id: 3, title: "CSS Flexbox and Grid", status: "Not Started" },
  ];

  // Helper to get status color class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "in progress":
        return "status-in-progress";
      case "not started":
        return "status-not-started";
      default:
        return "";
    }
  };

  return (
    <section className="portal-section" id="training">
      <h2>Training Courses</h2>
      {courses.length > 0 ? (
        <table className="courses-table">
          <thead>
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td className={getStatusClass(course.status)}>{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No training courses available.</p>
      )}
    </section>
  );
};

export default TrainingCourses;

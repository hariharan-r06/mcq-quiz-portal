import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [student, setStudent] = useState({studentId: "", studentName: ""});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); 

    const Onchange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
        console.log(student);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!student.studentId || !student.studentName) {
            setMessage("Please enter both Student ID and Name.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            console.log("Registering student:", student);
        
          const res = await axios.post("http://localhost:8080/api/student/register", student);

            console.log("Registration response:", res.data);
            setMessage(res.data);
            
            if (res.data === "Student registered successfully.") {
                localStorage.setItem("studentId", student.studentId);
                console.log("Student ID stored in localStorage:", student.studentId);
                setStudent({ studentId: "", studentName: "" });
                setTimeout(() => {
                    navigate("/quiz");
                }, 1000); 
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            if (error.response) {
                setMessage(`Server Error: ${error.response.data}`);
            } else if (error.request) {
                setMessage("No response from server.");
            } else {
                setMessage("Error connecting to server.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Student ID"
                        name="studentId"
                        value={student.studentId}
                        onChange={Onchange}
                        disabled={isLoading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Student Name"
                        name="studentName"
                        value={student.studentName}
                        onChange={Onchange}
                        disabled={isLoading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center text-sm ${
                        message.includes("successfully") ? "text-green-600" : "text-red-500"
                    }`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Register;
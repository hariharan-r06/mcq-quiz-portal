# 📝 MCQ Quiz Portal

The **MCQ Quiz Portal** is a web application designed to allow students to register with their Student ID and take a multiple-choice quiz. It ensures that each student can participate only once and stores their responses and scores securely.

## 🚀 Features

- Student registration with unique Student ID  
- One-time quiz submission per student  
- Multiple-choice questions with score calculation  
- Backend score storage using Spring Boot & MySQL  
- REST API integration with React frontend  

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind css
- **Backend:** Spring Boot (Java)  
- **Database:** MySQL  
- **API:** RESTful Web Services  
- **Tools:** Axios, Git, Postman  

## 📌 How It Works

1. Student registers with ID and Name  
2. Quiz questions are displayed  
3. Student selects answers and submits  
4. System evaluates and displays score  
5. Score is stored based on Student ID  

---

## ⚙️ Configuration

If you're running the project locally, **update your MySQL configuration** in the `application.properties` file:

📍 **Path:** `demo/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

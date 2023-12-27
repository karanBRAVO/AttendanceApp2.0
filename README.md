# Attendance App - Version 2.0

Welcome to version 2.0 of the Attendance App! This updated release brings several new features, improvements, and bug fixes to enhance your experience with managing attendance records.

## Features

### 1. User Authentication

- **Secure Login:** Users can securely log in with their credentials.
- **User Roles:** Differentiate between roles such as `admin`, `organizations`, `teacher`, and `student` for tailored experiences.

### 2. Attendance Management

- **Real-time Tracking:** Easily manage and track attendance in real-time.
- **Flexible Options:** Mark attendance by class, date, or individual student.

### 3. Reporting

- **Attendance Reports:** Generate detailed reports for individual students or entire classes.
- **Export Data:** Export attendance data in various formats for further analysis.

### 4. Notifications

- **Automatic Alerts:** Receive notifications for unmarked attendance or other important events.
- **Customizable Reminders:** Set reminders for upcoming classes or important tasks.

## Installation

To get started with the Attendance App, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/karanBRAVO/AttendanceApp2.0
    ```

2. Install dependencies:

    ```bash
    cd AttendanceApp2.0
    npm install
    ```

3. Configure the environment:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your database and authentication details.

4. Run the application:

    ```bash
    npm start
    ```

Visit [http://localhost:9000](http://localhost:8090) in your browser to access the Attendance App.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Nodemailer

## Contributing

If you'd like to contribute to the development of the Attendance App, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for choosing the Attendance App 2.0! We hope it serves you well. If you encounter any issues or have suggestions for improvements, please feel free to [create an issue](https://github.com/karanBRAVO/AttendanceApp2.0/issues).

Happy attendance tracking!

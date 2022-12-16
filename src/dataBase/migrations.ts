import {connection}  from "./connection";
import LabenuSystem_gang from "./LabenuSystem_gang.json";
import LabenuSystem_student from "./LabenuSystem_student.json"
import LabenuSystem_hobbies from "./LabenuSystem_hobbies.json"
import hobbies_student from "./hobbies_student.json"
import LabenuSystem_teacher from "./LabenuSystem_teacher.json"
import LabenuSystem_specialty from "./LabenuSystem_specialty.json"
import teacher_specialty from "./teacher_specialty.json"


const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};

const createTables = () =>
  connection
    .raw(`


   CREATE TABLE IF NOT EXISTS LabenuSystem_gang(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      modulo VARCHAR(255) NOT NULL DEFAULT 0
    );

   CREATE TABLE IF NOT EXISTS LabenuSystem_student(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      data_nasc DATE NOT NULL,
      gang_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(gang_id) REFERENCES LabenuSystem_gang(id) 
    );
      
   CREATE TABLE IF NOT EXISTS LabenuSystem_hobbies(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
      
  CREATE TABLE IF NOT EXISTS Hobbies_student(
      id VARCHAR(255) PRIMARY KEY,
      student_id VARCHAR(255) NOT NULL,
      hobby_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(student_id) REFERENCES LabenuSystem_student(id),
      FOREIGN KEY(hobby_id ) REFERENCES LabenuSystem_hobbies(id)
    ); 
      
  CREATE TABLE IF NOT EXISTS LabenuSystem_teacher(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      data_nasc DATE NOT NULL,
      gang_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(gang_id) REFERENCES LabenuSystem_gang(id) 
    ); 
       
  CREATE TABLE IF NOT EXISTS LabenuSystem_specialty(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
      
  CREATE TABLE IF NOT EXISTS Teacher_specialty(
      id VARCHAR(255) PRIMARY KEY,
      teacher_id VARCHAR(255) NOT NULL,
      specialty_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(teacher_id) REFERENCES LabenuSystem_teacher(id),
      FOREIGN KEY(specialty_id ) REFERENCES LabenuSystem_specialty(id)
   );
      
      
`
    )
    .then(() => {
      console.log("Tabelas criadas");
    })
    .catch(printError);

const insertGang = () => connection("LabenuSystem_gang")
    .insert(LabenuSystem_gang)
    .then(() => {
      console.log("Truma criadas");
    })
    .catch(printError);

const insertStudents = () => connection("LabenuSystem_student")
  .insert(LabenuSystem_student)
  .then(() => { console.log("Srudents criados") })
  .catch(printError)

const insertHobbies = () => connection("LabenuSystem_hobbies")
 .insert(LabenuSystem_hobbies)
 .then(() => { console.log("Hobbies criados") })
 .catch(printError) 

const insertHobbiesStudent = () => connection("Hobbies_student")
 .insert(hobbies_student)
 .then(() => { console.log("Hobbies Students criados") })
 .catch(printError)

const insertTeacher = () => connection("LabenuSystem_teacher")
 .insert(LabenuSystem_teacher)
 .then(() => { console.log("Teacher criados") })
 .catch(printError)

const insertSpecialty = () => connection("LabenuSystem_specialty")
 .insert(LabenuSystem_specialty)
 .then(() => { console.log("Specialty criados") })
 .catch(printError)

const insertTeacherSpecialty = () => connection("Teacher_specialty")
 .insert(teacher_specialty)
 .then(() => { console.log("Teacher specialty criados") })
 .catch(printError)
  

const closeConnection = () => {
  console.log("Banco criado com sucesso!");  
  connection.destroy();
};

createTables()
  .then(insertGang)
  .then(insertStudents)
  .then(insertHobbies) 
  .then(insertHobbiesStudent) 
  .then(insertTeacher) 
  .then(insertSpecialty) 
  .then(insertTeacherSpecialty) 
  .finally(closeConnection);

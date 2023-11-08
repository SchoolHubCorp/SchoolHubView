import { AllPupilsShortResponse, PupilResponse } from "src/Interfaces/pupils-models";
import { AllTeachersShortResponse, TeacherResponse } from "src/Interfaces/teachers-models";

export const ALL_PUPILS: AllPupilsShortResponse[] = [
    {
      id: 1,
      classroom: '7A',
      name: 'Mark',
      lastname: 'Zajanczkowski',
    },
    {
      id: 2,
      classroom: '8B',
      name: 'Anna',
      lastname: 'Smith',
    },
    {
      id: 3,
      classroom: '6C',
      name: 'Michael',
      lastname: 'Johnson',
    },
    {
      id: 4,
      classroom: '9A',
      name: 'Emily',
      lastname: 'Davis',
    },
    {
      id: 5,
      classroom: '7B',
      name: 'Daniel',
      lastname: 'Brown',
    }
];

export const СURRENT_PUPIL: PupilResponse = {
    privateInfo: {
        id: 1,
        classId: 4,
        classroom: '7A',
        name: 'Mark',
        lastname: "Zajanczkowski",
        email: 'm.zaja@gmail.com',
        phoneNumber: '586958425',
        pesel: '7895862569',
    },
    parentsInfo: [
        {
            name: 'Vova',
            lastname: 'Yakor',
            phoneNumber: '789586698',
        },
        {
            name: 'Vlad',
            lastname: 'Popa',
            phoneNumber: '785963256',
        }
    ]    
}


export const ALL_TEACHERS: AllTeachersShortResponse[] = [
    {
      teacherId: '7',
      name: 'Perła',
      lastname: 'Mocna',
      quantityOfSubjects: 8,
    },
    {
      teacherId: '8',
      name: 'Alex',
      lastname: 'Johnson',
      quantityOfSubjects: 6,
    },
    {
      teacherId: '9',
      name: 'Elena',
      lastname: 'Garcia',
      quantityOfSubjects: 7,
    },
    {
      teacherId: '10',
      name: 'David',
      lastname: 'Lee',
      quantityOfSubjects: 5,
    },
    {
      teacherId: '11',
      name: 'Olivia',
      lastname: 'Smith',
      quantityOfSubjects: 9,
    }
];
  
export const СURRENT_TEACHER: TeacherResponse = {
    privateInfo: {
      id: 7,
      name: 'Perła',
      lastname: "Mocna",
      email: 'p.moc@gmail.com',
      phoneNumber: '586958425',
      pesel: '7895862569',
    },
    subjects: [
      {
        subjectName: 'Geometry',
        subjectGroup: '6A',
      },
      {
        subjectName: 'Algebra',
        subjectGroup: '7B',
      },
      {
        subjectName: 'Physics',
        subjectGroup: '8C',
      },
    ],
  };
  
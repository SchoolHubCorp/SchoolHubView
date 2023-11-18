import { AllPupilsShortResponse, PupilResponse } from "src/Interfaces/pupils-models";
import { AllTeachersShortResponse, TeacherResponse } from "src/Interfaces/teachers-models";

export const ALL_PUPILS: AllPupilsShortResponse[] = [
    {
      id: 1,
      classname: '7A',
      firstName: 'Mark',
      lastName: 'Zajanczkowski',
    },
    {
      id: 2,
      classname: '8B',
      firstName: 'Anna',
      lastName: 'Smith',
    },
    {
      id: 3,
      classname: '6C',
      firstName: 'Michael',
      lastName: 'Johnson',
    },
    {
      id: 4,
      classname: '9A',
      firstName: 'Emily',
      lastName: 'Davis',
    },
    {
      id: 5,
      classname: '7B',
      firstName: 'Daniel',
      lastName: 'Brown',
    }
];

export const СURRENT_PUPIL: PupilResponse = {
    privateInfo: {
        id: 1,
        firstName: 'Mark',
        lastName: "Zajanczkowski",
        email: 'm.zaja@gmail.com',
        phoneNumber: '586958425',
        pesel: '7895862569',
    },
    classname: '7A',
    classroomId: 4,
    parents: [
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
      id: 7,
      firstName: 'Perła',
      lastName: 'Mocna',
      quantityOfsubjects: 8,
    },
    {
      id: 8,
      firstName: 'Alex',
      lastName: 'Johnson',
      quantityOfsubjects: 6,
    },
    {
      id: 9,
      firstName: 'Elena',
      lastName: 'Garcia',
      quantityOfsubjects: 7,
    },
    {
      id: 10,
      firstName: 'David',
      lastName: 'Lee',
      quantityOfsubjects: 5,
    },
    {
      id: 11,
      firstName: 'Olivia',
      lastName: 'Smith',
      quantityOfsubjects: 9,
    }
];
  
export const СURRENT_TEACHER: TeacherResponse = {
    privateInfo: {
      id: 7,
      firstName: 'Perła',
      lastName: "Mocna",
      email: 'p.moc@gmail.com',
      phoneNumber: '586958425',
      pesel: '7895862569',
    },
    courses: [
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
  
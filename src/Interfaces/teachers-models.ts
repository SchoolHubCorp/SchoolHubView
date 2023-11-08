export interface AllTeachersShortResponse {
    teacherId: string;
    name: string;
    lastname: string;
    quantityOfSubjects: number;
}

export interface TeacherPrivateInfo {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    pesel: string;
}

export interface TeachersSubjects {
    subjectName: string;
    subjectGroup: string;
}

export interface TeacherResponse {
    privateInfo: TeacherPrivateInfo;
    subjects: TeachersSubjects[];
}
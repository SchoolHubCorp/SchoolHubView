export interface AllTeachersShortResponse {
    id: number;
    firstName: string;
    lastName: string;
    quantityOfsubjects: number;
}

export interface TeacherPrivateInfo {
    id: number;
    firstName: string;
    lastName: string;
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
    courses: TeachersSubjects[];
}
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
    id: number;
    courseName: string;
    className: string;
}

export interface TeacherResponse {
    privateInfo: TeacherPrivateInfo;
    courses: TeachersSubjects[];
}

export interface TeacherSubjectLessonsResponse {
    id: number;
    courseName: string
    topics: TeacherSubjectLessons[];
}

export interface TeacherSubjectLessons {
    topicId: number;
    topicName: string;
    topicDescription: string;
    teacherFile: string;
    teacherFileType: string;
}
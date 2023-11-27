export interface ClassDataResponse {
    id: number;
    className: string;
    classAccessCode: string;
    pupils: PupilInClass[];
    courses: ClassCourses[];
}

export interface ClassCourses {
    id: number;
    courseName: string;
    teacherName: string;
    teacherLastName: string;
}

export interface PupilInClass {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AllPupilsShortResponse {
    id: number;
    classname: string;
    firstName: string;
    lastName: string;
}

export interface PupilPrivateInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pesel: string;
}

export interface PupilsParents {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface PupilResponse {
    privateInfo: PupilPrivateInfo;
    classroomId: number;
    classname: string;
    parentAccessCode: string;
    parents: PupilsParents[];
}

export interface PupilSubjects {
    id: number;
    courseName: string;
    teacherName: string;
    teacherLastName: string;
}

export interface PupilSubjectLessonsResponse {
    id: number;
    courseName: string
    topics: PupilSubjectLessons[];
}

export interface PupilSubjectLessons {
    topicId: number;
    topicName: string;
    topicDescription: string;
    teacherFile: string;
    teacherFileType: string;
    homeworks: PupilHomework[];
}

export interface PupilHomework {
    homeworkId: number | null;
    pupilFile: string;
    pupilFileType: string;
}
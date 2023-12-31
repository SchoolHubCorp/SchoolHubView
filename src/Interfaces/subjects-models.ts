export interface AddSubject {
    subject: string;
    teacher: string;
}

export interface AddSubjectRequest {
    courseName: string;
    classroomId: number;
    teacherId: number;
}

export interface AllSubjectsShortResponse {
    id: number;
    courseName: string;
    classroom: string;
    teacher: string;
}

export interface AddLessonRequest {
    topicName: string;
    description: string;
    courseId: number;
}

export interface UserSubjectsResponse {
    id: number;
    courseName: string;
    specialParam: string;
}

export interface UserSubjectLessons {
    topicId: number;
    topicName: string;
    topicDescription: string;
    teacherFile: string;
    teacherFileType: string;
    homeworkId?: number;
    pupilFile?: string;
    pupilFileType?: string;
}
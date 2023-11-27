export interface PupilGradeTable {
    pupilName: string;
    pupilSurname: string;
    marks: Grade[];
}

export interface Grade {
    markName: number;
}

export interface CourseGradeTable {
    courseName: string;
    marks: Grade[];
}

export interface GradeTable {
    rowName: string;
    marks: Grade[];
}
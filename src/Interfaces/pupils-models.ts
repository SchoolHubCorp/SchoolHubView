export interface ClassDataResponse {
    id: number;
    className: string;
    classAccessCode: string;
    pupils: PupilInClass[];
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
    name: string;
    lastname: string;
    phoneNumber: string;
}

export interface PupilResponse {
    privateInfo: PupilPrivateInfo;
    classroomId: number;
    classname: string;
    parents: PupilsParents[];
}
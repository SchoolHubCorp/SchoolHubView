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
    classroom: string;
    name: string;
    lastname: string;
}

export interface PupilPrivateInfo {
    id: number;
    classId: number;
    classroom: string;
    name: string;
    lastname: string;
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
    parentsInfo: PupilsParents[];
}
export interface ClassDataResponse {
    id: number;
    className: string,
    classAccessCode: string,
    pupils: PupilInClass[];
}

export interface PupilInClass {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}
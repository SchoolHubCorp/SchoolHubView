export interface SchoolDescription {
    id: number,
    name: string,
    slogan: string,
    information: string,
    image: string
}

export interface FormLabelData {
    formName: string,
    formText: string,
    formValidationType?: string
}

export interface FromWithConnectingElement {
    data: FormLabelData[];
    connectingElement?: string;
}

export interface RegisterPostData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    pesel: string,
    classCode?: string,
    ChildCode?: string
}

export interface LoginPostData {
    email: string,
    password: string,
}

export interface EntranceResponse {
    email: string,
    token: string,
    role: string
}

export interface RegisterTeacher {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    pesel: string,
}

export interface UpdatedPasswordInfo {
    email: string;
    accessCode: string;
    password: string;
}
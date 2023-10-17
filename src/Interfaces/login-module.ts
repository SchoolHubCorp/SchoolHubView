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
    username: string,
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
    username: string,
    password: string,
}
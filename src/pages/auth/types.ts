
export interface FormProps{
    type:string
    onSubmit:(data:UserDataTypes)=>void
    error:string|null
    onClearError?: () => void
}
export interface UserDataTypes{
    email:string,
    password:string,
    username:string
}
export interface UserloginType {
    email:string,
    password:string
}
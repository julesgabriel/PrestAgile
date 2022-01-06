import {expect} from "@jest/globals";
import * as bcrypt from 'bcrypt';
import FormInputValidator from "../../../../../logic/validators/registration/formInputValidator";

export interface ILoginForm {
    email: string,
    password?: string,
    passwordHash?: string,
    age?: number,
}

const data: ILoginForm = {
    email: 'sosthene.fruchard78@gmail.com',
    password: 'Password@7889',
}
const falseData: ILoginForm = {
    email: 'soenefm',
    password: 'Password@7889',
}
const falseDataPassword: ILoginForm = {
    email: 'sosthene.fruchard78@gmail.com',
    password: 'prd',
}
// export interface IValidatorInput {
//     checkInputFields({email,password} : ILoginForm) : boolean|Error
//     checkInputEmail(email: ILoginForm["email"]) : boolean
//     checkInputPassword(password:ILoginForm["password"]) : boolean
// }

class PasswordHelper {
    public static hash = (password: ILoginForm["password"]): Promise<ILoginForm["password"]> => {
        return bcrypt.hash(password, 10)
    }
    public static compare = (passwordToCompareTo: ILoginForm["password"], passwordInDb: ILoginForm["password"]): Promise<boolean> => {
        return bcrypt.compare(passwordToCompareTo, passwordInDb)
    }
}

/* ------------------------------------------------------------------------------------------------------------------ */


test('The input fields should be verified', () => expect(FormInputValidator.checkInputFields(data)).toBeTruthy() )
test('Wrong Email should throw custom error', () => expect(() => FormInputValidator.checkInputFields(falseData)).toThrow() )
test('Wrong password should throw custom error', () => expect(() => FormInputValidator.checkInputFields(falseDataPassword)).toThrow() )
test('Password hashed successfully', async () => expect(await PasswordHelper.hash(FormInputValidator.checkInputFields(data).password)) )
test('Hash password can be validated', async () => {
    const compare = await PasswordHelper.hash(data.password);
    expect(await PasswordHelper.compare(data.password, compare)).toBeTruthy();
})
test('Hash password will return false when data arent equal', async () => {
    const compare = await PasswordHelper.hash(falseDataPassword.password);
    expect(await PasswordHelper.compare(data.password, compare)).toBeFalsy();
})

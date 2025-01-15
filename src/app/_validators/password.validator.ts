import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const PasswordValidator = function (minLength: number, maxLength: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const password = control.value as string
        if (!password)
            return { required: true }
        else if (password.length < minLength)
            return { InvalidMinLength: true }
        else if (password.length > maxLength)
            return { InvalidMaxLength: true }
        else if (!/[a-z]/.test(password))
            return { InvalidLowerCase: true }
        else if (!/[A-Z]/.test(password))
            return { InvalidUpperCase: true }
        else if (!/[0-9]/.test(password))
            return { InvalidNumberic: true }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            return { InvalidSpecialChar: true }
        return null

    }
}

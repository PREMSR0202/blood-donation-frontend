import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
        const valid = regex.test(control.value);
        return valid ? null : { 'invalidPassword': true };
    };
}

export function passwordMatch(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');
    return password && confirmpassword && password.value !== confirmpassword.value ?
        { 'mismatch': true } : null;
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
        const valid = regex.test(control.value);
        return valid ? null : { 'invalidEmail': true };
    };
}


export function mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const regex = new RegExp('^[789][0-9]{9}$');
        const valid = regex.test(control.value);
        return valid ? null : { 'invalidphno': true };
    };
}

export function bloodGroupValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const regex = new RegExp('^(A|B|AB|O|a|b|ab|o)[+-]$');
        const valid = regex.test(control.value);
        return valid ? null : { 'invalidbloodgroup': true };
    };
}
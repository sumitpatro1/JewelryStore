export class AuthenticationToken {
    token: string = '';
    expires: number = 0;
}

export class AuthenticationResponse {
    user_name: string = '';
    token: AuthenticationToken;
    user_role: string = '';
}

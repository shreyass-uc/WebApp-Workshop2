import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable, from } from "rxjs";
import * as bcrypt from "bcrypt";
import { User } from "../dto/user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any> {
        return from(bcrypt.compare(newPassword, passwortHash));
    }
}

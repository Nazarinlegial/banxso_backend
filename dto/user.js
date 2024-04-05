export class UserDto {
    user_id
    profile
    role

    constructor(user = {id, profile, role}) {
        this.profile = user.profile
        this.user_id = user.id
        this.role = user.role
    }
}
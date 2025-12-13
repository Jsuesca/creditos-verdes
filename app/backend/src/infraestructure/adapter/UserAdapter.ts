import { Repository } from "typeorm";
import { User as UserDomain } from "../../domain/User";
import { User } from "../entities/User";
import { UserPort } from "../../domain/UserPort";
import { AppDataSource } from "../config/data-base";

export class UserAdapter implements UserPort {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    private toDomain(user: User): UserDomain {
        return {
            id: user.id_user,
            name: user.name_user,
            email: user.email_user,
            password: user.password_user,
            status: user.status_user
        };
    }

    private toEntity(user: Omit<UserDomain, "id">): User {
        const userEntity = new User();
        userEntity.name_user = user.name;
        userEntity.email_user = user.email;
        userEntity.password_user = user.password;
        userEntity.status_user = user.status;
        return userEntity;
    }

    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        const newUser = this.toEntity(user);
        const savedUser = await this.userRepository.save(newUser);
        return savedUser.id_user;
    }

    async getUserByEmail(email: string): Promise<UserDomain | null> {
        const user = await this.userRepository.findOne({ where: { email_user: email } });
        return user ? this.toDomain(user) : null;
    }

    async getAllUsers(): Promise<UserDomain[]> {
        const users = await this.userRepository.find({ where: { status_user: 1 } });
        return users.map(u => this.toDomain(u));
    }

    async getUserById(id: number): Promise<UserDomain | null> {
        const user = await this.userRepository.findOne({ where: { id_user: id } });
        return user ? this.toDomain(user) : null;
    }

    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
        if (!existingUser) return false;

        Object.assign(existingUser, {
            name_user: user.name ?? existingUser.name_user,
            email_user: user.email ?? existingUser.email_user,
            password_user: user.password ?? existingUser.password_user,
            status_user: user.status ?? existingUser.status_user
        });

        await this.userRepository.save(existingUser);
        return true;
    }

    async deleteUser(id: number): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
        if (!existingUser) return false;

        existingUser.status_user = 0;
        await this.userRepository.save(existingUser);
        return true;
    }
}

import crypto from 'node:crypto';

interface UserProps {
    name: string;
    email: string;
    phoneNumber: string;
}

export class User {
    private _id: string;
    private props: UserProps;

    public constructor(props: UserProps, id?: string) {
        this._id = id ?? crypto.randomUUID();
        this.props = props;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this.props.name;
    }

    public get email(): string {
        return this.props.email;
    }

    public get phoneNumber(): string {
        return this.props.phoneNumber;
    }
}
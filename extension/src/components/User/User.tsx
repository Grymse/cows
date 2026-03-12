import { Accessor } from "solid-js";
import "./User.css";

export type SignedInUser = {
  name: string;
  email: string;
  logoUrl: string;
};

export type UserProps = {
    user: Accessor<SignedInUser>;
    totalHours: Accessor<number>;
};

export default function User({ user, totalHours }: UserProps) {
    return <div class="user-bar" aria-label="Signed in user">
        <img id="signedInLogo" class="user-logo" src={user().logoUrl} alt="User logo" />
        <div class="user-meta">
            <p id="signedInName" class="user-name">{user().name}</p>
            <p id="signedInEmail" class="user-email">{user().email}</p>
        </div>
        <p class="user-total-hours">Total: {totalHours().toFixed(2)}h</p>
    </div>
}


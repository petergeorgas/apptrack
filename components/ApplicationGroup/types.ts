import { Application } from "../../types/types";

export enum Group {
	APPLY,
	IN_PROGRESS,
	OFFER,
	REJECT,
}

export type ApplicationGroupProps = {
	group: Readonly<Group>;
	applications: ReadonlyArray<Application>;
	onApplicationClick: (app: Application) => void;
};

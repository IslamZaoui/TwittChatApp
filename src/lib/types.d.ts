interface User extends Record {
	id?: string
	created?: string
	updated?: string
	avatar?: string;
	username: string;
	banned?: boolean
	swear?: number
	verified?: boolean
}

interface Message {
	id?: string;
	text?: string;
	user?: User | string;
	created?: Date;
	updated?: Date;
}

interface Post {
	id?: string;
	subject?: string;
	user?: string;
	Text?: string;
	files?: string[];
	tags?: string;
	created?: Date;
	updated?: Date;
	expand?: {
		user?: User
	}
}

interface PostLike {
	id?: string;
	user?: User | string;
	post?: Post | string;
	status?: boolean;
}


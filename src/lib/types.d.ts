interface User extends Record {
	id?:string
	created?: string
	updated?: string
	avatar?: string;
	username: string;
	banned?:boolean
	swear?:number
	verified?:boolean
}

interface messages{
	id?:string
	created?: string
	updated?: string
	text: string
	user: string
	like?: number
	dislike?: number
}

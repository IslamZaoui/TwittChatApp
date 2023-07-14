
![Logo](https://i.imgur.com/5KDZQli.png)


# Twitt Chat App

this a simple project powred by sveltekit and pocketbase

## Appendix

This app will take the lead from Zuck and Musk to be the best chat app in the world of its amazing features like Simple, Laggy, and Vulnerable by default


## Features

- Simple
- Laggy "Because of the lack of good pocketbase host"
- Vulnerable "I really don't know if this app is protected enough"


## Run Locally

#### Pocketbase

Clone the project

```bash
  git clone https://github.com/zicoding2/TwittChatApp.git
```

Go to the project directory

```bash
  cd TwittChatApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### Pocketbase

download Pocketbase [here](https://pocketbase.io/docs/)

Place the pocketbase file in the folder and run

```bash
  ./pocketbase serve
```
You should see this 

```bash
  2023/07/14 14:36:54 Server started at http://127.0.0.1:8090
  ➜ REST API: http://127.0.0.1:8090/api/
  ➜ Admin UI: http://127.0.0.1:8090/_/

```
Go to http://127.0.0.1:8090/_/ register as an admin and import schema from `pb_schema .json` in the repo
## Deployment

#### To deploy The Web App

1- Create a Vercel Account and link it with your GitHub

2- Select the repo that has this project

3- Configure then deploy, [More info](https://vercel.com/docs/frameworks/sveltekit)

note: don't forget to set the Environment Variables

#### To deploy PocketBase

  check out this [discussion](https://github.com/pocketbase/pocketbase/discussions/2856)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PUBLIC_POCKETBASE_URL`

`PRIVATE_KILLSWITCH` set it to false


## Acknowledgements

 - [Twitt Chat App](https://twitt-chat-app.vercel.app/)
 - [SvelteKit](https://kit.svelte.dev/)
 - [PocketBase](https://pocketbase.io/)
 - [Web Host 'Vercel'](https://vercel.com/)
 - [PocketBase Host 'hop'](https://hop.io/)


## Feedback

If you have any feedback, please submit an issue or discussion


## License

[MIT](https://choosealicense.com/licenses/mit/)


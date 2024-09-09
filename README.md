# Anonymous Opinions

**Anonymous Opinions** is a platform that allows users to share feedback anonymously, fostering open communication without fear of judgment. Built with Next.js and TypeScript, it ensures secure feedback collection using NextAuth for authentication and MongoDB for data storage. With a sleek interface powered by ShadCN and Aeternity UI, it provides a user-friendly and confidential space for individuals to express their thoughts and opinions freely.

## Features

- **Anonymous Messaging**: Users can generate a unique username and share a link for others to send anonymous messages.
- **Custom Links**: Each user gets a personalized link to receive anonymous feedback or messages.
- **User Authentication**: Users must authenticate to create and manage their profile, but no login is required for others to send messages through the shared link.

## Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (Local or Atlas)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/sincerelyyyash/anonymous-opinions.git
cd anonymous-opinions
```
### Install Dependency
```bash
npm install
```

### Configure Environment Variables
- Create a .env.local file in the root of your project and add the following environment variables:
- NEXTAUTH_SECRET=''
- MONGODB_URI=

- Replace the placeholder with your actual credentials

### Run the Development Server:
```bash
npm run dev
```

- Visit http://localhost:3000 in your browser to see the application in action.



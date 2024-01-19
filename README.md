This is Course Finder - a course management app where students can enroll for different courses.

## Setting up locally

1. Create a firebase project by going to [Firebase Cloud Console](https://console.firebase.google.com)
2. Click on Add Project >> Enter project name >> Disable Google Analytics >> Continue
3. Click continue when the project is ready. It takes you back to Console. In their click your 
    newly create project.
4. In the `Project Overview` tab, click on `</>` symbol to create your Web App.
5. Register your app by giving it a name and click `Register app`
6. In the `Add Firebase SDK` section, you will find `firebaseConfig` object.
7. Copy the `firebaseConfig` object.
8. Now clone the repository and run `npm install`
9. Paste the `firebaseConfig` object to `services/firebase.config.ts` and `config/setup.ts` files.
10. Now run `npm run setup` to initialize the `Firestore database` with some demo courses.
11. (Optional) If it shows error, run the above command again.
12. Now run `npm run dev` to start the local development server.


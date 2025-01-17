# Project Documentation: Drive
## Overview

This project is a feature-rich file and folder management application built with React.js, TypeScript, Redux, Tailwind CSS, and Framer Motion. It is fully responsive, highly interactive, and designed for smooth and fast user experiences with animations.

### Purpose of the Project
The goal of this application is to provide a seamless interface for users to manage files and folders with essential features like creating, renaming, deleting, uploading, downloading, and more, while maintaining data integrity and ensuring fast performance.

## Technologies Used

### Core Libraries and Frameworks
- React.js: For building dynamic and interactive user interfaces.
- TypeScript: To ensure type safety across the application, minimizing bugs and enhancing maintainability.
- Redux: For state management, ensuring all file and folder operations are handled predictably and efficiently.
- Tailwind CSS: For styling and achieving a fully responsive design with minimal custom CSS.
- Framer Motion: For smooth and engaging animations, improving the user experience.
### Other Packages
- LocalForage: Used to access IndexedDB, which speeds up storage and retrieval of data locally.
- JSZip: For compressing folders into zip files, allowing users to download them easily.
- React Hot Toast: For displaying interactive and user-friendly toast notifications to improve communication.
- UUID: To generate unique IDs for files and folders, ensuring no conflicts in the data structure.

## Features
### Core Functionalities
1. File and Folder Management:
- Users can create, rename, delete, upload, and download files or folders.
- Duplicate file and folder names are prevented for better data organization.
- Users can see details of files, such as:
- File size
- Path
- Type
- Last modified timestamp

2. Folder Navigation:
- Breadcrumbs have been added for intuitive navigation through nested folders.
- Users can perform actions like creating or uploading files directly inside specific folders.
3. Download as ZIP:
- Folders can be downloaded as compressed zip files for portability.
4. Responsive Design:
- The application is fully responsive and optimized for all device sizes, ensuring a consistent user experience.
### Additional Features
- Interactive Animations: Framer Motion is used to deliver smooth transitions and animations.
- Error Handling: Duplicate names and invalid operations are prevented, ensuring data consistency.
- Persistent State: Redux, combined with LocalForage, persists the application state, enabling users to return to their work without losing progress.
## Why These Decisions Were Made
### Code Architecture
1. TypeScript: Enforces strict typing across the application, reducing runtime errors and enhancing maintainability. All types used throughout the project are centrally defined in a types.ts file for consistency.

2. Redux for State Management:
  - All application states (files, folders, and current directory) are managed via Redux to ensure consistency and central control.
- The Redux store persists data locally using LocalForage, allowing for faster retrieval and storage.
3. File Structure:
- assets/: Contains all images and icons, with a subfolder for SVG icons to keep assets organized.
- components/: Holds all reusable components, promoting reusability and modular design.
- pages/: Contains individual page-level components for routing and better separation of concerns.
- store/: Handles Redux logic with a clear separation of slices and hooks:
- Slices: Each slice manages a specific aspect of the application's state.
- Hooks: Custom hooks for slices simplify Redux usage throughout the app.

## Screenshots

<img width="1439" alt="image" src="https://github.com/user-attachments/assets/9a6814d6-2677-4c4e-b2cd-768895e96d9c" />

<img width="1438" alt="image" src="https://github.com/user-attachments/assets/b9e6abb4-f16f-43d4-9857-a30965c0e9f8" />

## Setup

1. Clone the repository

```sh
git clone https://github.com/web3sandyyy/LYNC-React-Developer-Task/
```

2. Install Dependencies

```sh
npm Install
```

3. Run the Code

```sh
npm run dev
```

Make sure you have node js installed in your device!


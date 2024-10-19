import Navigation from "../components/common/Navigation";

export default function WelcomePage() {
   return (
      <div className="container mx-auto p-4 w-screen md:w-4/5 lg:w-[60rem]">
         <Navigation />
         <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
         <p>Manage your tasks efficiently. Click on Tasks to get started.</p>
      </div>
   );
}

import Navigation from "../components/Navigation";

export default function WelcomePage() {
   return (
      <div className="container mx-auto p-4">
         <Navigation />
         <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
         <p>Manage your tasks efficiently. Click on Tasks to get started.</p>
      </div>
   );
}
